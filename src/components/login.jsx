import React, { Component } from 'react';
import Api from '../api';
import ResetPasswordPopup from './popups/reset-password';

class Login extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePopup = this.togglePopup.bind(this);
        this.reset = this.reset.bind(this);
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };
    
    state = {
        popup: false
    };

    handleSubmit(e) {
        e.preventDefault();

        const login = this.refs.login.value.trim();
        const password = this.refs.password.value.trim();

        if (!login || !password) {
            return;
        }

        Api.user.login(login, password).then((user) => {
            this.context.router.push('/catalog');
        }, (error) => {
            console.log(error);
            alert(error.message);
        });
    }

    togglePopup(e) {
        if (e) e.preventDefault();

        this.setState({popup: !this.state.popup});
    }
    
    reset(email) {
        Api.user.resetPassword(email).then(() => {
            this.togglePopup();
        }, (error) => {
            alert("Error: " + error.code + " " + error.message);
        });
    }

    render() {
        const popup = () => {
            if (this.state.popup)
                return <ResetPasswordPopup onClose={this.togglePopup} onSubmit={this.reset} />;
        };
        
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
                {popup()}
            </div>
        );
    }

}

export default Login;