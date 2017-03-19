import Parse from 'parse';

const User = {

    get(property = null) {
        if (property == null) {
            return Parse.User.current();
        }

        return Parse.User.current().get(property);
    },

    isAdmin() {
        return Parse.User.current().get('role') === 2;
    },

    isLoggedIn() {
        return !!Parse.User.current();
    }

};

export default User;

export function requireAuth (nextState, replace) {
    if (!User.isLoggedIn()) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        });
    }
}