import { createStore, combineReducers, applyMiddleware } from 'redux';
import user from './reducers/userReduers';
import math from './reducers/mathReducers';

const store = createStore(combineReducers({
    math,
    user
}), applyMiddleware());

export default store;