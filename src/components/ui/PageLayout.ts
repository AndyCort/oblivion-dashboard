import styled from "styled-components";

/** Single viewport composition; page chrome keeps its own reserved space. */
export const ContentPage = styled.section`
  &&&& {
    display: block;
    height: 100%;
    overflow: hidden;
    padding: clamp(88px, 14vh, 120px) max(72px, 8vw) max(82px, 11vh) max(32px, 10vw);
    @media (max-width: 720px) { padding: 88px 52px 82px 24px; }
    @media (max-height: 500px) { padding-top: 78px; padding-bottom: 64px; }
  }
`;
export const PageBody = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  container-type: size;
  container-name: editorial;
`;
export const PageHeader = styled.header`
  flex: 0 0 auto;
  padding-bottom: clamp(16px, 3vh, 32px);
  border-bottom: 1px solid ${({ theme }) => theme.line};
  margin-bottom: clamp(18px, 3vh, 32px);
  @container editorial (height < 450px) {
    padding-bottom: 12px;
    margin-bottom: 16px;
  }
`;
export const Eyebrow = styled.p`
  color: ${({ theme }) => theme.muted};
  font-size: 10px;
  line-height: 1.5;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 10px;
  @container editorial (height < 450px) { margin-bottom: 6px; font-size: 9px; }
`;
export const PageTitle = styled.h1`
  font-family: "Playfair Display", "Songti SC", Georgia, serif;
  font-size: clamp(28px, 3.5vw, 48px);
  line-height: 1.2;
  font-weight: 400;
  letter-spacing: -0.025em;
  margin-bottom: 10px;
  @container editorial (height < 450px) { font-size: clamp(25px, 3vw, 36px); margin-bottom: 0; }
`;
export const Description = styled.p`
  max-width: 640px;
  font-size: 12px;
  line-height: 1.8;
  color: ${({ theme }) => theme.muted};
  @container editorial (height < 450px) { display: none; }
`;
export const EditorialGrid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 64px);
  align-items: center;
  @media (max-width: 720px) { grid-template-columns: minmax(0, 1fr); gap: 20px; align-content: center; }
`;
export const Feature = styled.article`
  min-width: 0;
  h2 {
    font-family: "Playfair Display", "Songti SC", Georgia, serif;
    font-size: clamp(24px, 3vw, 38px);
    font-weight: 400;
    line-height: 1.5;
    margin: 12px 0 20px;
    white-space: pre-line;
  }
  @container editorial (height < 450px) {
    h2 { font-size: clamp(21px, 2.7vw, 30px); margin: 8px 0 12px; line-height: 1.45; }
  }
`;
export const Prose = styled.div`
  color: ${({ theme }) => theme.muted};
  max-width: 560px;
  font-size: 13px;
  line-height: 2;
  p + p { margin-top: 14px; }
  .compact { display: none; }
  @container editorial (height < 450px) { font-size: 12px; line-height: 1.85; p + p { display: none; } }
  @container editorial (height < 360px) { p { display: none; } p.compact { display: block; margin: 0; } }
`;
export const Tags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin-top: 22px;
  li { padding: 4px 10px; border: 1px solid ${({ theme }) => theme.line}; border-radius: 99px; color: ${({ theme }) => theme.muted}; font-size: 10px; }
  @container editorial (height < 450px) { margin-top: 14px; li { font-size: 9px; } }
  @container editorial (height < 360px) { display: none; }
`;
export const Sidebar = styled.aside`
  min-width: 0;
  border-left: 1px solid ${({ theme }) => theme.line};
  padding-left: clamp(20px, 3vw, 40px);
  @media (max-width: 720px) { border-left: 0; border-top: 1px solid ${({ theme }) => theme.line}; padding: 16px 0 0; }
  @media (max-width: 720px) { @container editorial (height < 280px) { display: none; } }
`;
export const Digest = styled.article`
  padding: 20px 0;
  & + & { border-top: 1px solid ${({ theme }) => theme.line}; }
  &:first-child { padding-top: 0; }
  &:last-child { padding-bottom: 0; }
  h3 { font-size: 16px; line-height: 1.6; font-weight: 400; margin-bottom: 8px; }
  p { color: ${({ theme }) => theme.muted}; font-size: 12px; line-height: 1.8; }
  @container editorial (height < 450px) { padding: 12px 0; h3 { font-size: 14px; margin-bottom: 4px; } p { font-size: 11px; } }
  @media (max-width: 720px) { &:nth-child(n+2) { display: none; } }
  @container editorial (height < 320px) { &:nth-child(n+2) { display: none; } }
`;
