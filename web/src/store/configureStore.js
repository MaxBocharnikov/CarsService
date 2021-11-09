import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import applications from './applications';
import posts from './posts';

const reducer = combineReducers({
    applications,
    posts,
});

const store = configureStore({
    reducer
});
export default store;