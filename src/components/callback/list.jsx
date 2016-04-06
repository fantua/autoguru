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
        const query = new Parse.Query(Parse.Object.extend('Object'));
        query.equalTo('objectId', id);
        query.first({
            success: (object) => {
                //if (this.isMounted()) this.setState({data: results});
                console.log(results);
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
        const list = this.state.data.map((item) => {
            return <CatalogItem data={item} key={item.id} />;
        });

        return (
            <div className="tab-content">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Местоположение</th>
                        <th>Срок активности</th>
                        <th>Перейти в “Обратные звонки”</th>
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