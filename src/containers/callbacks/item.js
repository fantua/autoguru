import { connect } from 'react-redux';
import Item from '../../components/callbacks/item';

const mapStateToProps = (state, { id }) => {
    const { entities } = state.callbacks;
    const model = entities[id];

    return {
        name: model.get('name'),
        carModel: model.get('carModel'),
        carNumber: model.get('carNumber'),
        phoneNumber: model.get('phoneNumber'),
        createdAt: model.get('createdAt')
    };
};

export default connect(
    mapStateToProps
)(Item);