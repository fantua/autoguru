import * as actions from '../constants';

export default function dataReducer (state = {}, action) {
    switch (action.type) {
        case actions.RECEIVE_OBJECTS: {
            return {
                id: state.id,
                model: state,
                selected: false
            };
        }

        case actions.DELETE_OBJECTS: {
            if (state.selected) {
                state.model.destroy();
            }

            return;
        }

        case actions.TOGGLE_OBJECT_SELECT: {
            if (state.id == action.id) {
                return Object.assign({}, state, {
                    selected: !state.selected
                });
            }

            return state;
        }

        case actions.TOGGLE_OBJECT_HIDDEN: {
            if (state.id == action.id) {
                state.model.set('hidden', !state.model.get('hidden'));
                state.model.save(null);

                return Object.assign({}, state);
            }

            return state;
        }

        case actions.ACTIVATE_ALL_SELECTED: {
            if (state.selected) {
                state.model.set('hidden', false);
                state.model.save(null);

                return Object.assign({}, state);
            }

            return state;
        }

        case actions.DEACTIVATE_ALL_SELECTED: {
            if (state.selected) {
                state.model.set('hidden', true);
                state.model.save(null);

                return Object.assign({}, state);
            }

            return state;
        }

        case actions.SELECT_ALL: {
            if (!state.selected) {
                return Object.assign({}, state, {
                    selected: true
                });
            }

            return state;
        }

        case actions.SELECT_NONE: {
            if (state.selected) {
                return Object.assign({}, state, {
                    selected: false
                });
            }

            return state;
        }

        default:
            return state;
    }
}