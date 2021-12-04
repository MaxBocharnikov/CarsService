import { createSlice} from '@reduxjs/toolkit'
import PostsApi from '../services/api/posts';

const posts = createSlice({
    name: 'posts',
    initialState: {
        postsList: [],
        loading: false,
        error: null,
    },
    reducers: {
        setPostsList: (state, action) => {
            state.postsList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchPosts = () => async dispatch => {
    try {
        dispatch(setLoading(true));
        const posts = await PostsApi.fetchPosts();
        dispatch(setPostsList(posts));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const {setPostsList, setLoading, setError} = posts.actions;
export default posts.reducer;