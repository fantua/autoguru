import React, { Component } from 'react';
import { Link } from 'react-router';
import Api from '../../../api';
import { getRouterPath } from '../../../utils';

class Tabs extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
        enum: [
            {id: 0, name: 'СТО'},
            {id: 1, name: 'АЗС'},
            {id: 6, name: 'Electro АЗС'},
            {id: 2, name: 'Мойка'},
            {id: 3, name: 'Шиномонтаж'},
            {id: 4, name: 'Автомагазин'},
            {id: 5, name: 'Эвакуатор'}
        ],
        category: Api.user.isAdmin() ? 0 : null
    };

    componentWillMount() {
        this.redirect();
    }

    componentDidMount() {
        if (!Api.user.isAdmin()) {
            Api.object.getUserCategory().then((category) => {
                this.setState({ category });
                this.redirect();
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        this.redirect(nextProps);
    }

    redirect(props = this.props) {
        if (!Object.keys(props.params).length && this.state.category !== null) {
            this.context.router.push(`${props.location.pathname}/${this.state.category}`);
        }
    }

    getTabs() {
        const path = getRouterPath(this.props.routes);

        return this.state.enum.map((value) => {
            if (Api.user.isAdmin() || this.state.category == value.id) {
                return (
                    <li key={value.id} className="b-section__tab-item -special">
                        <Link to={`/${path}/${value.id}`} className="b-section__tab-link" activeClassName="active">
                            {value.name}
                        </Link>
                    </li>
                );
            }
        });
    }

    render() {

        return (
            <ul className="b-section__tab-list">
                {this.getTabs()}
            </ul>
        );
    }

}

export default Tabs;