import React from 'react';
import S from './Input.styled';

const Input = ({
   label,
   value,
   onChange,
   width,
   placeholder,
   className,
   type,
}) => {
    return (
        <S.Wrapper width={width} className={className}>
            <S.Label>{label}</S.Label>
            <S.StyledInput
                type={type || "text"}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </S.Wrapper>
    )
};

export default Input;