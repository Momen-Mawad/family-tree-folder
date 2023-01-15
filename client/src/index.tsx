import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './i18n';


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
