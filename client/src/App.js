import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './hocs/Layout';

import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import TreeGraph from './components/Tree';

import { Provider } from 'react-redux';
import store from './Store';


const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/tree' element={<TreeGraph />}/>
        </Routes>
      </Layout>
    </Router>
 </Provider>
);

export default App;