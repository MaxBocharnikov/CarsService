import React from 'react';
import { Calendar, Badge } from 'antd';
import S from './DatePicker.styled';

function getListData(value) {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
}

function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <S.BadgeWrapper className="events">
            {listData.map(item => (
                <li key={item.content}>
                    <Badge status={item.type} text={item.content} />
                </li>
            ))}
        </S.BadgeWrapper>
    );
}


const DatePicker = ({setSelectedDate}) => {

    const onDateChange = (date) => {
        date.set({hour: 12, minute: 0, second: 0, millisecond: 0});
        setSelectedDate(date);
    };

    return (
        <Calendar
            dateCellRender={dateCellRender}
            onSelect={onDateChange}
        />
    )
};

export default DatePicker;