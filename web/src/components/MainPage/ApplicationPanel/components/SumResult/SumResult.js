import React from 'react';
import S from './SumResult.styled'

const SumResult = ({fields}) => {
    const worksSum = fields.works.reduce((acm, current) => acm + current.sum, 0);
    const partsSum = fields.parts.reduce((acm, current) => acm + current.sum, 0);

    const data = [
        {id: 1, label: 'Итог по работе', value: `${worksSum}₽`},
        {id: 2, label: 'Итог по запчастям', value: `${partsSum}₽`},
        {id: 3, label: 'Итог по заявке', value: `${fields.sum}₽`},
    ];

    return (
        <S.Wrapper>
            {data.map(i => (
                <S.Item key={i.id}>
                    <S.Label>{i.label}</S.Label>
                    <S.Value>{i.value}</S.Value>
                </S.Item>
            ))}
        </S.Wrapper>
    )
};

export default React.memo(SumResult);