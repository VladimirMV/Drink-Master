import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { theme } from 'styles';

export const FooterContainer = styled.footer`
  padding: 40px 0 18px;
  border-top: 1px solid ${theme.colors.gray};

  @media (min-width: 768px) {
    padding: 80px 0 24px;
  }
`;

export const FlexContainer = styled.div`
  margin-bottom: 80px;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

export const Box = styled.div`
  display: flex;

  @media (max-width: 374.98px) {
    margin-bottom: 40px;
    justify-content: space-between;
  }

  @media (min-width: 375px) and (max-width: 767px) {
    margin-bottom: 40px;
    justify-content: space-between;
  }

  @media (min-width: 768px) and (max-width: 1199px) {
    flex-direction: column;
    gap: 40px;
  }

  @media (min-width: 1200px) {
    width: 50%;
    justify-content: space-between;
  }
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 28px;
  }

  @media (min-width: 1200px) {
    gap: 40px;
  }
`;

export const Thumb = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Text = styled.p`
  margin-right: 14px;
  font-size: ${theme.fontSizes.ultraSmall};
  font-weight: 400;
  line-height: calc(16 / 12);
  color: ${theme.colors.grayOpacity};
`;

export const PolicyText = Text.withComponent(Link);
