import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './dev-tools';

const Root = ({ store, history }) => {

    return (
        <Provider store={store}>
            <div>
                <Router history={history} routes={routes} />
                <DevTools />
            </div>
        </Provider>
    );

};

export default Root;