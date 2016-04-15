import React from 'react';
import { Link } from 'react-router';
import DeletePopup from './delete-popup';
import AnswerPopup from './answer-popup';
import { isAdmin } from './../../utils';

const Item = React.createClass({

    getInitialState() {
        return {
            hidden: this.props.data.get('hidden'),
            report: this.props.data.get('state'),
            deletePopup: false,
            answerPopup: false
        };
    },

    toggleDeletePopup(e) {
        if (e) e.preventDefault();

        this.setState({deletePopup: !this.state.deletePopup});
    },

    toggleAnswerPopup(e) {
        if (e) e.preventDefault();

        this.setState({answerPopup: !this.state.answerPopup});
    },
    
    delete(e) {
        e.preventDefault();

        const object = this.props.data.get('reviewObject');
        object.increment('reviewSum', -(this.props.data.get('rating')));
        object.increment('reviewCount', -1);
        object.save(null).then(() => {
            return this.props.data.destroy();
        }).then(() => {
            this.props.onDelete();
        });
    },
    
    answer(text) {
        const object = this.props.data.clone();
        object.set('isAnswer', true);
        object.set('description', text);
        object.save(null).then((object) => {
            this.props.data.set('answerObject', object);

            return this.props.data.save(null);
        }).then(() => {
            this.toggleAnswerPopup();
        });
    },

    report(e) {
        e.preventDefault();

        this.props.data.set('state', 1);
        this.props.data.save(null).then((result) => {
            this.setState({report: true});
        });
    },

    render() {

        const date = this.props.data.get('createdAt').toLocaleString();
        const name = this.props.data.get('user').get('name');
        const phone = this.props.data.get('user').get('phoneNumber');
        const text = this.props.data.get('description');

        const popup = () => {
            if (this.state.deletePopup) return <DeletePopup onClose={this.toggleDeletePopup} onDelete={this.delete} />;
            if (this.state.answerPopup) return <AnswerPopup onClose={this.toggleAnswerPopup} onAnswer={this.answer} />;
        };

        const getRemoveButton = () => {
            if (isAdmin()) return <a href="#" className="button-danger" onClick={this.toggleDeletePopup}>удалить</a>;
            if (!this.state.report) return  <a href="#" className="button-danger" onClick={this.report}>пожаловаться</a>;
            return 'Запрос в модерации';
        };

        const getAnswerButton = () => {
            if (this.props.data.get('answerObject')) {
                return this.props.data.get('answerObject').get('description');
            }
            return <a href="#" className="button-info" onClick={this.toggleAnswerPopup}>ответить</a>;
        };

        return (
            <tr>
                <td>{date} {popup()}</td>
                <td>{name}</td>
                <td>{phone}</td>
                <td>{text}</td>
                <td className="btn-holder">{getRemoveButton()}</td>
                <td className="btn-holder">{getAnswerButton()}</td>
            </tr>
        );

    }

});

export default Item;