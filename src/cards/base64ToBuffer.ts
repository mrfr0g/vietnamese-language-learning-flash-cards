export function base64ToBuffer(input) {
  const binary = window.atob(input);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < buffer.byteLength; i++) {
    bytes[i] = binary.charCodeAt(i) & 0xff;
  }
  return buffer;
}
