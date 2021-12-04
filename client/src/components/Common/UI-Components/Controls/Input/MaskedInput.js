import React from 'react';
import S from './Input.styled';

const MaskedInput = ({
  label,
  value,
  onChange,
  width,
  mask
 }) => {
    return (
        <S.Wrapper width={width}>
            <S.Label>{label}</S.Label>
            <S.StyledMaskedInput
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                mask={mask}
            />
        </S.Wrapper>
    )
};

export default MaskedInput;