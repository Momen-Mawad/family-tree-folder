import { combineReducers } from 'redux';
import auth from './auth';
import tree from './tree';

export default combineReducers({
    auth,
    tree
});