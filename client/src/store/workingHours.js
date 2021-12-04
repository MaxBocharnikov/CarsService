import { createSlice} from '@reduxjs/toolkit'
import WorkingHours from '../services/api/workingHours';

const workingHours = createSlice({
    name: 'workingHours',
    initialState: {
        workingHoursList: [],
        loading: false,
        error: null,
    },
    reducers: {
        setWorkingHours: (state, action) => {
            state.workingHoursList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchWorkingHours = () => async dispatch => {
    try {
        dispatch(setLoading(true));
        const posts = await WorkingHours.fetchWorkingHours();
        dispatch(setWorkingHours(posts));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const {setWorkingHours, setLoading, setError} = workingHours.actions;
export default workingHours.reducer;