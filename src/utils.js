import Parse from 'parse';

export function getRoute (pathname) {
    pathname = pathname.substr(1);

    if (pathname.indexOf('/') == -1) return pathname;

    return pathname.substr(0, pathname.indexOf('/', 1));
}

export function isAdmin () {
    return Parse.User.current().get('role') == 2;
}

export function requireAuth (nextState, replace) {
    if (!Parse.User.current()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}

export const paginatorLimit = 10;

export function dateForInput (date) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);

    return date.getFullYear() + '-' + (month) + '-' + (day);
}