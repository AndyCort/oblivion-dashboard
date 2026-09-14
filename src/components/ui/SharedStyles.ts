import styled from "styled-components";

export const SpaceCenter = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    margin-top: 24px;
    color: rgba(40, 37, 42, 0.62);
    font-size: 14px;
  }
`;

export const Ring = styled.div`
  width: 260px;
  height: 260px;
  border: 1px solid rgba(40, 37, 42, 0.13);
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.45);
  }
  &::before {
    inset: 20px;
  }
  &::after {
    inset: 55px;
  }

  @media (max-width: 720px) {
    width: 180px;
    height: 180px;
    &::before {
      inset: 14px;
    }
    &::after {
      inset: 38px;
    }
  }
`;

export const RingText = styled.div`
  font-family: "Playfair Display", Georgia, serif;
  font-size: 24px;
  color: ${({ theme }) => theme.ink};
`;
