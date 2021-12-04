import { createSlice} from '@reduxjs/toolkit'
import moment from 'moment';

import ApplicationsApi from '../services/api/applications';
import {mapFromApplicationToUpdatingApplication} from '../utils/mapping/applications';

const applications = createSlice({
    name: 'applications',
    initialState: {
        applicationsList: [],
        applicationDetails: null,
        loading: false,
        error: null,
        selectedDate: moment().startOf('day').format('YYYY.MM.DD, HH:mm:ss'),
    },
    reducers: {
        setApplicationsList: (state, action) => {
            state.applicationsList = action.payload;
        },

        setApplicationDetails: (state, action) => {
            state.applicationDetails = action.payload;
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

export const fetchApplications = (query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const applications = await ApplicationsApi.fetchApplications(query);
        dispatch(setApplicationsList(applications));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchApplicationsByDate = () => async (dispatch, getState) => {
    const selectedDate = getState().applications.selectedDate;
    const startDate = moment(selectedDate).startOf('day').subtract(1, 'days').format('YYYY.MM.DD, HH:mm:ss');
    const endDate = moment(selectedDate).endOf('day').add('2', 'days').format('YYYY.MM.DD, HH:mm:ss');
    try {
        dispatch(setLoading(true));
        const applications = await ApplicationsApi.fetchApplicationsByDate(startDate, endDate);
        dispatch(setApplicationsList(applications));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateApplication = (application, query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await ApplicationsApi.updateApplications(mapFromApplicationToUpdatingApplication(application));
        query === undefined
            ? dispatch(fetchApplicationsByDate())
            : dispatch(fetchApplications(query))
    } catch(e) {
        console.error(e);
        dispatch(setError(e));
        dispatch(fetchApplicationsByDate());
    } finally {
        dispatch(setLoading(false));
    }
};

export const createApplication = (application, toEdit, query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const {result} = await ApplicationsApi.createApplications(application);
        typeof query === undefined
        ? dispatch(fetchApplications(query))
        : dispatch(fetchApplicationsByDate());
        if (toEdit) {
            dispatch(fetchApplicationDetails(result.id));
        }
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchApplicationDetails = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const application = await ApplicationsApi.fetchApplicationDetails(id);
        dispatch(setApplicationDetails(application));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'));
    } finally {
        dispatch(setLoading(false));
    }
} ;

export const {setApplicationsList, setApplicationDetails, setSelectedDate, setLoading, setError} = applications.actions;
export default applications.reducer;