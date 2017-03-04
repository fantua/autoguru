import React, { Component, PropTypes } from 'react';
import Link from '../elements/pagintion-link';
import Checkbox from '../elements/checkbox';

class TopBar extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
    }

    static propTypes = {
        onSelect: PropTypes.shape({
            name: PropTypes.string.isRequired,
            true: PropTypes.func.isRequired,
            false: PropTypes.func.isRequired
        }),
        selectActions: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired
        })),
        actions: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired
        })),
        onDelete: PropTypes.func,
        paginate: PropTypes.bool.isRequired,
        pagination: PropTypes.shape({
            start: PropTypes.number.isRequired,
            end: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
            prev: PropTypes.number.isRequired,
            next: PropTypes.number.isRequired,
            first: PropTypes.number.isRequired,
            last: PropTypes.number.isRequired
        }).isRequired,
        pathname: PropTypes.string.isRequired,
        query: PropTypes.string
    };

    static defaultProps = {
        paginate: true,
        selectActions: [],
        actions: []
    };

    state = {
        showModal: {
            select: false,
            actions: false,
            pagination: false
        },
        selectChecked: false
    };

    componentWillReceiveProps() {
        this.closeModal();
        this.setState({selectChecked: false});
    }

    toggleModal (e, name) {
        e.preventDefault();
        this.closeModal(name);
    }

    closeModal (name = false) {
        let showModal = this.state.showModal;

        Object.keys(showModal).forEach((key) => {
            showModal[key] = (name && key == name) ? !showModal[key] : false;
        });

        this.setState({showModal: showModal});
    }

    getModalStyle (name) {
        return {
            display: (this.state.showModal[name]) ? 'block' : 'none'
        };
    }

    renderPagination () {
        const {paginate, pagination, pathname, query } = this.props;

        if (!paginate) {
            return null;
        }

        return (
            <div className="b-filter__option-right">
                <div className="b-filter__option-num js-modalWrap">
                    <div className="b-filter__option-checkLink js-modalLink"
                         onClick={(e) => this.toggleModal(e, 'pagination')}
                         style={{cursor: 'pointer'}}>
                        {pagination.start} - {pagination.end} из {pagination.count}
                    </div>
                    <ul className="b-filter__modal js-modalContent" style={this.getModalStyle('pagination')}>
                        <li className="b-filter__modal-item">
                            <Link pathname={pathname} page={pagination.first} query={query} className="b-filter__modal-link">
                                Самые новые
                            </Link>
                        </li>
                        <li className="b-filter__modal-item">
                            <Link pathname={pathname} page={pagination.last} query={query} className="b-filter__modal-link">
                                Самые старые
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="b-filter__option-nav">
                    <Link pathname={pathname} page={pagination.prev} query={query} className="b-filter__option-arrow -left" />
                    <Link pathname={pathname} page={pagination.next} query={query} className="b-filter__option-arrow -right" />
                </div>
            </div>
        );
    }

    renderDelete() {
        const { onDelete, dispatch } = this.props;

        if (!onDelete) {
            return null;
        }

        return (
            <a className="b-filter__option-delete" onClick={(e) => dispatch(onDelete())}>Delete</a>
        );
    }

    handleSelect(e, value = null) {
        e.preventDefault();

        value = value || !this.state.selectChecked;
        const { onSelect, dispatch } = this.props;

        this.setState({selectChecked: value});
        this.closeModal();
        dispatch(onSelect[value]());
    }

    handleAction(e, action) {
        e.preventDefault();

        this.closeModal();
        this.props.dispatch(action());
    }

    renderSelect() {
        const { onSelect, selectActions } = this.props;

        if (!onSelect) {
            return null;
        }

        const actions = selectActions.map((item, i) => (
            <li className="b-filter__modal-item" key={i}>
                <a className="b-filter__modal-link" onClick={(e) => this.handleAction(e, item.action)}>
                    {item.name}
                </a>
            </li>
        ));

        return (
            <div className="b-filter__option-check js-modalWrap">
                <Checkbox checked={this.state.selectChecked} onChange={this.handleSelect} />
                <a href="#" className="b-filter__option-checkLink js-modalLink" onClick={(e) => this.toggleModal(e, 'select')} />
                <ul className="b-filter__modal js-modalContent" style={this.getModalStyle('select')}>
                    <li className="b-filter__modal-item">
                        <a className="b-filter__modal-link" onClick={(e) => this.handleSelect(e, true)}>{onSelect.name}</a>
                    </li>
                    {actions}
                </ul>
            </div>
        );
    }

    renderActions() {
        const { actions } = this.props;

        if (!actions.length) {
            return null;
        }

        const actionsList = actions.map((item, i) => (
            <li className="b-filter__modal-item" key={i}>
                <a className="b-filter__modal-link" onClick={(e) => this.handleAction(e, item.action)}>
                    {item.name}
                </a>
            </li>
        ));

        return (
            <div className="b-filter__option-yet js-modalWrap">
                <a className="b-filter__option-yetLink js-modalLink" onClick={(e) => this.toggleModal(e, 'actions')}>
                    Еще
                </a>
                <ul className="b-filter__modal js-modalContent" style={this.getModalStyle('actions')}>
                    {actionsList}
                </ul>
            </div>
        );
    }

    render() {

        console.log('TopBar - render');

        return (
            <div className="b-filter__option">
                <div className="b-filter__option-left">
                    {this.renderSelect()}
                    {this.renderDelete()}
                    {this.renderActions()}
                </div>
                {this.renderPagination()}
            </div>
        );
    }

}

export default TopBar;