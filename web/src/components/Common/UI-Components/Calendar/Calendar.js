import React from 'react';
import { Calendar } from 'antd';
import moment from 'moment';
import S from './Calendar.styled'

const CalendarComponent = ({selectedDate, onChangeDate}) => {

    const onSelect = (date) => {
        onChangeDate(moment(date))
    };

    return (
        <S.Wrapper>
            <Calendar fullscreen={false} onSelect={onSelect} value={moment(selectedDate)} />
        </S.Wrapper>
    )
};

export default CalendarComponent;