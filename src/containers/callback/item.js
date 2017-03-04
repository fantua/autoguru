import { connect } from 'react-redux';
import { toggleObjectSelect, toggleObjectHidden } from '../../actions';
import Item from '../../components/callback/item';

export default connect(
    null,
    { toggleObjectSelect, toggleObjectHidden }
)(Item);