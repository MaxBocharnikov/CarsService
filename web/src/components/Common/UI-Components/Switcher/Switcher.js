import React from 'react';
import S from './Switcher.styled';

const Switcher = ({
  selectedValue,
  options,
}) => {
    return (
        <S.Wrapper>
            {options.map(o => (
                <S._Button
                    key={o.value}
                    isSelected={o.value === selectedValue}
                    onClick={o.onClick}
                >
                    {o.label}
               </S._Button>
            ))}
        </S.Wrapper>
    )
};

export default React.memo(Switcher);