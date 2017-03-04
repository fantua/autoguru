import React, { Component, PropTypes } from 'react';
import Api from '../api';

class ChangePassword extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const password = this.refs.password.value;
        if (password != this.refs.rePassword.value) {
            alert('Пароль не совпадают');
            return;
        }

        Api.user.changePassword(password).then(() => {
            alert('Пароль успешно изменен');
            this.context.router.push('/catalog');
        }, (error) => {
            console.log(error);
            alert(error.message);
        });
    }

    render() {


        return (
            <div className="b-filter__right">
                <div className="b-filter__option"></div>
                <div className="b-filter__content">
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-wrapper">
                                <div className="input-wrapper">
                                    <label className="input-label icon" htmlFor="pass" style={{backgroundImage: "url('/i/ic_lock_outline_black_48dp_1x.png')"}}>
                                        Пароль:
                                    </label>
                                    <input ref="password" id="pass" type="password" placeholder="******" pattern=".{3,}" title="Введите минимум 3 символа" required />
                                    <div className="clearfix" />
                                </div>
                                <div className="clearfix" />
                                <div className="input-wrapper">
                                    <label className="input-label icon" htmlFor="repass" style={{backgroundImage: "url('/i/ic_lock_outline_black_48dp_1x.png')"}}>
                                        Повторите пароль:
                                    </label>
                                    <input ref="rePassword" id="repass" type="password" placeholder="******" pattern=".{3,}" title="Введите минимум 3 символа" required />
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