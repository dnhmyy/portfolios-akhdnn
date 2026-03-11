import { useEffect, useState } from "react";

const MouseSpotlight = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, hsla(220,100%,50%,0.04), transparent 60%)`,
      }}
    />
  );
};

export default MouseSpotlight;
