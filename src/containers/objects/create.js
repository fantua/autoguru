import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { create} from '../../actions/objects';
import Create from '../../components/objects/create';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ create }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(Create);