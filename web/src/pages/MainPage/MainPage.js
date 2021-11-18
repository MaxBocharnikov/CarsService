import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Layout } from 'antd';
import moment from 'moment';
import TimeLinePicker from '../../components/MainPage/TimeLinePicker/TimeLinePicker';
import {
    fetchApplicationsByDate, setApplicationsList, setSelectedDate,
    updateApplication
} from '../../store/applications';
import {fetchPosts} from '../../store/posts';
import CalendarComponent from '../../components/MainPage/Calendar/Calendar';
import S from './MainPage.styled';
import {mapFromApplicationToTimeLineApplication} from '../../utils/mapping/applications';

const MainPage = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.applications.selectedDate);
    const applications = useSelector(state => state.applications.applicationsList);
    const posts = useSelector(state => state.posts.postsList);

    const [isCalendarShown, setCalendarShow] = useState(false);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

    const { Content } = Layout;

    const onApplicationChange = useCallback((newItem) => {
        const newApplications = applications.map(a => {
            return newItem.id === a.id
                ? newItem
                :  a
        });
        dispatch(setApplicationsList(newApplications)); //to update locally in a moment
        dispatch(updateApplication(newItem)); //to update on server
    }, [dispatch, JSON.stringify(applications)]);

    const onChangeDate = useCallback((newDate) => {
        dispatch(setSelectedDate(newDate.startOf('day').format('YYYY.MM.DD, HH:mm:ss')));
    }, [dispatch]);

    const onCalendarSelect = (date) => {
        setSelectedCalendarDate(selectedDate);
        setCalendarShow(false);
        onChangeDate(date);
    };

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchApplicationsByDate());
    }, [dispatch, selectedDate]);

    if (!posts.length) return null;

    return (
         <Content>
             <div style={{position: 'relative'}}>
                 <S.DateTitle
                     onClick={() => setCalendarShow(!isCalendarShown)}
                 >
                     {moment(selectedDate).format('DD.MM.YYYY')}
                 </S.DateTitle>
                 {isCalendarShown && <CalendarComponent onChangeDate={onCalendarSelect} selectedDate={selectedDate} />}

             </div>
             <TimeLinePicker
                 selectedDate={selectedDate}
                 groups={posts}
                 applications={applications}
                 items={applications.map(mapFromApplicationToTimeLineApplication)}
                 setItems={onApplicationChange}
                 onChangeDate={onChangeDate}
                 selectedCalendarDate={selectedCalendarDate}
             />
         </Content>
    )
};

export default MainPage;