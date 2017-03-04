import { connect } from 'react-redux';
import { toggleObjectSelect, toggleObjectHidden } from '../../actions';
import Item from '../../components/reviews/item';

export default connect(
    null,
    { toggleObjectSelect, toggleObjectHidden }
)(Item);