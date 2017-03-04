import React, { Component, PropTypes } from 'react';
import Item from '../../containers/callback/item';

class List extends Component {

    static propTypes = {
        clearData: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        fetch: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.fetch();
    }

    componentWillUnmount() {
        this.props.clearData();
    }

    // fetch on route change
    componentWillReceiveProps(nextProps) {
        if (nextProps.routing != this.props.routing) {
            nextProps.fetch();
        }
    }

    render() {
        const { data } = this.props;

        const items = data.map((item) => {
            return <Item key={item.id} data={item} />;
        });

        console.log('Callback List - render');

        return (
            <div className="b-section__tabcontent-wrap">
                <div className="b-section__tabcontent-item active">
                    <ul className="b-filter__list">
                        {items}
                    </ul>
                </div>
            </div>
        );

    }

}

export default List;