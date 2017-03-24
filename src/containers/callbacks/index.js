import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetch } from '../../actions/callbacks';
import List from '../../components/callbacks';

const mapStateToProps = (state, { location, params: { id } }) => {
    const { count, ids } = state.callbacks;

    return {
        userId: id,
        page: Number(location.query.page) || 1,
        callbacks: ids,
        count
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetch }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);