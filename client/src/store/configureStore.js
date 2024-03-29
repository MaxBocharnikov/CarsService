import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import applications from './applications';
import posts from './posts';
import clients from './clients';
import trailers from './trailers';
import workingHours from './workingHours';
import works from './works';
import parts from './parts';
import orders from './orders';


const reducer = combineReducers({
    applications,
    posts,
    clients,
    trailers,
    workingHours,
    works,
    parts,
    orders,
});

const store = configureStore({
    reducer
});
export default store;