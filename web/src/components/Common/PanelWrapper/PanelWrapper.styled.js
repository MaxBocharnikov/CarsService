import styled from 'styled-components';
import fonts from '../../../constants/styles/fonts';
import colors from '../../../constants/styles/colors';


const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(16, 16, 16, 0.2);
    z-index: 2;
    left: 0;
    right: 0;
    position: fixed;
`;

const Wrapper = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    width: ${props => (props.isFullScreen ? '100%' : '620px')};
    height: 100%;
    padding: ${props => (props.isFullScreen ? '40px 100px' : '40px 20px')};
    background: ${colors.white};
    z-index: 1000;
    
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    font-size: ${fonts.header};
    color: ${colors.black};
    line-height: 25px;
    font-weight: 600;
    
    margin: 0;
    padding: 0;
    margin-bottom: 40px;
`;

const Content = styled.div`
    flex: 1;
`;

const Footer = styled.div`
    display: flex;
    justify-content:  ${props => (props.isFullScreen ? 'start' : 'space-between')};
`;


const S = { Overlay, Wrapper, Title, Content, Footer };

export default S;