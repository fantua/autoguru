import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearData, fetchObjects, searchObjects, showAddCatalogItemButton, hideAddCatalogItemButton } from '../../actions';
import CatalogList from '../../components/shared/catalog-list';

const mapStateToProps = (state) => {
    const { routing, app: {data} } = state;

    return {
        routing,
        data
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return Object.assign(
        {
            fetch: () => {
                const category = Number(ownProps.params.category);
                const { page, q: query } = ownProps.location.query;

                if (query) {
                    dispatch(searchObjects(category, query, page));
                } else {
                    dispatch(fetchObjects(category, page));
                }
            },
        },
        bindActionCreators({clearData, showAddCatalogItemButton, hideAddCatalogItemButton}, dispatch)
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CatalogList);