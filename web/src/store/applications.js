import { createSlice} from '@reduxjs/toolkit'
import moment from 'moment';

import ApplicationsApi from '../services/api/applications';
import {mapFromApplicationDtoToApplication} from '../utils/mapping/applications';

const applications = createSlice({
    name: 'applications',
    initialState: {
        applicationsList: [],
        loading: false,
        error: null,
        selectedDate: moment(),
    },
    reducers: {
        setApplicationsList: (state, action) => {
            state.applicationsList = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchApplications = () => async dispatch => {
    try {
        dispatch(setLoading(true));
        const applications = await ApplicationsApi.fetchApplications();
        dispatch(setApplicationsList(applications.map(mapFromApplicationDtoToApplication)));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchApplicationsByDate = (startDate, endDate) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const applications = await ApplicationsApi.fetchApplicationsByDate(startDate, endDate);
        dispatch(setApplicationsList(applications.map(mapFromApplicationDtoToApplication)));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const {setApplicationsList, setSelectedDate, setLoading, setError} = applications.actions;
export default applications.reducer;