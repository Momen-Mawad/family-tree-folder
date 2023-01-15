import Cookies from 'js-cookie';
import axios from 'axios';
import { load_tree } from './tree';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL
} from './Types';

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/authentication/authenticated/`,
         config);

        if (res.data.error || res.data.isAuthenticated === 'error') {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
        else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            });
        }
        else {
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            });
        }
    } catch(err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        });
    }
};


export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password });

    try {
        const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/authentication/login`,
        body,
        config);

        if (res.data.success) {
            dispatch({
                type: LOGIN_SUCCESS
            });

            dispatch(load_tree());
        } else {
            dispatch({
                type: LOGIN_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};


export const register = (username, password, re_password, family_name) => async dispatch => {
    const config = {
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({ username, password, re_password , family_name});

    try {
        const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/authentication/register`,
        body,
        config);

        if (res.data.error) {
            dispatch({
                type: REGISTER_FAIL
            });
        } else {
            dispatch({
                type: REGISTER_SUCCESS
            });
        }
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        });
    }
};

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/authentication/logout`,
        body,
        config);

        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch(err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};
