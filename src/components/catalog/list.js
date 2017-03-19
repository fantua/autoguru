import React, { Component, PropTypes } from 'react';
import Tabs from '../blocks/tabs';
import TopBar from '../blocks/top-bar';
import Item from '../../containers/catalog/item';
import { getOffset } from '../../utils/pagination';

const LIMIT = 20;

class List extends Component {

    static propTypes = {
        categoryId: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        objects: PropTypes.arrayOf(PropTypes.string).isRequired,
        fetch: PropTypes.func.isRequired,
        selectedAll: PropTypes.bool.isRequired,
        selectAll: PropTypes.func.isRequired,
        selectNone: PropTypes.func.isRequired,
        activateAllSelected: PropTypes.func.isRequired,
        deactivateAllSelected: PropTypes.func.isRequired
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
        const { categoryId, page, fetch, location: { query: { q } } } = props;
        const offset = getOffset(page, LIMIT);

        fetch(categoryId, offset, LIMIT, q);
    }

    renderTopBar() {
        const { page, count, selectAll, selectNone, selectedAll, activateAllSelected, deactivateAllSelected } = this.props;

        const props = {
            selectionProps: {
                onSelectAll: selectAll,
                onSelectNone: selectNone,
                selectedAll
            },
            actionsProps: {
                items: [
                    { name: 'Активировать все помеченные', onClick: activateAllSelected },
                    { name: 'Деактивировать все помеченные', onClick: deactivateAllSelected }
                ]
            },
            paginationProps: {
                limit: LIMIT,
                page,
                count
            },
            onDelete: () => {}
        };

        return <TopBar {...props}  />;
    }

    renderItems() {
        return this.props.objects.map(id => <Item key={id} id={id} />);
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