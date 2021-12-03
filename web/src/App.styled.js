import styled, { createGlobalStyle } from "styled-components";
import colors from './constants/styles/colors';
import fonts from './constants/styles/fonts';

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
    
    .addItemBtn {
        outline: none;
        border: none;
        background: none;
        
        color: #4F4F4F;
        font-size: ${fonts.small};
        line-height: 14px;
        cursor: pointer;
        text-decoration: underline;
        display: block;
    }
    
    .ant-select-dropdown {
       z-index: 10009 !important;
     }
     
     
     @media print {
      .print {
        display: block;
      }
}
}
    
`;


const S = { GlobalStyle };
export default S;
