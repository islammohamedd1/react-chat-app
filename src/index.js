import React from 'react';
import ReactDOM from 'react-dom';
import './styleInit';
import './index.css';
import App from './components/App';

import * as firebase from 'firebase';

console.log('api key:', process.env.REACT_APP_API_KEY);
console.log('auth domain:', process.env.REACT_APP_AUTH_DOMAIN);
console.log('database url:', process.env.REACT_APP_DATABASE_URL);
console.log('projectId:', process.env.REACT_APP_PROJECT_ID);
console.log('messaging:', process.env.REACT_APP_MESSAGING_SENDER_ID);

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.vAUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));