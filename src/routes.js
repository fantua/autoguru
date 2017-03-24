import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { requireAuth } from './utils/user';
import App from './components/app';
import Login from './containers/login';
import ChangePassword from './containers/change-password';
import ObjectsList from './containers/objects';
import ObjectsCreate from './containers/objects/create';
import ObjectsEdit from './containers/objects/edit';
import CallbacksList from './containers/callbacks';
import ReviewsList from './containers/reviews';

export default (
    <Route>
        <Route path="/" component={App} onEnter={requireAuth}>
            <Route path="change-password" component={ChangePassword} />

            <Route path="catalog(/:category)">
                <IndexRoute component={ObjectsList} />
                <Route path="create" component={ObjectsCreate} />
                <Route path="edit/:id" component={ObjectsEdit} />
                <Route path="callbacks/:id" component={CallbacksList} />
                <Route path="reviews/:id" component={ReviewsList} />

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