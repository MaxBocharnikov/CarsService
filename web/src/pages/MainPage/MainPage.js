import React, {useCallback} from 'react';
import { Layout } from 'antd';
import Header from '../../components/MainPage/Header/Header';
import TimeLinePicker from '../../components/MainPage/TimeLinePicker/TimeLinePicker';

const MainPage = ({
   selectedDate,
   setSelectedDate,
   groups,
   items,
   setGroups,
   setItems,
}) => {
    const { Content } = Layout;

    const onChangeDate = useCallback((newDate) => {
        setSelectedDate(newDate);
    }, []);

    return (
        <>
         <Header onChangeDate={onChangeDate} />
         <Content>
             <TimeLinePicker
                 selectedDate={selectedDate}
                 groups={groups}
                 setGroups={setGroups}
                 items={items}
                 setItems={setItems}
             />
             />
         </Content>
        </>
    )
};

export default MainPage;