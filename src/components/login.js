import React, { Component, PropTypes } from 'react';
import ResetPasswordPopup from './modals/reset-password';
import '../styles/styles.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.togglePopup = this.togglePopup.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetPassword = this.handleResetPassword.bind(this);
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        resetPassword: PropTypes.func.isRequired
    };

    state = {
        showPopup: false
    };

    togglePopup() {
        this.setState({ showPopup: !this.state.showPopup });
    }

    handleSubmit(e) {
        e.preventDefault();

        const login = this.refs.login.value.trim();
        const password = this.refs.password.value.trim();

        if (!login || !password) {
            return;
        }

        this.props.login(login, password);
    }

    handleResetPassword(email) {
        this.togglePopup();
        this.props.resetPassword(email);
    }

    render() {
        const { showPopup } = this.state;
        
        return (
            <div className="content login-page" >
                <div className="login-box-wrap">
                    <a href="#" className="logo-big" />
                    <form onSubmit={this.handleSubmit} id="login-form">
                        <input ref="login" name="login" type="text"  placeholder="Логин" required autoFocus />
                        <input ref="password" name="pass" type="password" placeholder="Пароль" required />
                        <input type="submit" value="Войти" />
                    </form>
                    <a href="#" className="forgot-pass" onClick={this.togglePopup}>Забыл пароль</a>
                </div>
                {showPopup && 
                    <ResetPasswordPopup onSubmit={this.handleResetPassword} onClose={this.togglePopup} />
                }
            </div>
        );
    }

}

export default Login;