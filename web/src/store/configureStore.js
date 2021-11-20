import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import applications from './applications';
import posts from './posts';
import clients from './clients';
import trailers from './trailers';
;

const reducer = combineReducers({
    applications,
    posts,
    clients,
    trailers,
});

const store = configureStore({
    reducer
});
export default store;