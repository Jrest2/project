import { combineReducers } from 'redux';
import { login } from '../actions/auth';
import { asyncReducer } from '../utils';

export default combineReducers({
    login: asyncReducer(login)
});