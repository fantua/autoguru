import React from 'react';
import Parse from 'parse';
import Item from './item';
import PaginatorMixin from '../../mixins/paginator';

const List = React.createClass({

    mixins: [PaginatorMixin],

    fetch(props = this.props) {
        const id = String(props.params.id);
        const query = new Parse.Query(Parse.Object.extend('Review'));
        query.equalTo('reviewObjectId', id);
        query.count().then((count) => {
            query.include('user');
            query.skip(this.state.offset);
            query.limit(this.state.limit);
            query.find().then((results) => {
                if (this.isMounted()) this.setData(results, count);
            });
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
                        <th>Текст отзыва</th>
                        <th>Удаление</th>
                        <th>Ответ</th>
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