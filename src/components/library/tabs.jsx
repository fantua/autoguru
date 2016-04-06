import React from 'react';
import Parse from 'parse';
import { Link } from 'react-router';
import { getRoute, isAdmin } from '../../utils';

const Tabs = React.createClass({

    getInitialState() {
        return {
            enum: [
                'СТО',
                'АЗС',
                'Мойка',
                'Шиномонтаж',
                'Автомагазин',
                'Эвакуатор'
            ],
            category: null
        };
    },

    componentDidMount() {
        if (isAdmin()) return;

        const query = new Parse.Query(Parse.Object.extend('Object'));
        query.equalTo('user', Parse.User.current());
        query.first().then((object) => {
            this.setState({category: object.get('type')});
        });
    },

    render() {

        const route = getRoute(this.props.location.pathname);

        const tabs = this.state.enum.map((value, index) => {
            if (isAdmin() || this.state.category == index) {
                return (
                    <li key={index} className="tab-header-and-content">
                        <Link to={`/${route}/${index}`} className="tab-link" activeClassName="is-active">{value}</Link>
                    </li>
                );
            }
        });

        return (
            <div className="tabs-block">
                <div className="tab-block">
                    <ul className="accordion-tabs">
                        {tabs}
                    </ul>
                </div>
            </div>
        );

    }

});

export default Tabs;