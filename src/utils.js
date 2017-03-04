import Api from './api';

export function requireAuth (nextState, replace) {
    if (!Api.user.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

export function dateForInput (date) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);

    return date.getFullYear() + '-' + (month) + '-' + (day);
}

export function getRouterPath (routes) {
    const { path } = routes[1];

    return path;
}