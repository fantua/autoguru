import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { select, unselect } from '../../actions/reviews';
import Item from '../../components/reviews/item';

const mapStateToProps = (state, { id }) => {
    const { entities, selected } = state.reviews;
    const model = entities[id];

    return {
        selected: selected.includes(id),
        userName: model.get('user').get('name'),
        userPhoneNumber: model.get('user').get('phoneNumber'),
        description: model.get('description'),
        createdAt: model.get('createdAt')
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ select, unselect }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);