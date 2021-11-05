import React from 'react';
import DatePicker from '../../components/DatePickerPage/DatePicker/DatePicker';
import { Layout } from 'antd';

const DatePickerPage = ({selectedDate, setSelectedDate, items}) => {
    const { Content } = Layout;
    return (
        <Content>
            <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                items={items}
            />
        </Content>
    )
};

export default DatePickerPage;