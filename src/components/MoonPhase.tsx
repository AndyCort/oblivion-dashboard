import styled from "styled-components";
import { WidgetBase, WidgetTitle } from "./ui/Shared";

const MoonWidget = styled(WidgetBase)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MoonTitle = styled(WidgetTitle)`
  align-self: flex-start;
`;

const MoonIcon = styled.div`
  font-size: 3rem;
  margin: 0.5rem 0;
`;

const PhaseName = styled.div`
  margin-top: 0.5rem;
  opacity: 0.8;
  font-size: 0.95rem;
`;

export function MoonPhase({ className = "" }: { className?: string }) {
  const getPhaseIcon = () => "🌔";
  const getPhaseName = () => "Waxing Gibbous";

  return (
    <MoonWidget className={className}>
      <MoonTitle>Moon</MoonTitle>
      <MoonIcon>{getPhaseIcon()}</MoonIcon>
      <PhaseName>{getPhaseName()}</PhaseName>
    </MoonWidget>
  );
}
