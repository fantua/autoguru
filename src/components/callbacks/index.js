import React, { Component, PropTypes } from 'react';
import Tabs from '../blocks/tabs';
import TopBar from '../blocks/top-bar';
import Item from '../../containers/callbacks/item';
import { getOffset } from '../../utils/pagination';

const LIMIT = 20;

class List extends Component {

    static propTypes = {
        userId: PropTypes.string.isRequired,
        page: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
        callbacks: PropTypes.arrayOf(PropTypes.string).isRequired,
        fetch: PropTypes.func.isRequired
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
        const { userId, page, fetch } = props;
        const offset = getOffset(page, LIMIT);

        fetch(userId, offset, LIMIT);
    }

    renderTopBar() {
        const { page, count } = this.props;

        const props = {
            paginationProps: {
                limit: LIMIT,
                page,
                count
            }
        };

        return <TopBar {...props}  />;
    }

    renderItems() {
        return this.props.callbacks.map(id => <Item key={id} id={id} />);
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