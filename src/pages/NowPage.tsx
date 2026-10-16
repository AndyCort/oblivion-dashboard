import { useEffect, useState } from "react";
import styled from "styled-components";
import { Weather } from "../components/Weather";
import { ContentPage, Description, Digest, EditorialGrid, Eyebrow, Feature, PageBody, PageHeader, PageTitle, Prose, Sidebar, Tags } from "../components/ui/PageLayout";
import { nowContent } from "../config/nowContent";

export function NowPage({ isActive }: { isActive: boolean }) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (!isActive) return;
    const update = () => setNow(new Date());
    update();
    const interval = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", update); };
  }, [isActive]);
  const dateLabel = now.toLocaleDateString("zh-CN", { month: "long", day: "numeric", weekday: "long" });
  return (
    <ContentPage className={`page ${isActive ? "active" : ""}`} id="now" inert={!isActive} aria-hidden={!isActive}>
      <PageBody>
        <PageHeader>
          <Eyebrow>Now / Life in progress</Eyebrow>
          <PageTitle>{nowContent.title}</PageTitle>
          <Description>{nowContent.description}</Description>
        </PageHeader>
        <EditorialGrid>
          <Feature>
            <Eyebrow>{nowContent.introduction.label} · {dateLabel}</Eyebrow>
            <h2>{nowContent.introduction.title}</h2>
            <Prose>{nowContent.introduction.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p className="compact">{nowContent.introduction.summary}</p></Prose>
            <Tags aria-label="近况主题">{nowContent.introduction.tags.map(tag => <li key={tag}>{tag}</li>)}</Tags>
          </Feature>
          <NowSidebar aria-label="当前关注与天气">
            <WeatherBlock><Eyebrow>Outside the window</Eyebrow><CompactWeather /></WeatherBlock>
            {nowContent.focus.items.slice(0, 2).map((item, index) => <Digest key={item.id}>
              <Eyebrow>0{index + 1} / {item.category}</Eyebrow><h3>{item.title}</h3><p>{item.summary}</p>
            </Digest>)}
          </NowSidebar>
        </EditorialGrid>
      </PageBody>
    </ContentPage>
  );
}
const NowSidebar = styled(Sidebar)`
  @media (max-width: 720px) { > article { display: none; } }
`;
const WeatherBlock = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.line};
  @media (max-width: 720px) { margin: 0; padding: 0; border: 0; > p { display: none; } }
  @container editorial (height < 450px) { padding-bottom: 12px; margin-bottom: 12px; }
`;
const CompactWeather = styled(Weather)`
  && { background: transparent; border: 0; padding: 0; border-radius: 0; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; gap: 4px; align-items: flex-start; text-align: left; }
  &&:hover { background: transparent; transform: none; box-shadow: none; }
  .conditions { gap: 12px; }
  strong { font-size: 36px; }
  .conditions svg { width: 28px; height: 28px; }
  @container editorial (height < 450px) {
    && { display: grid; grid-template-columns: 1fr auto; align-items: center; }
    strong { font-size: 26px; }
    small:last-of-type { display: none; }
    p { font-size: 11px; }
  }
  @media (max-width: 720px) {
    && { display: grid; grid-template-columns: 1fr auto; align-items: center; }
    strong { font-size: 26px; }
    small:last-of-type { display: none; }
    p { font-size: 11px; }
  }
`;
