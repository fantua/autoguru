import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';
import { requireAuth } from './utils';
import App from './containers/app';
import CatalogList from './containers/shared/catalog-list';
import Login from './components/login';
import Catalog from './components/catalog';
import CatalogNew from './components/catalog/new';
import CatalogEdit from './components/catalog/edit';
import CallbackList from './containers/callback/list';
import ReviewsList from './containers/reviews/list';
import ChangePassword from './components/change-password';

const reducer = combineReducers({
    app: reducers,
    routing: routerReducer
});

const store = createStore(
    reducer,
    applyMiddleware(thunkMiddleware)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App} onEnter={requireAuth}>
                <Route path="catalog">
                    <Route component={Catalog}>
                        <IndexRoute />
                        <Route path=":category" component={CatalogList} />
                    </Route>
                    <Route path="new/:category" component={CatalogNew} />
                    <Route path="edit/:category" component={CatalogEdit} />
                </Route>
                <Route path="change-password" component={ChangePassword} />
                <Route path="callback" component={Catalog}>
                    <Route path=":category" component={CatalogList} />
                    <Route path="view/:id" component={CallbackList} />
                </Route>
                <Route path="reviews" component={Catalog}>
                    <Route path=":category" component={CatalogList} />
                    <Route path="view/:id" component={ReviewsList} />
                </Route>
                <IndexRedirect to="catalog" />
            </Route>
            <Route path="login" component={Login}/>
        </Router>
    </Provider>
, document.getElementById('app'));
