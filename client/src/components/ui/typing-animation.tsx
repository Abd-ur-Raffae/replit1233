import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  delay?: number;
  speed?: number;
}

export default function TypingAnimation({ text, delay = 1000, speed = 100 }: TypingAnimationProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 1000);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span data-testid="typing-animation">
      {displayText}
      {showCursor && <span className="text-primary">|</span>}
    </span>
  );
}
