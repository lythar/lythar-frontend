import { useEffect, useState } from "react";

export default function DrawFps() {
  const [fps, setFps] = useState(0);
  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;
    const updateFps = () => {
      const now = performance.now();
      frameCount++;
      if (now - lastFrameTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFrameTime = now;
      }
      requestAnimationFrame(updateFps);
    };
    updateFps();
  }, []);
  return <div className="fixed text-white right-4 top-4 z-[999]">{fps}fps</div>;
}
