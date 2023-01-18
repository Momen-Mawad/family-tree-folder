import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/Auth';
import CSRFToken from '../components/CSRFToken';

import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Login = ({ login, isAuthenticated }) => {

    const { t, i18n } = useTranslation();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        login(username, password);
    };

    if (isAuthenticated)
        return <Navigate to='/tree' />;

    return (
        <div className='container mt-5'>
            <h1>{t('Login.login')}</h1>
            <p>{t('Login.loginInto')}</p>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className='form-group'>
                    <label className='form-label'>{t('Login.username')}: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder={t("Login.username") + "*"}
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>{t('Login.password')}: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder={t("Login.password") + "*"}
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>{t('Login.login')}</button>
            </form>
        {/*
            <p className='mt-3'>
                {t('Login.dontHave')} <Link to='/register'>{t('Login.register')}</Link>
            </p>
        */}
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);