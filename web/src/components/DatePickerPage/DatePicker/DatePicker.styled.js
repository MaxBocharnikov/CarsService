import styled from 'styled-components';

const BadgeWrapper = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    
    .ant-badge-status {
      width: 100%;
      overflow: hidden;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
    } 
`;

const S = { BadgeWrapper };

export default S;