import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { requireAuth } from './utils/user';
import App from './components/app';
import Login from './containers/login';
import ChangePassword from './containers/change-password';
import CatalogList from './containers/catalog/list';

export default (
    <Route>
        <Route path="/" component={App} onEnter={requireAuth}>
            <Route path="change-password" component={ChangePassword} />

            <Route path="catalog(/:category)">
                <IndexRoute component={CatalogList} />

                {/*<Route component={Catalog}>*/}

                    {/*<Route path=":category" component={CatalogList} />*/}
                {/*</Route>*/}
                {/*<Route path="new/:category" component={CatalogNew} />*/}
                {/*<Route path="edit/:category" component={CatalogEdit} />*/}
            </Route>

            {/*<Route path="callback" component={Catalog}>*/}
                {/*<Route path=":category" component={CatalogList} />*/}
                {/*<Route path="view/:id" component={CallbackList} />*/}
            {/*</Route>*/}
            {/*<Route path="reviews" component={Catalog}>*/}
                {/*<Route path=":category" component={CatalogList} />*/}
                {/*<Route path="view/:id" component={ReviewsList} />*/}
            {/*</Route>*/}

            <IndexRedirect to="catalog" />
        </Route>
        <Route path="login" component={Login}/>
    </Route>
);