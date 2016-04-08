import React from 'react';
import Parse from 'parse';
import Item from './item';
import PaginatorMixin from '../../mixins/paginator';

const List = React.createClass({

    mixins: [PaginatorMixin],

    fetch(props = this.props) {
        let count;
        const user = new Parse.User();
        user.id = String(props.params.id);
        const query = new Parse.Query(Parse.Object.extend('Callback'));
        query.equalTo('owner', user);
        query.count().then((result) => {
            count = result;
            query.skip(this.state.offset);
            query.limit(this.state.limit);
            return query.find();
        }).then((results) => {
            if (this.isMounted()) this.setData(results, count);
        });
    },

    componentDidMount() {
        this.fetch();
    },

    componentWillReceiveProps(nextProps) {
        this.fetch(nextProps);
    },

    render() {
        const list = this.state.data.map((item) => {
            return <Item data={item} key={item.id} onDelete={this.fetch} />;
        });

        return (
            <div className="tab-content">
                <div className="tab-top-bar">
                    <div className="tab-title"></div>
                    {this.getPaginator()}
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Дата и время отправки</th>
                        <th>Имя отправителя</th>
                        <th>Номер телефона</th>
                        <th>Модель авто</th>
                        <th>Номер авто</th>
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

export default List;