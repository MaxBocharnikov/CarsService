import styled from 'styled-components';
import { Layout } from 'antd';
import fonts from '../../constants/styles/fonts';
import colors from '../../constants/styles/colors';

const { Header } = Layout;

const _Header = styled(Header)`
    background: #FFFBF0;
    height: 79px;
    padding: 0 100px; 
    border-bottom: 1px solid ${colors.gray};
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    
    a {
        font-size: ${fonts.primary};
        font-weight: 600;
        border-right: 1px solid ${colors.gray};
        color: ${colors.black};
        text-align: center;
        width: 100%;
        padding-top: 6px;
        
      &:hover, &:active {
            background: ${colors.blue};
            color: ${colors.white};
      }
    }
    
    .active {
        background: ${colors.blue};
        color: ${colors.white};
    }
`;

const S = { _Header  };

export default S;