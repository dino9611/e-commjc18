//! this file combines reducers and exports it

//? redux
import { combineReducers } from 'redux';
//? reducers
import authReducer from './authReducer';
import headerReducer from './headerReducer';

const reducers = combineReducers({ authReducer, headerReducer });
export default reducers;
