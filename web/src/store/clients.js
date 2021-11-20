import { createSlice} from '@reduxjs/toolkit'
import ClientsApi from '../services/api/clients';

const clients = createSlice({
    name: 'clients',
    initialState: {
        clientsList: [],
        loading: false,
        error: null,
    },
    reducers: {
        setClientsList: (state, action) => {
            state.clientsList = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchClients = (query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const clients = await ClientsApi.fetchClients(query);
        dispatch(setClientsList(clients));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const {setClientsList, setLoading, setError} = clients.actions;
export default clients.reducer;