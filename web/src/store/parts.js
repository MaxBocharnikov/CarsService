import { createSlice} from '@reduxjs/toolkit'
import Parts from '../services/api/parts';

const parts = createSlice({
    name: 'parts',
    initialState: {
        partsList: [],
        loading: false,
        error: null,
    },
    reducers: {
        setParts: (state, action) => {
            state.partsList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchParts = (v) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const parts = await Parts.fetchParts(v);
        dispatch(setParts(parts));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const createPart = (part, query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await Parts.createPart(part);
        if (query !== undefined) dispatch(fetchParts(query));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const updatePart = (part, query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await Parts.updatePart(part);
        dispatch(fetchParts(query));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const {setParts, setLoading, setError} = parts.actions;
export default parts.reducer;