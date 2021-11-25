import styled from 'styled-components';
import Switcher from '../UI-Components/Switcher/Switcher';
import colors from '../../../constants/styles/colors';

const _Switcher = styled(Switcher)`
    margin-bottom: 40px;
`;

const SubTitle = styled.h3`
    color: ${colors.black};
    font-size: 18px;
    line-height: 22px;
    
    margin: 20px 0;
    
    text-transform: uppercase;
    font-weight: 600;
    
`;

const ArrayBlock = styled.div`
   padding-bottom: 20px;
`;

const S = { _Switcher, SubTitle, ArrayBlock  };

export default S;