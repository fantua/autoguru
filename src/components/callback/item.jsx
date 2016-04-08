import React from 'react';
import { Link } from 'react-router';

const Item = React.createClass({

    render() {

        const date = this.props.data.get('createdAt').toLocaleString();
        const name = this.props.data.get('name');
        const phone = this.props.data.get('phoneNumber');
        const model = this.props.data.get('carModel');
        const number = this.props.data.get('carNumber');


        return (
            <tr>
                <td>{date}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{model}</td>
                <td>{number}</td>
            </tr>
        );

    }

});

export default Item;