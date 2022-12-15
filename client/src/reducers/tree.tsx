import {
    LOAD_TREE_SUCCESS,
    LOAD_TREE_FAIL,
    UPDATE_TREE_SUCCESS,
    UPDATE_TREE_FAIL
} from '../actions/Types';

const initialState = {

};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOAD_TREE_SUCCESS:
        case UPDATE_TREE_SUCCESS:
            return {
              payload
            }
        case LOAD_TREE_FAIL:
            return {
            }
        case UPDATE_TREE_FAIL:
            return {
                ...state
            }
        default:
            return state
    };
};