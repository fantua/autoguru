import Parse from 'parse';
import { push } from 'react-router-redux';
import User from '../utils/user';

export const loginSuccess = (user) => function (dispatch, getState) {
    const { routing: { locationBeforeTransitions: location } } = getState();

    if (location.state && location.state.nextPathname) {
        dispatch(push(location.state.nextPathname));
    } else {
        dispatch(push('/catalog'));
    }
};
export const login = (login, password) => function (dispatch) {
    Parse.User.logIn(login, password)
        .then(user => { dispatch(loginSuccess(user)); })
        .catch(error => {
            // Temporary solution:
            console.log(error);
            alert(error.message);
        });
};

export const logoutSuccess = () => function (dispatch) {
    dispatch(push('/login'));
};
export const logout = () => function (dispatch) {
    Parse.User.logOut()
        .then(() => { dispatch(logoutSuccess()); })
        .catch(error => {
            // Temporary solution:
            console.log(error);
            alert(error.message);
        });
};

export const resetPassword = (email) => function () {
    Parse.User.requestPasswordReset(email)
        .catch(error => {
            // Temporary solution:
            console.log(error);
            alert(`Error(${error.code}):  ${error.message}`);
        });
};

export const changePasswordSuccess = () => function (dispatch) {
    alert('Пароль успешно изменен');
    dispatch(push('/catalog'));
};
export const changePassword = (password) => function (dispatch) {
    User.get().save({ password })
        .then(() => { dispatch(changePasswordSuccess()); })
        .catch((error) => {
            console.log(error);
            alert(error.message);
        });
};
