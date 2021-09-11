import React, { useEffect, useState } from "react";

const messages = [
  "Looking for operators...",
  "Finding a new base...",
  "Trying to find Reunion...",
  "Recruiting artists...",
];

interface LoadingMessageProps {
  durationMs?: number;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({
  durationMs = 1000,
}) => {
  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  const [messagesIndex, setMessagesIndex] = useState(
    getRandomInt(messages.length)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessagesIndex(messagesIndex + 1);
    }, durationMs);
    return () => clearTimeout(timer);
  });

  const displayText = messages[messagesIndex % messages.length];
  return <React.Fragment>{displayText}</React.Fragment>;
};

export default LoadingMessage;
