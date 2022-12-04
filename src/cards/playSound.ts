export function playSound(buffer: AudioBuffer) {
  const context = new AudioContext();
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = false;
  source.connect(context.destination);
  source.start(0); // Play immediately.
}
