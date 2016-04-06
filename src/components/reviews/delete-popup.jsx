import React from 'react';
import { Link } from 'react-router';

const DeletePopup = React.createClass({

    render() {
        return (
            <div className="modal-container">
                <div className="mask"></div>
                <div className="delete-modal">
                    <div className="modal-title">Вы уверенны?</div>
                    <a href="#" className="button-info" onClick={this.props.onClose}>отменить</a>
                    <a href="#" className="button-danger" onClick={this.props.onDelete}>удалить</a>
                </div>
            </div>
        );
    }

});

export default DeletePopup;