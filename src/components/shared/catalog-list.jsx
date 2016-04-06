import React from 'react';
import Parse from 'parse';
import CatalogItem from './catalog-item';
import { getRoute, isAdmin } from '../../utils';

const CatalogList = React.createClass({

    getInitialState() {
        return {
            data: []
        };
    },

    fetch(props) {
        const category = Number(props.params.category);
        const query = new Parse.Query(Parse.Object.extend('Object'));
        query.equalTo('type', category);
        if (!isAdmin()) {
            query.equalTo('user', Parse.User.current());
        }
        query.find({
            success: (results) => {
                if (this.isMounted()) this.setState({data: results});
            },
            error: (error) => console.log(error)
        });
    },

    componentDidMount() {
        this.fetch(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.fetch(nextProps);
    },


    render() {
        const route = getRoute(this.props.location.pathname);

        const list = this.state.data.map((item) => {
            return <CatalogItem key={item.id} data={item} route={route} />;
        });

        const thead = [];
        const helper = {
            catalog: () => {
                thead.push(<th key={thead.length}>Редактировать</th>);
                if (isAdmin()) {
                    thead.push(<th key={thead.length}>Откл/Вкл</th>);
                }
            },
            callback: () => {
                thead.push(<th key={thead.length}>Перейти в “Обратные звонки”</th>);
            },
            reviews: () => {
                thead.push(<th key={thead.length}>Перейти в “Отзывы”</th>);
            }
        }[route]();

        return (
            <div className="tab-content">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Местоположение</th>
                        <th>Срок активности</th>
                        {thead}
                    </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </div>
        );

    }

});

export default CatalogList;