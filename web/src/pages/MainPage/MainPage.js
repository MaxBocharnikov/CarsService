import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Layout } from 'antd';
import TimeLinePicker from '../../components/MainPage/TimeLinePicker/TimeLinePicker';
import {fetchApplicationsByDate, setApplicationsList} from '../../store/applications';
import {fetchPosts} from '../../store/posts';

const MainPage = () => {
    const dispatch = useDispatch();

    const selectedDate = useSelector(state => state.applications.selectedDate);
    const applications = useSelector(state => state.applications.applicationsList);
    const posts = useSelector(state => state.posts.postsList);

    const { Content } = Layout;

    const setApplications = useCallback((newItems) => {
        dispatch(setApplicationsList(newItems));
    }, [dispatch]);

    useEffect(() => {
        const startDate = selectedDate.startOf('day').format('YYYY.MM.DD, HH:mm:ss');
        const endDate = selectedDate.endOf('day').format('YYYY.MM.DD, HH:mm:ss');
        dispatch(fetchPosts());
        dispatch(fetchApplicationsByDate(startDate, endDate));
    }, [dispatch, selectedDate]);

    if (!applications.length || !posts.length) return null;
    return (
         <Content>
             <TimeLinePicker
                 selectedDate={selectedDate}
                 groups={posts}
                 items={applications}
                 setItems={setApplications}
             />
         </Content>
    )
};

export default MainPage;