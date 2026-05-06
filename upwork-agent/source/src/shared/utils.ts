/**
 * Safely cast unknown values to typed containers.
 * Shared across modules to avoid duplicated inline helpers.
 */

export function toRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

export function toArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
