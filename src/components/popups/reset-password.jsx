import React from 'react';

const ResetPassword = React.createClass({

    onSubmit(e) {
        e.preventDefault();
        
        this.props.onSubmit(this.refs.email.value.trim());
    },

    render() {
        return (
            <div className="email-modal">
                <span className="close" onClick={this.props.onClose}>x</span>
                <form onSubmit={this.onSubmit}>
                    <input ref="email" type="email" id="" className="form-input" placeholder='E-mail' required />
                        <div className="btn-wrapp">
                            <button type='submit' className="button-reply">Готово</button>
                        </div>
                </form>
            </div>
        );
    }

});

export default ResetPassword;