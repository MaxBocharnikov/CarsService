import React from 'react';
import DatePicker from '../../components/DatePickerPage/DatePicker/DatePicker';
import { Layout } from 'antd';

const DatePickerPage = ({selectedDate, setSelectedDate}) => {
    const { Content } = Layout;
    return (
        <Content>
            <DatePicker
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
        </Content>
    )
};

export default DatePickerPage;