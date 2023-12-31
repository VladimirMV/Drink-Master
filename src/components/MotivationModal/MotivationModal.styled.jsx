import styled from '@emotion/styled';
import { theme } from 'styles/theme';
import contentSvg from 'img/Vector 2.svg';
import signinDt from 'img/motivation/motivation-signin.png';
import signinMb from 'img/motivation/motivation-signin-mb.png';
import favoriteDt from 'img/motivation/motivation-favorite.png';
import favoriteMb from 'img/motivation/motivation-favorite-mb.png';
import favoriteOneDt from 'img/motivation/motivation-favorite-one.png';
import favoriteOneMb from 'img/motivation/motivation-favorite-one-mb.png';

const chooseBackgroundImage = ({ favorite, counter, signin }) => {
  switch (true) {
    case favorite && counter === 1:
      const favoriteFirstImg = { dt: favoriteOneDt, mb: favoriteOneMb };
      return favoriteFirstImg;
    case favorite:
      const favoriteImg = { dt: favoriteDt, mb: favoriteMb };
      return favoriteImg;
    case signin:
      const signinImg = { dt: signinDt, mb: signinMb };
      return signinImg;
    default:
      console.log('Invalid subscription type');
  }
};

export const MotivationWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  padding-top: 218px;
  padding-bottom: 40px;

  width: 375px;
  height: 812px;
  border-radius: 30px;

  background-image: url(${props => chooseBackgroundImage(props).mb});
  background-size: cover;

  @media screen and (min-width: 560px) {
    width: 500px;
    height: 500px;
    background-image: url(${props => chooseBackgroundImage(props).dt});
  }
`;

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 20px;

  width: 268px;
  height: 242px;
  padding-top: 32px;
  padding-bottom: 14px;

  /* border-radius: 19px 20% 30% 34%; */

  backdrop-filter: blur(5px);
  background-image: url('${contentSvg}');
  /* outline: 1px solid tomato; */

  clip-path: polygon(
    5.55% 0.29%,
    91.76% 4.26%,
    97.01% 18px,
    99.69% 16.25%,
    100.28% 74.58%,
    98.06% 79.02%,
    94.36% 84.09%,
    86.94% 85.13%,
    70.67% 85.12%,
    65.55% 88.18%,
    60.37% 95.06%,
    56.07% 99.03%,
    50.56% 100.7%,
    43.22% 98.82%,
    38.94% 93.81%,
    34.77% 88.88%,
    30.38% 86.97%,
    25.6% 86.52%,
    17.32% 86.73%,
    10.68% 85.7%,
    4.6% 82.98%,
    0.37% 76.03%,
    -0.32% 6.74%
  );
`;

export const ContentText = styled.p`
  padding: 0 18px;
  font-size: ${({ theme }) => theme.fontSizes.titlePhone};
`;

export const CloseBtn = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  padding: 8px;
  color: ${theme.colors.lightGray};
  background-color: ${theme.colors.midnightBlue};

  :hover,
  :focus {
    color: ${theme.colors.steelBlue};
    border: ${theme.colors.steelBlue} solid 1px;
  }
`;
