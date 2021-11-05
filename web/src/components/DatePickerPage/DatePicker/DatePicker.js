import React from 'react';
import { Calendar, Badge } from 'antd';
import S from './DatePicker.styled';

function getListData(value, items) {
    return items.filter(item => {
        return item.start.isSame(value, 'day')
    }).map(i => ({type: 'success', content: i.title}));
}

function dateCellRender(value, items) {
    const listData = getListData(value, items);
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


const DatePicker = ({setSelectedDate, items}) => {

    const onDateChange = (date) => {
        date.set({hour: 12, minute: 0, second: 0, millisecond: 0});
        setSelectedDate(date);
    };

    return (
        <Calendar
            dateCellRender={value => dateCellRender(value, items)}
            onSelect={onDateChange}
        />
    )
};

export default DatePicker;