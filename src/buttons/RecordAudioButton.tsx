import { useCallback, useEffect, useRef, useState } from "react";
import { Microphone, Stop } from "grommet-icons";
import { RoundButton } from "./RoundButton";
import { Box } from "grommet";
import { blobToBase64 } from "../utils/blobToBase64";
import { Base64 } from "../contexts/PhraseTTLContext";

interface RecordAudioButtonProps {
  stopAfterSeconds?: number;
  onChange: (content: Base64) => void;
}

export function RecordAudioButton({
  stopAfterSeconds,
  onChange,
}: RecordAudioButtonProps) {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [startTime, setStartTime] = useState(Date.now());

  const recordPhrase = useCallback(
    (stream: MediaStream) => {
      if (mediaRecorder || !stream) {
        mediaRecorder?.stop();
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

      setStartTime(Date.now());
      recorder.start();

      setMediaRecorder(recorder);
    },
    [mediaRecorder, setMediaRecorder, setStartTime]
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (stopAfterSeconds) {
        const now = Date.now();
        if (now - startTime >= stopAfterSeconds * 1000) {
          recordPhrase(null);
          clearInterval(id);

          mediaRecorder?.stop();
          setMediaRecorder(null);
        }
      }
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [startTime, setStartTime, mediaRecorder, setMediaRecorder]);

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
