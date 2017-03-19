import React, { Component, PropTypes } from 'react';
import Modal from '../../library/modal';

class Actions extends Component {

    constructor(props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired
        }).isRequired).isRequired
    };

    state = {
        showModal: false
    };

    hideModal(e) {
        e.stopPropagation();

        this.setState({showModal: false});
    }

    showModal (e) {
        e.preventDefault();

        this.setState({showModal: true});
    }

    renderModalItems() {
        return this.props.items.map((item, i) => {
            return (
                <li className="b-filter__modal-item" key={i}>
                    <a className="b-filter__modal-link" onClick={item.onClick}>
                        {item.name}
                    </a>
                </li>
            );
        });
    }

    render() {
        const { showModal } = this.state;

        return (
            <div className="b-filter__option-yet js-modalWrap">
                <a className="b-filter__option-yetLink js-modalLink" onClick={this.showModal}>Еще</a>
                <Modal isOpen={showModal} onClose={this.hideModal}>
                    <ul className="b-filter__modal js-modalContent">
                        {this.renderModalItems()}
                    </ul>
                </Modal>
            </div>
        );
    }

}

export default Actions;
