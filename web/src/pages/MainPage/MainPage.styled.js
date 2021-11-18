import styled from 'styled-components';
import colors from '../../constants/styles/colors';
import fonts from '../../constants/styles/fonts';

const DateTitle = styled.span`
    display: block;
    color: ${colors.large};
    font-size: ${fonts.header};
    font-weight: 600;
    margin-bottom: 40px;
`;

const S = { DateTitle };

export default S;