import React from 'react';
import { Link } from 'react-router';
import DeletePopup from './delete-popup';

const Item = React.createClass({

    getInitialState() {
        return {
            hidden: this.props.data.get('hidden'),
            popup: false
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

    togglePopup(e) {
        this.setState({popup: !this.state.popup});
    },

    delete(e) {
        this.props.data.destroy().then(() => {
            this.props.onDelete();
        });
    },

    render() {

        const date = this.props.data.get('createdAt').toLocaleString();
        const name = this.props.data.get('user').get('name');
        const phone = this.props.data.get('user').get('phoneNumber');
        const text = this.props.data.get('description');

        const popup = () => {
            if (this.state.popup) return <DeletePopup onClose={this.togglePopup} onDelete={this.delete} />;
        };

        return (
            <tr>
                <td>{date} {popup()}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{text}</td>
                <td className="btn-holder"><a href="#" className="button-danger" onClick={this.togglePopup}>удалить</a></td>
                <td className="btn-holder"><a href="#" className="button-info">ответить</a></td>
            </tr>
        );

    }

});

export default Item;