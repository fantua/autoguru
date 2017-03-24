import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { upload as uploadFile } from '../../actions/files';
import Form from '../../components/objects/form';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadFile }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(Form);