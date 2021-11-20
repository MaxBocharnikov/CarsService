import React, { useState } from 'react';
import moment from 'moment';
import S from './SelectedDate.styled';
import CalendarComponent from '../../Common/UI-Components/Calendar/Calendar';

const SelectedDate = ({selectedDate, onCalendarSelect}) => {
    const [isCalendarShown, setCalendarShow] = useState(false);

    const onChangeDate = (date) => {
        setCalendarShow(false);
        onCalendarSelect(date);
    };

    return (
        <div style={{position: 'relative'}}>
            <S.DateTitle
                onClick={() => setCalendarShow(!isCalendarShown)}
            >
                {moment(selectedDate).format('DD.MM.YYYY')}
            </S.DateTitle>
            {isCalendarShown && <CalendarComponent onChangeDate={onChangeDate} selectedDate={selectedDate} />}

        </div>
    )
};

export default SelectedDate;