import * as actions from '../constants';

const initialState = {
    entities: {},   // key (id): value (objects)
    selected: [],
    ids: [],
    count: 0,
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.OBJECTS_RECEIVE: {
            const { entities: objects, result } = action.payload;
            const entities = {};

            objects.forEach(i => { entities[i.id] = i; });

            return {
                ...state,
                entities: {
                    ...state.entities,
                    ...entities
                },
                ids: Object.keys(entities),
                isFetching: false,
                ...result
            };
        }

        case actions.OBJECTS_REQUEST: {
            return {
                ...state,
                ids: initialState.ids,
                isFetching: true
            };
        }

        case actions.OBJECTS_SELECT_ALL: {
            return {
                ...state,
                selected: [...state.ids]
            };
        }

        case actions.OBJECTS_SELECT_NONE: {
            return {
                ...state,
                selected: initialState.selected
            };
        }

        case actions.OBJECTS_SELECT: {
            const { id } = action.payload;

            return {
                ...state,
                selected: state.selected.concat(id)
            }
        }

        case actions.OBJECTS_UNSELECT: {
            const { id } = action.payload;

            return {
                ...state,
                selected: state.selected.filter(i => i !== id)
            }
        }

        default:
            return state;
    }
}
