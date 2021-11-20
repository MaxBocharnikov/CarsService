import styled, { createGlobalStyle } from "styled-components";
import colors from './constants/styles/colors';

const GlobalStyle = createGlobalStyle`
    @font-face {
      font-family: 'TT Interfaces';
      src: url('../../public/fonts/TTInterfaces-Regular.ttf');
    }
    
     @font-face {
      font-family: 'TT Interfaces';
      src: url('../../public/fonts/TTInterfaces-Bold.ttf');
    }
    
    @font-face {
      font-family: 'TT Interfaces';
      src: url('../../public/fonts/TTInterfaces-Medium.ttf');
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    
    html {
      font-size: 14px;
      line-height: 17px;
    }
    
    body, input, textarea, button, select, option {
      font-family: 'TT Interfaces', sans-serif !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background: $container-background-color;
    }
    
    .ant-layout {
        background: ${colors.white}; 
    }
    
    .ant-layout-content {
        margin: 0 100px;
        margin-top: 90px;
    }
    
    .oneLineItems {
        display: flex;
        justify-content: space-between;
    }
    
`;


const S = { GlobalStyle };
export default S;
