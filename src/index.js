import React from 'react';
import ReactDOM from 'react-dom';
import './styleInit';
import './index.css';
import App from './components/App';

import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

var config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};
firebase.initializeApp(config);

firebase.firestore().enablePersistence();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();