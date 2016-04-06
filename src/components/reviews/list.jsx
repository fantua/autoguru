import React from 'react';
import Parse from 'parse';
import Item from './item';

const List = React.createClass({

    getInitialState() {
        return {
            data: []
        };
    },

    fetch(props) {
        const id = String(props.params.id);

        const query = new Parse.Query(Parse.Object.extend('Review'));
        query.include('user');
        query.equalTo('reviewObjectId', id);
        query.find().then((results) => {
            if (this.isMounted()) this.setState({data: results});
        });
    },

    componentDidMount() {
        this.fetch(this.props);
    },

    componentWillReceiveProps(nextProps) {
        this.fetch(nextProps);
    },

    onItemDelete() {
        this.fetch(this.props);
    },

    render() {
        const list = this.state.data.map((item) => {
            return <Item data={item} key={item.id} onDelete={this.onItemDelete} />;
        });

        return (
            <div className="tab-content">
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