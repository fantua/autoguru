import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login, resetPassword } from '../actions/user';
import Login from '../components/login';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ login, resetPassword }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(Login);