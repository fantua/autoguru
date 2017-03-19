import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Modal from '../../library/modal';
import BasePagination from '../../library/pagination';

class Pagination extends BasePagination {

    constructor(props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    static propTypes = {
        page: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        limit: PropTypes.number.isRequired
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

    getHref(page) {
        const { pathname, query } = this.context.router.location;

        return {pathname, query: { ...query, page }};
    }

    render() {
        const { showModal } = this.state;
        const { count } = this.props;
        const { start, end, prev, next, first, last } = this;

        return (
            <div className="b-filter__option-right">
                <div className="b-filter__option-num js-modalWrap">
                    <div className="b-filter__option-checkLink js-modalLink" onClick={this.showModal}>
                        {start} - {end} из {count}
                    </div>
                    <Modal isOpen={showModal} onClose={this.hideModal}>
                        <ul className="b-filter__modal js-modalContent">
                            <li className="b-filter__modal-item">
                                <Link to={this.getHref(first)} className="b-filter__modal-link">
                                    Самые новые
                                </Link>
                            </li>
                            <li className="b-filter__modal-item">
                                <Link to={this.getHref(last)} className="b-filter__modal-link">
                                    Самые старые
                                </Link>
                            </li>
                        </ul>
                    </Modal>
                </div>
                <div className="b-filter__option-nav">
                    <Link to={this.getHref(prev)} className="b-filter__option-arrow -left" />
                    <Link to={this.getHref(next)} className="b-filter__option-arrow -right" />
                </div>
            </div>
        );
    }

}

export default Pagination;
