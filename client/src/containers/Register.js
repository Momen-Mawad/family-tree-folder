import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/Auth';
import CSRFToken from '../components/CSRFToken';

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: '',
        family_name: ''
    });
    const [accountCreated, setAccountCreated] = useState(false);

    const { username, password, re_password , family_name} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            register(username, password, re_password, family_name);
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Navigate to='/tree' />;
    else if (accountCreated)
        return <Navigate to='/login' />;

    return (
        <div className='container mt-5'>
            <h1>Register for an Account</h1>
            <p>Create an account with our Session Auth application</p>
            <form onSubmit={e => onSubmit(e)}>
                <CSRFToken />
                <div className='form-group'>
                    <label className='form-label'>Username: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Confirm Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Family Name: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Family Name*'
                        name='family_name'
                        onChange={e => onChange(e)}
                        value={family_name}
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>Register</button>
            </form>
            <p className='mt-3'>
                Already have an Account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);