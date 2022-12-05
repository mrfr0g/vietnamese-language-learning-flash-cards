import { useCallback, useRef, useState } from "react";
import { Microphone, Stop } from "grommet-icons";
import { RoundButton } from "./RoundButton";
import { Box } from "grommet";
import { blobToBase64 } from "../cards/blobToBase64";
import { Base64 } from "../contexts/PhraseTTLContext";

interface RecordAudioButtonProps {
  onChange: (content: Base64) => void;
}

export function RecordAudioButton({ onChange }: RecordAudioButtonProps) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const recordPhrase = useCallback(
    (stream) => {
      if (mediaRecorder) {
        mediaRecorder.stop();
        setMediaRecorder(null);
        return;
      }

      const options = { mimeType: "audio/webm" };
      const recordedChunks = [];
      const recorder = new MediaRecorder(stream, options);

      recorder.addEventListener("dataavailable", function (e) {
        if (e.data.size > 0) recordedChunks.push(e.data);
      });

      recorder.addEventListener("stop", async function () {
        const recordedBase64 = await blobToBase64(new Blob(recordedChunks));
        onChange(recordedBase64);
      });

      recorder.start();

      setMediaRecorder(recorder);
    },
    [mediaRecorder, setMediaRecorder]
  );

  const handleInitMicrophone = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(recordPhrase);
  }, [recordPhrase]);

  return (
    <Box>
      <RoundButton
        icon={
          mediaRecorder ? (
            <Stop color="red" size="small" />
          ) : (
            <Microphone color="brand" size="small" />
          )
        }
        onClick={handleInitMicrophone}
      />
    </Box>
  );
}
