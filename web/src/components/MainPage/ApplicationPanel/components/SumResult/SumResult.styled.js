import styled from 'styled-components';
import fonts from '../../../../../constants/styles/fonts';
import colors from '../../../../../constants/styles/colors';

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    
    margin-bottom: 80px;
`;

const Item = styled.div`
    width: 200px;
    padding-top: 21px;
   
    line-height: 120px;
   
    border-top: 1px solid #BDBDBD; 
    margin-bottom: 20px;
    
`;

const Label = styled.div`
    font-size: ${fonts.large};
    color: ${colors.darkGray};
`;

const Value = styled.div`
    font-size: ${fonts.header};
    color: ${colors.black};
`;

const S = { Wrapper, Item, Label, Value  };

export default S;