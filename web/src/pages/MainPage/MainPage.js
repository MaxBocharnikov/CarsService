import React, {useCallback} from 'react';
import { Layout } from 'antd';
import Header from '../../components/MainPage/Header/Header';
import TimeLinePicker from '../../components/MainPage/TimeLinePicker/TimeLinePicker';

const MainPage = ({selectedDate, setSelectedDate}) => {
    const { Content } = Layout;

    const onChangeDate = useCallback((newDate) => {
        setSelectedDate(newDate);
    }, []);

    return (
        <>
         <Header onChangeDate={onChangeDate} />
         <Content>
             <TimeLinePicker selectedDate={selectedDate}/>
         </Content>
        </>
    )
};

export default MainPage;