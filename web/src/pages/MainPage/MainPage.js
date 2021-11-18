import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Layout } from 'antd';
import moment from 'moment';
import TimeLinePicker from '../../components/MainPage/TimeLinePicker/TimeLinePicker';
import {fetchApplicationsByDate, setApplicationsList, setSelectedDate} from '../../store/applications';
import {fetchPosts} from '../../store/posts';
import CalendarComponent from '../../components/MainPage/Calendar/Calendar';

const MainPage = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.applications.selectedDate);
    const applications = useSelector(state => state.applications.applicationsList);
    const posts = useSelector(state => state.posts.postsList);

    const [isCalendarShown, setCalendarShow] = useState(false);
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);

    const { Content } = Layout;

    const setApplications = useCallback((newItems) => {
        dispatch(setApplicationsList(newItems));
    }, [dispatch]);

    const onChangeDate = useCallback((newDate) => {
        dispatch(setSelectedDate(newDate.startOf('day').format('YYYY.MM.DD, HH:mm:ss')));
    }, [dispatch]);

    const onCalendarSelect = (date) => {
        setSelectedCalendarDate(selectedDate);
        setCalendarShow(false);
        onChangeDate(date);
    };

    useEffect(() => {
        const startDate = moment(selectedDate).startOf('day').subtract(1, 'days').format('YYYY.MM.DD, HH:mm:ss');
        const endDate = moment(selectedDate).endOf('day').add('2', 'days').format('YYYY.MM.DD, HH:mm:ss');
        dispatch(fetchPosts());
        dispatch(fetchApplicationsByDate(startDate, endDate));
    }, [dispatch, selectedDate]);

    if (!posts.length) return null;

    return (
         <Content>
             <div style={{position: 'relative'}}>
                 <span
                     onClick={() => setCalendarShow(!isCalendarShown)}
                 >
                     {moment(selectedDate).format('DD.MM.YYYY')}
                 </span>
                 {isCalendarShown && <CalendarComponent onChangeDate={onCalendarSelect} />}

             </div>
             <TimeLinePicker
                 selectedDate={selectedDate}
                 groups={posts}
                 items={applications}
                 setItems={setApplications}
                 onChangeDate={onChangeDate}
                 selectedCalendarDate={selectedCalendarDate}
             />
         </Content>
    )
};

export default MainPage;