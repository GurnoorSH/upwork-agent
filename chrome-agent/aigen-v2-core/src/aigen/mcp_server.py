"""MCP Server — expose aigen generation as a Model Context Protocol tool.

Allows Claude, Cursor, or any MCP client to call generate_dataset() directly.
"""

from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path
from typing import Any

# MCP SDK imports
try:
    from mcp.server import Server
    from mcp.server.stdio import stdio_server
    from mcp.types import Tool, TextContent
    HAS_MCP = True
except ImportError:
    HAS_MCP = False


def create_mcp_server() -> Server:
    """Create an MCP server with aigen tools."""
    if not HAS_MCP:
        raise ImportError("Install mcp: pip install mcp")

    server = Server("aigen-cli")

    @server.list_tools()
    async def list_tools() -> list[Tool]:
        return [
            Tool(
                name="generate_dataset",
                description="Generate a dataset using web AI platforms. Returns items as JSON.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "project": {"type": "string", "description": "Project name"},
                        "target": {"type": "integer", "description": "Number of items to generate"},
                        "batch_size": {"type": "integer", "description": "Items per batch request"},
                        "platform": {"type": "string", "enum": ["gemini", "chatgpt", "claude"], "description": "AI platform to use"},
                        "schema_fields": {"type": "array", "items": {"type": "string"}, "description": "Output schema fields"},
                        "required_fields": {"type": "array", "items": {"type": "string"}, "description": "Required fields"},
                        "topic_pool": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "chapter": {"type": "string"},
                                    "topic": {"type": "string"},
                                    "difficulty": {"type": "string"},
                                },
                            },
                            "description": "Topics to cycle through",
                        },
                        "quality_mode": {"type": "string", "enum": ["none", "fast", "adversarial"], "description": "Quality scoring mode"},
                        "debug_port": {"type": "integer", "description": "Chrome debug port (default: 9222)"},
                    },
                    "required": ["project", "target"],
                },
            ),
            Tool(
                name="check_status",
                description="Check generation status for an existing output directory.",
                inputSchema={
                    "type": "object",
                    "properties": {
                        "output_dir": {"type": "string", "description": "Path to output directory"},
                    },
                },
            ),
        ]

    @server.call_tool()
    async def call_tool(name: str, arguments: dict) -> list[TextContent]:
        if name == "generate_dataset":
            return await _handle_generate(arguments)
        elif name == "check_status":
            return await _handle_status(arguments)
        else:
            return [TextContent(type="text", text=f"Unknown tool: {name}")]

    return server


async def _handle_generate(args: dict) -> list[TextContent]:
    """Handle the generate_dataset tool call."""
    project = args.get("project", "mcp_dataset")
    target = args.get("target", 10)
    batch_size = args.get("batch_size", 5)
    platform = args.get("platform", "gemini")
    debug_port = args.get("debug_port", 9222)

    # Build config from arguments
    config = {
        "project": project,
        "target": target,
        "batch_size": batch_size,
        "agents": 1,
        "platforms": [platform],
        "mode": "batch",
        "schema": {
            "fields": args.get("schema_fields", ["question", "answer"]),
            "required": args.get("required_fields", ["question", "answer"]),
        },
        "topic_pool": args.get("topic_pool", [
            {"chapter": "General", "topic": "General Topic", "question_type": "qa", "difficulty": "medium", "marks": 1}
        ]),
        "validators": {"dedup": True, "min_answer_length": 30},
        "output": {"format": "json", "path": f"output/{project}", "filename": "dataset.json"},
    }

    # Run generation (blocking — for MCP we want a response)
    from aigen.core.engine import GenerationEngine
    engine = GenerationEngine(config, debug_port=debug_port, agents=1, resume=False)

    try:
        engine.run()
        result = {
            "status": "success",
            "items_generated": len(engine.rows),
            "output_file": str(engine.output_file),
            "stats": engine.stats,
        }
    except Exception as exc:
        result = {
            "status": "error",
            "error": str(exc),
        }

    return [TextContent(type="text", text=json.dumps(result, indent=2, default=str))]


async def _handle_status(args: dict) -> list[TextContent]:
    """Handle the check_status tool call."""
    output_dir = Path(args.get("output_dir", "output"))

    if not output_dir.exists():
        return [TextContent(type="text", text=json.dumps({"error": "Directory not found"}))]

    # Find dataset file
    dataset_file = None
    for f in output_dir.glob("*.json"):
        if f.name != "generation_log.json":
            dataset_file = f
            break

    if not dataset_file:
        return [TextContent(type="text", text=json.dumps({"error": "No dataset file found"}))]

    payload = json.loads(dataset_file.read_text(encoding="utf-8"))
    items = payload.get("items", payload.get("questions", []))

    result = {
        "items": len(items),
        "file": str(dataset_file),
    }

    return [TextContent(type="text", text=json.dumps(result, indent=2))]


def run_mcp_server() -> None:
    """Run the MCP server on stdio."""
    if not HAS_MCP:
        print("Error: mcp package not installed. Run: pip install mcp", file=sys.stderr)
        sys.exit(1)

    server = create_mcp_server()
    asyncio.run(stdio_server(server))


if __name__ == "__main__":
    run_mcp_server()
