import React from 'react';
import S from './Input.styled';

const Input = ({
   label,
   value,
   onChange,
   width,
}) => {
    return (
        <S.Wrapper width={width}>
            <S.Label>{label}</S.Label>
            <S.StyledInput
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </S.Wrapper>
    )
};

export default Input;