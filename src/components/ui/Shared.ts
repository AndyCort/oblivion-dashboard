import styled, { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
`;

export const WidgetBase = styled.div<{ $delay?: string }>`
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.08),
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  padding: 1.75rem;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.02);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  opacity: 0; /* for animation */
  animation: ${fadeIn} 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${(props) => props.$delay || "0s"};

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0.05)
    );
    border-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px) scale(1.02);
    box-shadow:
      0 30px 60px rgba(0, 0, 0, 0.25),
      inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  }
`;

export const WidgetTitle = styled.div`
  font-family: "Outfit", sans-serif;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.7;
  margin-bottom: 0.75rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`;
