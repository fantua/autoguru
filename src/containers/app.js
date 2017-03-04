import { connect } from 'react-redux';
import App from '../components/app';

const mapStateToProps = (state) => {
    return {
        showAddCatalogItemButton: state.app.showAddCatalogItemButton
    };
};

export default connect(
    mapStateToProps
)(App);