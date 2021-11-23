import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Layout } from 'antd';
import TimeLinePicker from '../../components/MainPage/TimeLinePicker/TimeLinePicker';
import {
    fetchApplicationDetails,
    fetchApplicationsByDate, setApplicationDetails, setApplicationsList, setSelectedDate,
    updateApplication
} from '../../store/applications';
import {fetchPosts} from '../../store/posts';
import {mapFromApplicationToTimeLineApplication} from '../../utils/mapping/applications';
import SelectedDate from '../../components/MainPage/SelectedDate/SelectedDate';
import ApplicationPanel from '../../components/MainPage/ApplicationPanel/ApplicationPanel';
import ExtendedApplicationPanel from '../../components/MainPage/ApplicationPanel/ExtendedApplicationPanel';

const MainPage = () => {
    const dispatch = useDispatch();
    const selectedDate = useSelector(state => state.applications.selectedDate);
    const applications = useSelector(state => state.applications.applicationsList);
    const applicationDetails = useSelector(state => state.applications.applicationDetails);
    const posts = useSelector(state => state.posts.postsList);

    const [selectedCalendarDate, setSelectedCalendarDate] = useState(null);
    const [newApplicationDefaultData, setNewApplicationDefaultData] = useState(null);

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

    const setNewApplicationDefaultDataMemo = useCallback(time => setNewApplicationDefaultData(time), []);

    const onChangeDate = useCallback((newDate) => {
        dispatch(setSelectedDate(newDate.startOf('day').format('YYYY.MM.DD, HH:mm:ss')));
    }, [dispatch]);

    const onCalendarSelect = (date) => {
        setSelectedCalendarDate(selectedDate);
        onChangeDate(date);
    };

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchApplicationsByDate());
    }, [dispatch, selectedDate]);

    if (!posts.length) return null;

    return (
        <>
        {newApplicationDefaultData && (
            <ApplicationPanel
                newApplicationDefaultData={newApplicationDefaultData}
                onClose={() => setNewApplicationDefaultDataMemo(null)}
            />
        )}
        {!!applicationDetails && (
            <ExtendedApplicationPanel
                applicationDetails={applicationDetails}
                onClose={() => dispatch(setApplicationDetails(null))}
            />
        )}
         <Content>
             <SelectedDate
                 selectedDate={selectedDate}
                 onCalendarSelect={onCalendarSelect}
             />
             <TimeLinePicker
                 selectedDate={selectedDate}
                 groups={posts}
                 applications={applications}
                 items={applications.map(mapFromApplicationToTimeLineApplication)}
                 setItems={onApplicationChange}
                 onChangeDate={onChangeDate}
                 selectedCalendarDate={selectedCalendarDate}
                 setNewApplicationDefaultDataMemo={setNewApplicationDefaultDataMemo}
                 onApplicationOpen={(id) => dispatch(fetchApplicationDetails(id))}
             />
         </Content>
        </>
    )
};

export default MainPage;