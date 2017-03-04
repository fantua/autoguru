import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Api from '../../api';
import CatalogItem from '../../containers/shared/catalog-item';

class CatalogList extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        clearData: PropTypes.func.isRequired,
        showAddCatalogItemButton: PropTypes.func.isRequired,
        hideAddCatalogItemButton: PropTypes.func.isRequired,
        data: PropTypes.array.isRequired,
        fetch: PropTypes.func.isRequired
    };

    componentDidMount() {
        const { showAddCatalogItemButton, fetch } = this.props;

        if (Api.user.isAdmin() && this.context.router.isActive('catalog')) {
            showAddCatalogItemButton();
        }
        fetch();
    }

    componentWillUnmount() {
        const { clearData, hideAddCatalogItemButton } = this.props;

        clearData();
        hideAddCatalogItemButton();
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
            return <CatalogItem key={item.id} data={item} />;
        });

        console.log('Catalog List - render');

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

export default CatalogList;