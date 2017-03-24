import React, { Component, PropTypes } from 'react';
import Tabs from '../blocks/tabs';
import TopBar from '../blocks/top-bar';
import Item from '../../containers/reviews/item';
import { getOffset } from '../../utils/pagination';

const LIMIT = 20;

class List extends Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        page: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        reviews: PropTypes.arrayOf(PropTypes.string).isRequired,
        fetch: PropTypes.func.isRequired,
        selectedAll: PropTypes.bool.isRequired,
        selectAll: PropTypes.func.isRequired,
        selectNone: PropTypes.func.isRequired,
        deleteAllSelected: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.fetch();
    }

    // fetch on route change
    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            this.fetch(nextProps);
        }
    }

    fetch(props = this.props) {
        const { id, page, fetch, location: { query: { q } } } = props;
        const offset = getOffset(page, LIMIT);

        fetch(id, offset, LIMIT, q);
    }

    renderTopBar() {
        const { page, count, selectAll, selectNone, selectedAll, deleteAllSelected } = this.props;

        const props = {
            selectionProps: {
                onSelectAll: selectAll,
                onSelectNone: selectNone,
                selectedAll
            },
            paginationProps: {
                limit: LIMIT,
                page,
                count
            },
            onDelete: deleteAllSelected
        };

        return <TopBar {...props}  />;
    }

    renderItems() {
        return this.props.reviews.map(id => <Item key={id} id={id} />);
    }

    render() {

        return (
            <div className="b-filter__right">
                {this.renderTopBar()}
                <div className="b-filter__content">
                    <div className="b-section__tab js-tabWrap">
                        <Tabs />
                        <div className="b-section__tabcontent-wrap">
                            <div className="b-section__tabcontent-item active">
                                <ul className="b-filter__list">
                                    {this.renderItems()}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}

export default List;