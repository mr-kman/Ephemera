import { useRef, useEffect } from 'react';

export default function useCanvas(draw) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId;

    function render() {
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    }

    // Set up resize handling
    // Inspired by https://www.pluralsight.com/guides/re-render-react-component-on-window-resize
    function debounce(fn, ms) {
      let timer;

      return _ => {
          clearTimeout(timer);
          timer = setTimeout(_ => {
              timer = null;
              fn.apply(this, arguments);
          }, ms);
      };
    }

    const debouncedHandleResize = debounce(() => {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight - 20;
    }, 250);
    window.addEventListener('resize', debouncedHandleResize);

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', debouncedHandleResize);
    }
  }, [draw]);

  return canvasRef;
}