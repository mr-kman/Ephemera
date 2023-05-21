import React from 'react';
import useCanvas from './CanvasHook';
import '../styles/canvas.css';

export default function Canvas(props) {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  return <canvas id='msgCanvas' ref={canvasRef} />;
}
