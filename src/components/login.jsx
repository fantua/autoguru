import React from 'react';
import Parse from 'parse';
import { browserHistory } from 'react-router';
import ResetPasswordPopup from './reset-password-popup';

const Login = React.createClass({
    
    getInitialState() {
        return {
            popup: false
        };
    },

    handleSubmit(e) {
        e.preventDefault();

        const login = this.refs.login.value.trim();
        const password = this.refs.password.value.trim();

        if (!login || !password) {
            return;
        }

        Parse.User.logIn(login, password).then((user) => {
            browserHistory.push('/catalog');
        }, (error) => {
            console.log(error);
            alert(error.message);
        });
    },

    togglePopup(e) {
        if (e) e.preventDefault();

        this.setState({popup: !this.state.popup});
    },
    
    reset(email) {
        Parse.User.requestPasswordReset(email).then(() => {
            this.togglePopup();
        }, (error) => {
            alert("Error: " + error.code + " " + error.message);
        });
    },

    render() {
        const popup = () => {
            if (this.state.popup) return <ResetPasswordPopup onClose={this.togglePopup} onSubmit={this.reset} />;
        };
        
        return (
            <div className="content login-page" >
                <div className="login-box-wrap">
                    <a href="#" className="logo-big"></a>
                    <form onSubmit={this.handleSubmit} id="login-form">
                        <input ref="login" name="login" type="text"  placeholder="Логин" required autoFocus />
                        <input ref="password" name="pass" type="password" placeholder="Пароль" required />
                        <input type="submit" value="Войти" />
                    </form>
                    <a href="#" className="forgot-pass" onClick={this.togglePopup}>Забыл пароль</a>
                </div>
                {popup()}
            </div>
        );
    }

});

export default Login;