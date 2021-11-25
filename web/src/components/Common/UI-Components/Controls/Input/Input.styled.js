import styled, {css} from 'styled-components';
import { Input, Select } from 'antd';
import MaskedInput from 'antd-mask-input'
import colors from '../../../../../constants/styles/colors';
import fonts from '../../../../../constants/styles/fonts';

const Wrapper = styled.div`
    position: relative;
    margin-bottom: 20px;
    width: ${props => props.width || '100%'};
`;

const Label = styled.label`
    display: block;
    color: ${colors.darkGray};
    fonts: ${fonts.small};
    line-height: 14px;
`;

const baseInputStyles = css`
    padding: 20px 0;
    color: ${colors.black};
    font-size: ${fonts.large};
    line-height: 19px;
    
    border: none;
    border-bottom: 1px solid ${colors.gray}; 
    
        
    &:hover, &:focus {
        border: none;
        border-bottom: 1px solid ${colors.purple}; 
        box-shadow: none;
    }
`;

const StyledInput = styled(Input)`
   ${baseInputStyles}
`;

const StyledMaskedInput = styled(MaskedInput)`
   ${baseInputStyles}
`;

const StyledSelect = styled(Select)`
   ${baseInputStyles}
   width: 100%;
   padding-bottom: 0;
   height: calc(100% - 20px);
   && {
       .ant-select-selector {
            border: none !important;
            box-shadow: none !important;
            padding: 0;
       }
       
       .ant-select-arrow {
          padding-right: ${props => props.additionalIcon ? '45px' : '0'};
       }
   }
   
`;

const S = { Wrapper, Label, StyledInput, StyledSelect, StyledMaskedInput };

export default S;