import React, { Component, PropTypes } from 'react';

class ChangePassword extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        changePassword: PropTypes.func.isRequired
    };

    handleSubmit(e) {
        e.preventDefault();

        const password = this.password.value;
        if (password !== this.rePassword.value) {
            alert('Пароли не совпадают');
            return;
        }

        this.props.changePassword(password);
    }

    render() {

        return (
            <div className="b-filter__right">
                <div className="b-filter__option"/>
                <div className="b-filter__content">
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-wrapper">
                                <div className="input-wrapper">
                                    <label className="input-label icon icon--Lock" htmlFor="pass">
                                        Пароль:
                                    </label>
                                    <input ref={(ref) => { this.password = ref; }}
                                           id="pass" type="password" placeholder="******" pattern=".{3,}" title="Введите минимум 3 символа" required />
                                    <div className="clearfix" />
                                </div>
                                <div className="clearfix" />
                                <div className="input-wrapper">
                                    <label className="input-label icon icon--Lock" htmlFor="repass">
                                        Повторите пароль:
                                    </label>
                                    <input ref={(ref) => { this.rePassword = ref; }}
                                           id="repass" type="password" placeholder="******" pattern=".{3,}" title="Введите минимум 3 символа" required />
                                    <div className="clearfix" />
                                </div>
                                <div className="clearfix" />
                                <button className="save">Изменить</button>
                                <div className="clearfix" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );

    }

}

export default ChangePassword;