import React, { useState, useEffect, Fragment } from 'react';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/Auth';
import { load_tree } from '../actions/tree';

const Layout = ({ children, checkAuthenticated, load_tree}) => {

    const [data, setData ] = useState({});

    useEffect(() => {
        checkAuthenticated();
        load_tree();
    }, []);

    return (
        <Fragment>
            <Navbar />
            {children}
        </Fragment>
    );
};

export default connect(null, { checkAuthenticated, load_tree })(Layout);