import styled from "styled-components";

interface Props {
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}

export function DotButton({ active, onClick, ariaLabel }: Props) {
  return (
    <StyledDot
      $active={active}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      type="button"
    />
  );
}

export const DotNav = styled.nav<{ $visible?: boolean }>`
  position: fixed;
  z-index: 1100;
  right: max(24px, env(safe-area-inset-right));
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  padding: 7px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  border-radius: 999px;
  border: 1px solid oklch(0 0 0 / 0.15);
  background: oklch(0 0 0 / 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity 0.25s ease;

  &.is-visible,
  &:has(:focus-visible),
  &:hover {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 720px) {
    right: max(16px, env(safe-area-inset-right));
  }
`;

const StyledDot = styled.button<{ $active: boolean }>`
  position: relative;
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  padding: 0;
  border: 1px solid rgba(40, 37, 42, 0.42);
  border-radius: 50%;
  background: ${({ $active }) =>
    $active ? "oklch(0.75 0.001 230)" : "oklch(0.5 0.001 230)"};
  cursor: pointer;
  transition: background 0.2s ease;

  /* Enlarge the hit area without changing the compact dot spacing. */
  &::before {
    content: "";
    position: absolute;
    inset: -3.5px -6px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.85);
  }
`;
