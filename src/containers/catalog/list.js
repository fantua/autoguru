import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch, selectAll, selectNone, activateAllSelected, deactivateAllSelected } from '../../actions/objects';
import List from '../../components/catalog/list';

const mapStateToProps = (state, { location, params: { category } }) => {
    const { count, ids, selected } = state.objects;

    return {
        categoryId: Number(category),
        page: Number(location.query.page) || 1,
        selectedAll: (!!selected.length && selected.length === ids.length),
        objects: ids,
        count
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetch, selectAll, selectNone, activateAllSelected, deactivateAllSelected }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);