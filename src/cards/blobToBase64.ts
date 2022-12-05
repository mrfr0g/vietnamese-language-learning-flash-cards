import { Base64 } from "../contexts/PhraseTTLContext";

export function blobToBase64(blob): Promise<Base64> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
