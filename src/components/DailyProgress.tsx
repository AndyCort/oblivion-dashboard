import { useState, useEffect } from "react";
import styled from "styled-components";
import { WidgetBase, WidgetTitle, FlexCenter } from "./ui/Shared";

const ProgressWidget = styled(WidgetBase)``;

const CircleContainer = styled(FlexCenter)`
  position: relative;
`;

const AnimatedCircle = styled.circle<{ $dasharray: number; $dashoffset: number }>`
  transition: stroke-dashoffset 1s ease-in-out;
  stroke-dasharray: ${(props) => props.$dasharray};
  stroke-dashoffset: ${(props) => props.$dashoffset};
`;

const PercentageText = styled.div`
  position: absolute;
  font-weight: 300;
  font-size: 1.2rem;
`;

export function DailyProgress({ className = "" }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calcProgress = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
      const diff = now.getTime() - start.getTime();
      setProgress(Math.min(100, (diff / (24 * 60 * 60 * 1000)) * 100));
    };
    calcProgress();
    const timer = setInterval(calcProgress, 60000);
    return () => clearInterval(timer);
  }, []);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <ProgressWidget className={className}>
      <WidgetTitle>Day Progress</WidgetTitle>
      <CircleContainer>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
          <AnimatedCircle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="8"
            $dasharray={circumference}
            $dashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <PercentageText>{Math.round(progress)}%</PercentageText>
      </CircleContainer>
    </ProgressWidget>
  );
}
