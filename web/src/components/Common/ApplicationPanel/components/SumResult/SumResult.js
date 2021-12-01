import React from 'react';
import S from './SumResult.styled'

const SumResult = ({fields, isRecommendation}) => {

    const works = isRecommendation ? fields.recommendedWorks : fields.works;
    const parts = isRecommendation ? fields.recommendedParts : fields.parts;
    const sum = isRecommendation ? fields.recommendedSum : fields.sum;

    const worksSum = works.reduce((acm, current) => acm + current.sum, 0);
    const partsSum = parts.reduce((acm, current) => acm + current.sum, 0);

    const data = [
        {id: 1, label: 'Итог по работе', value: `${worksSum}₽`},
        {id: 2, label: 'Итог по запчастям', value: `${partsSum}₽`},
        {id: 3, label: 'Итог по заявке', value: `${sum}₽`},
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