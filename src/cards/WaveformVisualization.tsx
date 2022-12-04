import { useCallback, useEffect, useRef } from "react";

interface WaveformVisualizationProps {
  data: Array<number>;
}

export function WaveformVisualization({ data }: WaveformVisualizationProps) {
  const canvas = useRef(null);
  const height = 150;
  const width = 300;

  const drawLineSegment = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      isEven: boolean
    ) => {
      if (!canvas.current) {
        return;
      }

      ctx.lineWidth = 1; // how thick the line is
      ctx.strokeStyle = "#000"; // what color our line is
      ctx.beginPath();
      y = isEven ? y : -y;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, y);
      ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
      ctx.lineTo(x + width, 0);
      ctx.stroke();
    },
    [canvas]
  );

  const draw = useCallback(
    (normalizedData) => {
      if (!canvas.current) {
        return;
      }
      const dpr = window.devicePixelRatio || 1;
      const padding = 20;
      canvas.current.width = canvas.current.offsetWidth * dpr;
      canvas.current.height = (canvas.current.offsetHeight + padding * 2) * dpr;
      const ctx = canvas.current.getContext("2d");
      ctx.scale(dpr, dpr);
      ctx.translate(0, canvas.current.offsetHeight / 2 + padding); // Set Y = 0 to be in the middle of the canvas

      // draw the line segments
      const width = canvas.current.offsetWidth / normalizedData.length;
      for (let i = 0; i < normalizedData.length; i++) {
        const x = width * i;
        let height = normalizedData[i] * canvas.current.offsetHeight - padding;
        if (height < 0) {
          height = 0;
        } else if (height > canvas.current.offsetHeight / 2) {
          height = canvas.current.offsetHeight / 2;
        }

        drawLineSegment(ctx, x, height, width, !!((i + 1) % 2));
      }
    },
    [canvas]
  );

  useEffect(() => {
    draw(data);
  }, [canvas, data]);

  return (
    <canvas
      ref={canvas}
      width={width}
      height={height}
      style={{
        width: width,
        height: height,
      }}
    />
  );
}
