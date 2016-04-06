import React from 'react';
import { render } from 'react-dom';
import Parse from 'parse';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { requireAuth } from './utils';
import App from './components/app';
import Login from './components/login';
import CatalogList from './components/shared/catalog-list';
import CallbackList from './components/callback/list';
import ReviewsList from './components/reviews/list';


Parse.initialize('w7DLv4hcHT9Hg8VJ23URtZsmnTzOwVIsTQPJXO4j', 'f6CT7PkXFsSmjRkpw41FlAp15nEZqs1j1SDpF8YZ');

render((
    <Router history={browserHistory}>
        <Route path="/" component={App} onEnter={requireAuth}>
            <Route path="catalog">
                <Route path=":category" component={CatalogList} />
            </Route>
            <Route path="callback">
                <Route path=":category" component={CatalogList} />
                <Route path="view/:id" component={CallbackList} />
            </Route>
            <Route path="reviews">
                <Route path=":category" component={CatalogList} />
                <Route path="view/:id" component={ReviewsList} />
            </Route>
        </Route>
        <Route path="login" component={Login}/>
    </Router>
), document.getElementById('app'));



