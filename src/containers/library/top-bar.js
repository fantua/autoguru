import { connect } from 'react-redux';
import TopBar from '../../components/library/blocks/top-bar';

const mapStateToProps = (state) => {
    const { app: { pagination } } = state;

    return {
        pagination,
    };
};

export default connect(
    mapStateToProps
)(TopBar);