import styled from 'styled-components';
import {Table} from 'antd';
import fonts from '../../../../constants/styles/fonts';
import colors from '../../../../constants/styles/colors';

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
`;

const S = { Wrapper, _Table };

export default S;