import { connect } from 'react-redux';
import { toggleObjectSelect, toggleObjectHidden } from '../../actions';
import CatalogItem from '../../components/shared/catalog-item';

export default connect(
    null,
    { toggleObjectSelect, toggleObjectHidden }
)(CatalogItem);