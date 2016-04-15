import React from 'react';
import { Link } from 'react-router';

const AnswerPopup = React.createClass({

    onSubmit(e) {
        e.preventDefault();

        const text = this.refs.answer.value.trim();
        this.props.onAnswer(text);
    },

    render() {
        return (
            <div className="modal-container">
                <div className="mask"></div>
                <div className="reply-modal">
                    <form onSubmit={this.onSubmit}>
                        <textarea ref="answer" className="input-description" required />
                        <div className="btn-wrapp">
                            <button onClick={this.props.onClose} className="button-default close">Отменить</button>
                            <button type='submit' className="button-reply">Отправить</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

});

export default AnswerPopup;