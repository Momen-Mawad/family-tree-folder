import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './hocs/Layout';

import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import TreeGraph from './components/Tree';

import { Provider } from 'react-redux';
import store from './Store';

import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import i18n from './i18n';


const App = () => {

  console.log("DKMM")

  return (
    <Suspense fallback={<Spin indicator={<LoadingOutlined spin />} />}>
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
   </Suspense>
  );
}

export default App;