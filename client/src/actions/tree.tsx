import Cookies from 'js-cookie';
import axios from 'axios';
import {
    LOAD_TREE_SUCCESS,
    LOAD_TREE_FAIL,
    UPDATE_TREE_SUCCESS,
    UPDATE_TREE_FAIL
} from './Types';

export const load_tree = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };


    try {
        const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/tree/person/`,
        config
        );

        if (res.data.error) {
            dispatch({
                type: LOAD_TREE_FAIL
            });
        } else {

            dispatch({
                type: LOAD_TREE_SUCCESS,
                payload: res.data
            });
        }
    } catch (err) {
        dispatch({
            type: LOAD_TREE_FAIL
        });
    }
};

export const update_tree = (first_name, last_name, phone, city) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true,
        first_name,
        last_name,
        phone,
        city
    });

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, config);

        if (res.data.profile && res.data.username) {
            dispatch({
                type: UPDATE_TREE_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: UPDATE_TREE_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: UPDATE_TREE_FAIL
        });
    }
};