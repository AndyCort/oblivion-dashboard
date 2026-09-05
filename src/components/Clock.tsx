import { useState, useEffect } from "react";
import styled from "styled-components";
import { WidgetBase } from "./ui/Shared";

const ClockWidget = styled(WidgetBase)`
  align-items: center;
  justify-content: center;
  /* 无背景 */
  background: transparent !important;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  border: none;
  box-shadow: none;
  &:hover {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
  }
`;

const ClockTime = styled.h1`
  font-family: "DS-Digital", sans-serif;
  font-size: var(--font-size-xl);
  font-weight: 200;
  letter-spacing: -3px;
  line-height: 1;
  margin: 0;
  text-align: center;
  background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
`;

const ClockDate = styled.div`
  font-family: "Outfit", sans-serif;
  font-size: var(--font-size-sm);
  font-weight: 300;
  opacity: 0.9;
  margin-top: 0.5rem;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export function Clock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <ClockWidget className={className}>
      <ClockTime>{formatTime(time)}</ClockTime>
      <ClockDate>{formatDate(time)}</ClockDate>
    </ClockWidget>
  );
}
