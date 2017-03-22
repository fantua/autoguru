import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch, selectAll, selectNone, deleteAllSelected } from '../../actions/reviews';
import List from '../../components/reviews/list';

const mapStateToProps = (state, { location, params: { id } }) => {
    const { count, ids, selected } = state.reviews;

    return {
        id: id,
        page: Number(location.query.page) || 1,
        selectedAll: (!!selected.length && selected.length === ids.length),
        reviews: ids,
        count
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetch, selectAll, selectNone, deleteAllSelected }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);