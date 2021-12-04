import styled from 'styled-components';
import { Button } from 'antd';
import fonts from '../../../../../constants/styles/fonts';

const StyledButton = styled(Button)`
    width: 280px;
    height: 60px;
    
    text-align: center;
    font-size: ${fonts.large};
    line-height: 19px;
    padding: 20px 0;
    
    background: ${props => props.styles.background};
    border: ${props => props.styles.border};
    color: ${props => props.styles.color};
    
    &:hover, &:active, &:focus {
      background: ${props => props.styles.background};
      border: ${props => props.styles.border};
      color: ${props => props.styles.color};   
    }
    
    &:disabled {
      background: ${props => props.styles.background};
      border: ${props => props.styles.border};
      color: ${props => props.styles.color};
      opacity: .8;
      
      
      &:active, &:hover {
          background: ${props => props.styles.background};
          border: ${props => props.styles.border};
          color: ${props => props.styles.color};
          opacity: .8;
      }
      
    }
    
`;

const S = { StyledButton  };

export default S;