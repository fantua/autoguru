import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { select, unselect, activate, deactivate } from '../../actions/objects';
import Item from '../../components/catalog/item';

const mapStateToProps = (state, { id }) => {
    const { entities, selected } = state.objects;
    const model = entities[id];

    return {
        selected: selected.includes(id),
        name: model.get('name'),
        address: model.get('address'),
        hidden: model.get('hidden'),
        expirationDate: model.get('expirationDate'),
        createdAt: model.get('createdAt')
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ select, unselect, activate, deactivate }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);