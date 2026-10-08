import Moments from "../components/Moments";
import { useMoments } from "../hooks/useMoments";
import styled from "styled-components";

interface Props {
  isActive: boolean;
}

export function SpacePage({ isActive }: Props) {
  const { moments, isLoading } = useMoments();

  return (
    <Section className={`page ${isActive ? "active" : ""}`} id="space">
      <Moments moments={moments} isLoading={isLoading} />
    </Section>
  );
}

const Section = styled.section`
  overflow-y: scroll;
  margin-top: 50px;
`;
