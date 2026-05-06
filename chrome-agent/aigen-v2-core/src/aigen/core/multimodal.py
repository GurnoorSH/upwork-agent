"""Multimodal Generation — image captioning and audio transcript generation.

Uses web AI platforms' multimodal capabilities:
- Gemini Vision for image captions
- GPT-4o for image descriptions
- Whisper via web interface for audio transcripts
"""

from __future__ import annotations

import base64
import json
import time
from pathlib import Path
from typing import Optional


# Image caption prompt templates
IMAGE_CAPTION_PROMPT = """Generate a detailed caption for this image.

Output ONLY valid JSON:
{{
  "alt_text": "Short accessibility description (max 125 chars)",
  "detailed_description": "Detailed paragraph description",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "objects": ["object1", "object2", "object3"],
  "scene": "indoor/outdoor/abstract/etc",
  "dominant_colors": ["color1", "color2", "color3"],
  "text_in_image": "Any text visible in the image, or empty string"
}}
"""

IMAGE_QA_PROMPT = """Generate a question-answer pair about this image.

Output ONLY valid JSON:
{{
  "question": "Question about the image content",
  "answer": "Detailed answer based on image analysis",
  "question_type": "descriptive/factual/analytical",
  "difficulty": "easy/medium/hard",
  "tags": ["tag1", "tag2"]
}}
"""

BATCH_IMAGE_PROMPT = """Analyze these {count} images and generate captions.

Output ONLY valid JSON array with exactly {count} items:
[
  {{
    "image_id": 1,
    "alt_text": "Short description",
    "detailed_description": "Detailed description",
    "tags": ["tag1", "tag2"],
    "scene": "scene type",
    "objects": ["obj1", "obj2"]
  }}
]
"""

# Audio transcript prompt templates
AUDIO_CLEANUP_PROMPT = """Clean up and format the following audio transcript.

Improve readability, fix obvious errors, and format properly.

Output ONLY valid JSON:
{{
  "transcript": "Cleaned transcript text",
  "language": "detected language",
  "speaker_count": 1,
  "duration_estimate": "approximate duration",
  "topics": ["topic1", "topic2"],
  "quality": "low/medium/high"
}}

Transcript:
{raw_transcript}
"""

AUDIO_QA_PROMPT = """Based on the following transcript, generate {count} question-answer pairs.

Output ONLY valid JSON array:
[
  {{
    "question": "Question about the content",
    "answer": "Answer from transcript",
    "timestamp": "approximate time in transcript",
    "difficulty": "easy/medium/hard"
  }}
]

Transcript:
{transcript}
"""


class MultimodalGenerator:
    """Generate datasets from images and audio using web AI platforms."""

    def __init__(self, output_dir: Path, tab=None):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.image_dir = self.output_dir / "images"
        self.audio_dir = self.output_dir / "audio"
        self.image_dir.mkdir(parents=True, exist_ok=True)
        self.audio_dir.mkdir(parents=True, exist_ok=True)
        self.tab = tab
        self.stats = {
            "images_processed": 0,
            "audio_processed": 0,
            "captions_generated": 0,
            "transcripts_cleaned": 0,
        }

    async def caption_images(
        self,
        image_paths: list[str],
        mode: str = "caption",
        batch_size: int = 5,
    ) -> list[dict]:
        """Generate captions for a batch of images.
        
        Args:
            image_paths: List of image file paths
            mode: "caption" for alt-text, "qa" for Q&A pairs
            batch_size: Images per prompt
        
        Returns:
            List of caption dicts
        """
        results = []

        for i in range(0, len(image_paths), batch_size):
            batch = image_paths[i : i + batch_size]
            count = len(batch)

            if mode == "caption":
                prompt = BATCH_IMAGE_PROMPT.format(count=count)
            else:
                prompt = IMAGE_QA_PROMPT

            # Upload images and send prompt
            # Note: Actual upload depends on platform support
            # This is a placeholder for the integration point
            if self.tab:
                for img_path in batch:
                    try:
                        await self.tab.upload_file(img_path)
                    except Exception:
                        pass

                response = await self.tab.send_and_recv(prompt)
                parsed = self._parse_json_response(response.text)
                if parsed:
                    if isinstance(parsed, list):
                        results.extend(parsed)
                    else:
                        results.append(parsed)
                    self.stats["captions_generated"] += 1

            self.stats["images_processed"] += count

        return results

    async def process_audio(
        self,
        audio_paths: list[str],
        mode: str = "cleanup",
        count: int = 5,
    ) -> list[dict]:
        """Process audio files — cleanup transcripts or generate Q&A.
        
        Args:
            audio_paths: List of audio file paths
            mode: "cleanup" for transcript cleaning, "qa" for Q&A generation
            count: Number of Q&A pairs to generate
        
        Returns:
            List of processed audio dicts
        """
        results = []

        for audio_path in audio_paths:
            # In a real implementation, we'd use Whisper via the web interface
            # For now, this is the integration point
            self.stats["audio_processed"] += 1

        return results

    def _parse_json_response(self, text: str) -> Optional[dict | list]:
        """Parse JSON from response text."""
        if not text:
            return None

        # Try direct parse
        try:
            return json.loads(text.strip())
        except Exception:
            pass

        # Try fenced code blocks
        import re
        fenced = re.findall(r"```(?:json)?\s*([\s\S]*?)```", text, flags=re.IGNORECASE)
        for block in fenced:
            try:
                return json.loads(block.strip())
            except Exception:
                continue

        return None

    def get_stats(self) -> dict:
        """Get multimodal processing statistics."""
        return self.stats
