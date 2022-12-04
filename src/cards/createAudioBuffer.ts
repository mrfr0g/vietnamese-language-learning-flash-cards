import { Base64 } from "../contexts/PhraseTTLContext";
import { base64ToBuffer } from "./base64ToBuffer";

export async function createAudioBuffer(content: Base64): Promise<AudioBuffer> {
  const audioContext = new AudioContext();
  const audioFromString = base64ToBuffer(content);
  const buffer = await audioContext.decodeAudioData(audioFromString);

  return buffer;
}
