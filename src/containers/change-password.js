import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../actions/user';
import ChangePassword from '../components/change-password';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changePassword }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(ChangePassword);