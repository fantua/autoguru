import React from 'react';
import Parse from 'parse';
import { browserHistory } from 'react-router';

const Login = React.createClass({

    handleSubmit(e) {
        e.preventDefault();

        const login = this.refs.login.value.trim();
        const password = this.refs.password.value.trim();

        if (!login || !password) {
            return;
        }

        Parse.User.logIn(login, password, {
            success: (user) => {
                browserHistory.push('/catalog');
            },
            error: (user, error) => {
                console.log(error);
                alert(error.message);
            }
        });
    },

    render() {
        return (
            <div className="content login-page" >
                <div className="login-box-wrap">
                    <a href="#" className="logo-big"></a>
                    <form onSubmit={this.handleSubmit} id="login-form">
                        <input ref="login" name="login" type="text"  placeholder="Логин" required autoFocus />
                        <input ref="password" name="pass" type="password" placeholder="Пароль" required />
                        <input type="submit" value="Войти" />
                    </form>
                    <a  href="#" className="forgot-pass">Забыл пароль</a>
                </div>
            </div>
        );
    }

});

export default Login;