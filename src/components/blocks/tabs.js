import React, { Component } from 'react';
import { Link } from 'react-router';

class Tabs extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    state = {
    };

    componentWillMount() {
        // this.redirect();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // this.redirect(nextProps);
    }

    getTabs() {
        return [
            {id: 0, name: 'СТО'},
            {id: 1, name: 'АЗС'},
            {id: 6, name: 'Electro АЗС'},
            {id: 2, name: 'Мойка'},
            {id: 3, name: 'Шиномонтаж'},
            {id: 4, name: 'Автомагазин'},
            {id: 5, name: 'Эвакуатор'}
        ];
    }

    redirect(props = this.props) {
        if (!Object.keys(props.params).length && this.state.category !== null) {
            this.context.router.push(`${props.location.pathname}/${this.state.category}`);
        }
    }

    renderTabs() {
        return this.getTabs().map(({ id, name }) => {
            return (
                <li key={id} className="b-section__tab-item -special">
                    <Link to={`/catalog/${id}`} className="b-section__tab-link" activeClassName="active">
                        {name}
                    </Link>
                </li>
            );
        });
    }

    render() {

        return (
            <ul className="b-section__tab-list">
                {this.renderTabs()}
            </ul>
        );
    }

}

export default Tabs;