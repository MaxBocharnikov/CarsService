import styled from 'styled-components';
import colors from '../../constants/styles/colors';
import fonts from '../../constants/styles/fonts';

const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    margin-left: -100px;
    margin-right: -100px;
`;

const Header = styled.h1`
    color: ${colors.black};
    font-size: ${fonts.header};
    line-height: 25px;
    margin-top: -30px;
    text-transform: uppercase;
    font-weight: 600;
    margin-left: 100px;
    
`;

const FormBlock = styled.div`
    position: absolute;
    
    left: 0;
    right: 0;

    top: calc(50% - 218px);

    
    margin: auto;
    
    width: 400px;
    height: 218px;
    
    button {
        width: 100%;
        height: 60px;
    }
`;

const S = { Wrapper, Header, FormBlock };

export default S;