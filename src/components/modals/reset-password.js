import React, { Component, PropTypes } from 'react';

class ResetPassword extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        onClose: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    handleSubmit(e) {
        e.preventDefault();
        
        this.props.onSubmit(this.refs.email.value.trim());
    }

    render() {
        const { onClose } = this.props;

        return (
            <div className="email-modal">
                <span className="close" onClick={onClose}>x</span>
                <form onSubmit={this.handleSubmit}>
                    <input ref="email" type="email" id="" className="form-input" placeholder='E-mail' required />
                    <div className="btn-wrapp">
                        <button type='submit' className="button-reply">Готово</button>
                    </div>
                </form>
            </div>
        );
    }

}

export default ResetPassword;