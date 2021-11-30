import styled from 'styled-components';
import {Table} from 'antd';
import fonts from '../../../../constants/styles/fonts';
import colors from '../../../../constants/styles/colors';
import Button from '../Controls/Button/Button';
import Input from '../Controls/Input/Input';

const Wrapper = styled.div`
    margin-top: -20px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-bottom: 60px;
`;

const _Button = styled(Button)`
    width: 300px;
    height: 39px;
    border-radius: 8px;
    border: 1px solid ${colors.darkGray};
    font-size: ${fonts.large};
    line-height: 19px;
    text-align: center;
    color: ${colors.darkGray};
    padding: 0;
    
    &:hover, &:active, &:focus {
        border: 1px solid ${colors.darkGray};
        color: ${colors.darkGray};  
    }
`;

const _Table = styled(Table)`
  .ant-table-cell {
    background: none;
    
    font-size: ${fonts.small};
    color: ${colors.darkGray};
    border-bottom: 1px solid #BDBDBD;
    
    &:first-child {
        padding-left: 0;
    }
    
    .ant-input {
        border-color: ${colors.purple};
    }
    
  }
  
  .ant-table-tbody {
    .ant-table-cell {
        color: ${colors.black};
    }
  }
  
  .ant-empty-image{
    display: none;
  }
`;

const _Input = styled(Input)`
    margin-bottom: 0;
`;

const S = { Wrapper, _Table, Header, _Button, _Input };

export default S;