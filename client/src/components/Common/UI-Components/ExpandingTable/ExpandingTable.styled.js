import styled from 'styled-components';
import {Table} from 'antd';
import fonts from '../../../../constants/styles/fonts';
import colors from '../../../../constants/styles/colors';
import Button from '../Controls/Button/Button';

const Wrapper = styled.div`
    margin: 40px 0;
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
  
  .ant-btn:hover, .ant-btn:focus, .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${colors.purple} !important;
    border-color: ${colors.purple} !important;
  }
  
    .ant-table-tbody > tr.ant-table-row-selected > td {
        background: ${colors.gray}; 
        border-color: ${colors.gray};
    }
`;

const MoveButton = styled(Button)`
    font-size: ${fonts.primary};
    height: 30px;
    padding: 5px 0;
`;

const S = { Wrapper, _Table, MoveButton };

export default S;