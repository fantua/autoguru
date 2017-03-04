import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Api from '../../../api';

class Header extends Component {

    constructor(props) {
        super(props);

        this.toggleLogoutModal = this.toggleLogoutModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        category: PropTypes.string
    };

    state = {
        showLogoutModal: false
    };

    componentWillReceiveProps() {
        this.hideLogoutModal();
    }

    hideLogoutModal() {
        if (this.state.showLogoutModal) {
            this.setState({showLogoutModal: false});
        }
    }

    toggleLogoutModal (e) {
        e.preventDefault();

        this.setState({showLogoutModal: !this.state.showLogoutModal});
    }

    handleLogout(e) {
        e.preventDefault();

        Api.user.logout().then(() => {
            this.context.router.push('/login');
        });
    }

    handleSearch(e) {
        e.preventDefault();

        const { category } = this.props;
        const query = this.refs.query.value.trim();

        if (category && query) {
            this.context.router.push({
                pathname: '/catalog/' + category,
                query: {
                    q: query
                }
            });
        }
    }

    render() {
        const name = Api.user.get('name');
        const logoutModalStyle = {
            display: (this.state.showLogoutModal) ? 'block' : 'none'
        };

        return (
            <header className="b-header">
                <div className="b-section__container">
                    <div className="b-header__wrap">
                        <div className="b-header__left">
                            <form onSubmit={this.handleSearch} className="b-header__search">
                                <input ref="query" type="text" className="b-header__input" placeholder="Search" />
                                <button className="b-header__button" type="submit" />
                            </form>
                        </div>
                        <div className="b-header__right js-modalWrap">
                            <a href="#" className="b-header__user js-modalLink active" onClick={this.toggleLogoutModal}>
                                <span>{name}</span>
                            </a>
                            <ul className="b-filter__modal logout__modal js-modalContent" style={logoutModalStyle}>
                                <li className="b-filter__modal-item">
                                    <Link to="/change-password" className="b-filter__modal-link">Изменить пароль</Link>
                                </li>
                                <li className="b-filter__modal-item">
                                    <a href="#" className="b-filter__modal-link" onClick={this.handleLogout}>Выйти</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );

    }

}

export default Header;