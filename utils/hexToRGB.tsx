export function hexToRgb(hex: string): [number, number, number] {
  const normalizedHex = hex.replace("#", "");
  const bigint = parseInt(normalizedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}
