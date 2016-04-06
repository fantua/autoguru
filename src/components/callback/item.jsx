import React from 'react';
import { Link } from 'react-router';

const Item = React.createClass({

    getInitialState() {
        return {
            hidden: this.props.data.get('hidden')
        };
    },

    onChange(e) {
        e.preventDefault();

        this.props.data.set('hidden', !this.state.hidden);
        this.props.data.save(null, {
            success: (item) => {
                this.setState({hidden: !this.state.hidden});
            },
            error: (item, error) => {
                console.log(error);
            }
        });
    },

    render() {

        const name = this.props.data.get('name');
        const address = this.props.data.get('address');
        const date = this.props.data.get('expirationDate').toLocaleDateString();

        return (
            <tr>
                <td>{name}</td>
                <td>{address}</td>
                <td>до {date}</td>
                <td className="btn-holder">

                </td>
            </tr>
        );

    }

});

export default Item;