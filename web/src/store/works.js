import { createSlice} from '@reduxjs/toolkit'
import Works from '../services/api/works';

const works = createSlice({
    name: 'works',
    initialState: {
        worksList: [],
        loading: false,
        error: null,
    },
    reducers: {
        setWorks: (state, action) => {
            state.worksList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchWorks = () => async dispatch => {
    try {
        dispatch(setLoading(true));
        const works = await Works.fetchWorks();
        dispatch(setWorks(works));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const {setWorks, setLoading, setError} = works.actions;
export default works.reducer;