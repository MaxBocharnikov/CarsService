import { createSlice} from '@reduxjs/toolkit'
import TrailersApi from '../services/api/trailers';

const trailers = createSlice({
    name: 'trailers',
    initialState: {
        trailersList: [],
        loading: false,
        error: null,
    },
    reducers: {
        setTrailersList: (state, action) => {
            state.trailersList = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchTrailers = (query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const trailers = await TrailersApi.fetchTrailers(query);
        dispatch(setTrailersList(trailers));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const createTrailer = (trailers) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await TrailersApi.createTrailer(trailers);
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const {setTrailersList, setLoading, setError} = trailers.actions;
export default trailers.reducer;