import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../actions/user';
import Header from '../../components/blocks/header';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ logout }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(Header);