import { createSlice} from '@reduxjs/toolkit'

import OrdersApi from '../services/api/order';
import {mapFromOrderToUpdatingOrder} from '../utils/mapping/order';
import {updatePart} from './parts';

const orders = createSlice({
    name: 'orders',
    initialState: {
        ordersList: [],
        orderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {
        setOrdersList: (state, action) => {
            state.ordersList = action.payload;
        },

        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload
        },

        setError: (state, action) => {
            state.error = action.payload
        },
    }
});

export const fetchOrders = (query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const orders = await OrdersApi.fetchOrders(query);
        dispatch(setOrdersList(orders));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'))
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateOrder = (order, query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await OrdersApi.updateOrder(mapFromOrderToUpdatingOrder(order));
        dispatch(fetchOrders(query))
        const filteredParts = [];
        order.parts.forEach(p => {
            const index = filteredParts.findIndex(f => f.part.partId === p.partId);
            if (index !== -1) {
                filteredParts[index].count = filteredParts[index].count + +p.reserved;
            } else {
                filteredParts.push({part: p, count: +p.quantity + p.reserved})
            }
        });
        filteredParts.forEach(filtered => dispatch(updatePart({...filtered.part, reserved: filtered.part.reserved
            ? filtered.part.reserved + filtered.count
            : filtered.count, id: filtered.part.partId
        })));
    } catch(e) {
        console.error(e);
        dispatch(setError(e));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createOrder = (order, query) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await OrdersApi.createOrder(order);
        dispatch(fetchOrders(query));
        const filteredParts = [];
        order.parts.forEach(p => {
            const index = filteredParts.findIndex(f => f.part.partId === p.partId);
            if (index !== -1) {
                filteredParts[index].count = filteredParts[index].count + +p.reserved;
            } else {
                filteredParts.push({part: p, count: +p.quantity + p.reserved})
            }
        });
        filteredParts.forEach(filtered => dispatch(updatePart({...filtered.part, reserved: filtered.part.reserved
            ? filtered.part.reserved + filtered.count
            : filtered.count, id: filtered.part.partId
        })));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchOrderDetails = (id) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const application = await OrdersApi.fetchOrderDetails(id);
        dispatch(setOrderDetails(application));
    } catch(e) {
        console.error(e);
        dispatch(setError('Something went wrong'));
    } finally {
        dispatch(setLoading(false));
    }
} ;

export const {setOrdersList, setOrderDetails, setLoading, setError} = orders.actions;
export default orders.reducer;