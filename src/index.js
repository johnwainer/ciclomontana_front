import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';

if(!localStorage.getItem('user_id')){
	ReactDOM.render( < Login / > , document.getElementById('root'));
}else{
	ReactDOM.render( < App / > , document.getElementById('root'));
}

serviceWorker.unregister();