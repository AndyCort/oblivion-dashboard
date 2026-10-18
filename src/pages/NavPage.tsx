import styled from "styled-components";
import {
  ContentPage,
  Description,
  Eyebrow,
  PageBody,
  PageHeader,
  PageTitle,
} from "../components/ui/PageLayout";
import { Favicon } from "../components/ui/Favicon";
import { navContent } from "../config/navContent";

interface Props {
  isActive: boolean;
}

export function NavPage({ isActive }: Props) {
  return (
    <ContentPage
      className={`page ${isActive ? "active" : ""}`}
      id="nav"
      inert={!isActive}
      aria-hidden={!isActive}
    >
      <PageBody>
        <PageHeader>
          <Eyebrow>{navContent.eyebrow}</Eyebrow>
          <PageTitle>{navContent.title}</PageTitle>
          <Description>{navContent.description}</Description>
        </PageHeader>

        <LinksGrid>
          {navContent.links.map((link) => (
            <LinkCard
              key={link.name}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <IconWrapper>
                <Favicon url={link.url} size={28} alt={`${link.name} 图标`} />
              </IconWrapper>
              <CardText>
                <CardHeader>
                  <CardTitle>{link.name}</CardTitle>
                  {link.category && <CategoryTag>{link.category}</CategoryTag>}
                </CardHeader>
                {link.description && <CardDesc>{link.description}</CardDesc>}
              </CardText>
            </LinkCard>
          ))}
        </LinksGrid>
      </PageBody>
    </ContentPage>
  );
}

const LinksGrid = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: clamp(14px, 2vw, 20px);
  align-content: start;
  overflow-y: auto;
  padding: 4px 2px 32px;

  /* 隐藏滚动条 */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const LinkCard = styled.a`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.line};
  background: ${({ theme }) => theme.glass};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: ${({ theme }) => theme.ink};
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.ink};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.ink};
    outline-offset: 2px;
  }
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(125, 125, 125, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CardText = styled.div`
  min-width: 0;
  flex: 1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CardTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CategoryTag = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.muted};
  border: 1px solid ${({ theme }) => theme.line};
  padding: 1px 6px;
  border-radius: 99px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
`;

const CardDesc = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.muted};
  line-height: 1.5;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
