import styled, { keyframes  } from 'styled-components';
import colors from '../../../../constants/styles/colors';

const loaderColor = `linear-gradient(to left, ${colors.purple} 100%, #27538d 80%);`;
const backColor = colors.gray;
const time = '3s';
const size  = '8px';

const getWidth = keyframes`
    100% { width: 100%;
`;

const LoaderWrapper = styled.div`
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0; left: 0;
  display: flex;
  align-items: center;
  align-content: center; 
  justify-content: flex-start;  
  z-index: 100000;
`;

const LoaderElement = styled.div`
	height: ${size};
	width: 100%;
	background: ${backColor};
	
	position: absolute;
	left: 0;
	top: 0;
	
	&:before {
	    content: '';
        display: block;
        background: ${loaderColor};
        height: 8px;
        width: 0;
        animation: ${getWidth} ${time} ease-in infinite;
	}
	
`;


const S = { LoaderWrapper, LoaderElement };

export default S;