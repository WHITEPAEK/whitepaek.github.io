import React, { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
}

const Typewriter = ({ text, speed = 60 }: TypewriterProps) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed(""); // 페이지 재방문 시 초기화
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval); // cleanup
  }, [text, speed]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {displayed}
      <span
        style={{
          width: "2px",
          height: "1em",
          backgroundColor: "#9ca3af",
          marginLeft: "4px",
          animation: "blink 1.2s ease-in-out infinite",
        }}
      />
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </span>
  );
};

export default Typewriter;
