import React, { Component, PropTypes } from 'react';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onClose: PropTypes.func.isRequired
    };

    static defaultProps = {
        isOpen: false
    };

    componentDidMount() {
        document.addEventListener('click', this.handleClick, true)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClick, true)
    }

    handleClick(e) {
        const { isOpen, onClose } = this.props;

        if (isOpen) {
            if (!this.modal.contains(e.target)) {
                setTimeout(() => { onClose(e); }, 0);
            } else {
                const tag = e.target.tagName.toLowerCase();
                if (tag === 'a') {
                    // prevent router conflict:
                    setTimeout(() => { onClose(e); }, 0);
                }
            }
        }
    }

    render() {
        /*eslint-disable no-unused-vars*/
        const { onClose, isOpen, children, ...props } = this.props;
        /*eslint-enable no-unused-vars*/

        if (isOpen) {
            return (
                <div ref={(ref) => { this.modal = ref; }} {...props}>
                    {children}
                </div>
            );
        }

        return null;
    }

}

export default Modal;