import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Modal from '../library/modal';
import User from '../../utils/user';

class Header extends Component {

    constructor(props) {
        super(props);

        this.showLogoutModal = this.showLogoutModal.bind(this);
        this.hideLogoutModal = this.hideLogoutModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    state = {
        showLogoutModal: false
    };

    hideLogoutModal(e) {
        e.stopPropagation();

        this.setState({showLogoutModal: false});
    }

    showLogoutModal (e) {
        e.preventDefault();

        this.setState({showLogoutModal: true});
    }

    handleLogout(e) {
        e.preventDefault();

        this.props.logout();
    }

    handleSearch(e) {
        e.preventDefault();

        const { category } = this.context.router.params;
        const q = this.query.value.trim();

        if (category && q) {
            this.context.router.push({ pathname: `/catalog/${category}`, query: { q }});
        }
    }

    render() {
        const { showLogoutModal } = this.state;

        return (
            <header className="b-header">
                <div className="b-section__container">
                    <div className="b-header__wrap">
                        <div className="b-header__left">
                            <form onSubmit={this.handleSearch} className="b-header__search">
                                <input ref={(ref) => { this.query = ref; }} type="text" className="b-header__input" placeholder="Search" />
                                <button className="b-header__button" type="submit" />
                            </form>
                        </div>
                        <div className="b-header__right js-modalWrap">
                            <a className="b-header__user js-modalLink active" onClick={this.showLogoutModal}>
                                <span>{User.get('name')}</span>
                            </a>
                            <Modal isOpen={showLogoutModal} onClose={this.hideLogoutModal}>
                                <ul className="b-filter__modal logout__modal js-modalContent">
                                    <li className="b-filter__modal-item">
                                        <Link to="/change-password" className="b-filter__modal-link">Изменить пароль</Link>
                                    </li>
                                    <li className="b-filter__modal-item">
                                        <a className="b-filter__modal-link" onClick={this.handleLogout}>Выйти</a>
                                    </li>
                                </ul>
                            </Modal>
                        </div>
                    </div>
                </div>
            </header>
        );

    }

}

export default Header;