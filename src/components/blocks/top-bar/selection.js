import React, { Component, PropTypes } from 'react';
import Modal from '../../library/modal';
import Checkbox from '../../library/checkbox';

class Selection extends Component {

    constructor(props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        onSelectAll: PropTypes.func.isRequired,
        onSelectNone: PropTypes.func.isRequired,
        selectedAll: PropTypes.bool.isRequired
    };

    static defaultProps = {
        selectAll: false
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

    handleSelect(e) {
        e.preventDefault();

        const { onSelectAll, onSelectNone, selectedAll } = this.props;

        if (!selectedAll) {
            onSelectAll();
        } else {
            onSelectNone();
        }
    }

    renderModalItem() {
        if (!this.props.selectedAll) {
            return <a className="b-filter__modal-link" onClick={this.handleSelect}>Выбрать все</a>;
        } else {
            return <a className="b-filter__modal-link" onClick={this.handleSelect}>Выбрать ничего</a>
        }
    }

    render() {
        const { selectedAll } = this.props;
        const { showModal } = this.state;

        return (
            <div className="b-filter__option-check js-modalWrap">
                <Checkbox checked={selectedAll} onChange={this.handleSelect} />
                <a className="b-filter__option-checkLink js-modalLink" onClick={this.showModal} />
                <Modal isOpen={showModal} onClose={this.hideModal}>
                    <ul className="b-filter__modal js-modalContent">
                        <li className="b-filter__modal-item">
                            {this.renderModalItem()}
                        </li>
                    </ul>
                </Modal>
            </div>
        );
    }

}

export default Selection;
