import PropTypes from 'prop-types';
import { MainSectionWrap, MainSectionTitle, MainSectionSubtitle,BackgroundImageWrap,BackgroundMainGradient } from './MainSection.styled';
import { Button } from 'components';
import { useNavigate} from 'react-router-dom';
// import { BackgroundGradient, Wrapper } from 'components/Welcome/WelcomePage.styled';
export const MainSection = ({ title, posttitle, children }) =>

{
   const navigate = useNavigate();
    const handleButtonClick = () => {
      navigate("/add");
  };
  return (
  
    <BackgroundMainGradient> 
     <BackgroundImageWrap  >
  <MainSectionWrap>
    {title && <MainSectionTitle>{title}</MainSectionTitle>}
    {posttitle && <MainSectionSubtitle>{posttitle}</MainSectionSubtitle>}
    <Button minWidth ="170px"
        minHeight ="54px"
          onClick={handleButtonClick}>
         
        Add recipe</Button>
    {children}
  </MainSectionWrap>
     </ BackgroundImageWrap  >
      </BackgroundMainGradient> 
     
);
}
MainSection.propTypes = {
  posttitle: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
};
