import React, { Component } from 'react';
import { deleteObjects, selectAll, selectNone, activateAllSelected, deactivateAllSelected } from '../actions';
import TopBar from '../containers/library/top-bar';
import Tabs from './library/blocks/tabs';
import Api from '../api';
import { getRouterPath } from '../utils';

const Catalog = (props) => {

    function getTopBar() {
        const path = getRouterPath(props.routes);
        const { pathname, query: { q: query } } = props.location;

        switch (path) {
            case 'catalog':
                return <TopBar
                    pathname={pathname}
                    query={query}
                    onDelete={Api.user.isAdmin() ? deleteObjects : null}
                    onSelect={{true: selectAll, false: selectNone, name: 'Выбрать все'}}
                    actions={Api.user.isAdmin() ? [
                        {name: 'Активировать все помеченные', action: activateAllSelected},
                        {name: 'Деактивировать все помеченные', action: deactivateAllSelected}
                    ] : undefined}
                />;

            default:
                return <TopBar
                    pathname={pathname}
                    query={query}
                    onSelect={{true: selectAll, false: selectNone, name: 'Выбрать все'}}
                />;
        }
    }

    console.log('Catalog - render');

    return (
        <div className="b-filter__right">
            {getTopBar()}
            <div className="b-filter__content">
                <div className="b-section__tab js-tabWrap">
                    <Tabs {...props} />
                    {props.children}
                </div>
            </div>
        </div>
    );

};

export default Catalog;