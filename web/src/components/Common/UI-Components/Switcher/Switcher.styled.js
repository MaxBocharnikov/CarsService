import styled  from 'styled-components';
import {Button} from 'antd';
import colors from '../../../../constants/styles/colors';
import fonts from '../../../../constants/styles/fonts';

const Wrapper = styled.div`
    display: flex;
    border: 1px solid #BDBDBD;
    border-radius: 8px;
    padding: 5px 6px;   
    
    width: 580px; 
`;

const _Button = styled(Button)`
    display: block;
    width: 285px;
    height: 32px;
    text-align: center;
    font-size: ${fonts.small};
    line-height: 120%;
    border: none;
    border-radius: 6px;
    color: ${props => props.isSelected ? colors.white : colors.black};
    background: ${props => props.isSelected ? colors.purple : colors.white};
    
    &&& {
        &:hover, :active, &:focus {
       color: ${props => props.isSelected ? colors.white : colors.black} !important;
       background: ${props => props.isSelected ? colors.purple : colors.white} !important;   
       border: none !important;
    }
  }
`;

const S = { Wrapper, _Button };

export default S;