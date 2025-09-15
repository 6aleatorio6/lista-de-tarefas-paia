export function normalizeParams(params: Record<string, unknown>): string[] {
  return Object.entries(params).map(([key, value]) => {
    return `${key}=${value}`;
  });
}
