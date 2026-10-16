import Moments from "../components/Moments";
import { useMoments } from "../hooks/useMoments";
import styled from "styled-components";

interface Props {
  isActive: boolean;
}

export function SpacePage({ isActive }: Props) {
  const { moments, isLoading, error, refresh } = useMoments();

  return (
    <Section className={`page ${isActive ? "active" : ""}`} id="space" inert={!isActive} aria-hidden={!isActive}>
      <Content>
        {error && <p role="status">暂时无法连接，正在显示本地内容。 <button onClick={refresh} disabled={isLoading}>重试</button></p>}
        <Moments moments={moments} isLoading={isLoading} />
      </Content>
    </Section>
  );
}

const Section = styled.section`
  /* The viewport reaches the top; only the content has initial spacing. */
  &#space {
    top: 0;
    overflow-y: auto;
    align-items: start;
    padding-top: 0;
    padding-bottom: 80px;

  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding-top: 104px;

  @media (max-width: 720px) {
    padding-top: 90px;
  }
`;
