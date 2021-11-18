import React from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import S from './Calendar.styled'

const CalendarComponent = ({onChangeDate}) => {

    const onSelect = (date) => {
        onChangeDate(moment(date))
    };

    return (
        <S.Wrapper>
            <Calendar fullscreen={false} onSelect={onSelect} />
        </S.Wrapper>
    )
};

export default CalendarComponent;