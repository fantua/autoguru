import React from 'react';
import Parse from 'parse';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';
import Root from './components/root';

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID, process.env.REACT_APP_PARSE_JS_KEY);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL;

const store = configureStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);