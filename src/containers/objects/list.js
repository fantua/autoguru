import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    fetch,
    selectAll,
    selectNone,
    activateAllSelected,
    deactivateAllSelected,
    deleteAllSelected
} from '../../actions/objects';
import List from '../../components/objects/list';

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
    return bindActionCreators({
        fetch,
        selectAll,
        selectNone,
        activateAllSelected,
        deactivateAllSelected,
        deleteAllSelected
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);