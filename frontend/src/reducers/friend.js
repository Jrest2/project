import { combineReducers } from 'redux';
import { getFriends } from '../actions/friends';
import { asyncReducer } from '../utils';

export default combineReducers({
    getFriends: asyncReducer(getFriends)
});