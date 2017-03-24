import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchById as fetch, edit } from '../../actions/objects';
import Edit from '../../components/objects/edit';

const mapStateToProps = (state, { params: { id } }) => {
    const { entities } = state.objects;

    return {
        id: id,
        object: entities[id]
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetch, edit }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Edit);