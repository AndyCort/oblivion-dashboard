import Moments from "../components/Moments";
import { moments } from "../components/data/moments";
import styled from "styled-components";

interface Props {
  isActive: boolean;
}

export function SpacePage({ isActive }: Props) {
  return (
    <Section className={`page ${isActive ? "active" : ""}`} id="space">
      <Moments moments={moments} />
    </Section>
  );
}

const Section = styled.section`
  overflow-y: scroll;
  margin-top: 50px;
`;
