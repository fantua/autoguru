import React from 'react';
import Parse from 'parse';
import { browserHistory } from 'react-router';
import classNames from 'classnames';

const Topbar = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            name: Parse.User.current().get('name'),
            logout: false,
            titles: {
                '/catalog': 'Каталог услуг',
                '/catalog/new': 'Добавить',
                '/catalog/edit': 'Редактировать',
                '/callback': 'Обратные звонки',
                '/reviews': 'Отзывы'
            }
        };
    },

    onClick(e) {
        this.setState({logout: !this.state.logout});
    },

    logout() {
        Parse.User.logOut().then(() => {
            browserHistory.push('/login');
        });
    },

    render() {

        let title  = null;

        Object.keys(this.state.titles).forEach((key) => {
            if (this.context.router.isActive(key)) title = this.state.titles[key];
        });

        const className = classNames('dropdown-container', {show: this.state.logout});

        return (
            <div className="top-bar">
                <div className="page-title">{title}</div>
                <div className="active-tab dropdown-button" onClick={this.onClick}>{this.state.name}
                    <div className={className}>
                        <a href="#" className="button-default" onClick={this.logout}>Выйти</a>
                    </div>
                </div>
            </div>
        );

    }

});

export default Topbar;