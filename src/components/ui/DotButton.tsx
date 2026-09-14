import styled from "styled-components";

interface Props {
  active: boolean;
  onClick: () => void;
  label?: string;
  labelAlign?: "left" | "right";
  ariaLabel?: string;
}

export function DotButton({
  active,
  onClick,
  label,
  labelAlign = "right",
  ariaLabel,
}: Props) {
  return (
    <StyledDot
      $active={active}
      className={`${active ? "active-dot" : ""} ${labelAlign}`}
      onClick={onClick}
      aria-label={ariaLabel || label}
    >
      {label && <span className="dot-label">{label}</span>}
    </StyledDot>
  );
}

const StyledDot = styled.button<{ $active: boolean }>`
  position: relative;
  z-index: 1;
  width: 7px;
  height: 7px;
  padding: 0;
  border: 1px solid rgba(40, 37, 42, 0.42);
  border-radius: 50%;
  background: rgba(245, 243, 244, 0.35);
  cursor: pointer;
  transition: 0.35s ease;

  ${({ $active }) =>
    $active &&
    `
    width: 11px;
    height: 11px;
    border-color: rgba(40, 37, 42, 0.75);
    background: rgba(255, 255, 255, 0.85);
  `}

  &:hover {
    width: 11px;
    height: 11px;
    border-color: rgba(40, 37, 42, 0.75);
    background: rgba(255, 255, 255, 0.85);
  }

  .dot-label {
    position: absolute;
    top: 50%;
    opacity: 0;
    white-space: nowrap;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.muted};
    transition: 0.3s ease;
    pointer-events: none;
  }

  &.right .dot-label {
    left: 18px;
    transform: translateY(-50%);
  }

  &:hover.right .dot-label,
  &.active-dot.right .dot-label {
    transform: translate(4px, -50%);
    opacity: 1;
  }

  &.left .dot-label {
    right: 18px;
    transform: translateY(-50%);
  }

  &:hover.left .dot-label,
  &.active-dot.left .dot-label {
    transform: translate(-4px, -50%);
    opacity: 1;
  }
`;
