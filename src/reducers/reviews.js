import * as actions from '../constants';

const initialState = {
    entities: {},   // key (id): value (reviews)
    selected: [],
    ids: [],
    count: 0,
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.REVIEWS_RECEIVE: {
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

        case actions.REVIEWS_REQUEST: {
            return {
                ...state,
                ids: initialState.ids,
                isFetching: true
            };
        }

        case actions.REVIEWS_SELECT_ALL: {
            return {
                ...state,
                selected: [...state.ids]
            };
        }

        case actions.REVIEWS_SELECT_NONE: {
            return {
                ...state,
                selected: initialState.selected
            };
        }

        case actions.REVIEWS_SELECT: {
            const { id } = action.payload;

            return {
                ...state,
                selected: state.selected.concat(id)
            };
        }

        case actions.REVIEWS_UNSELECT: {
            const { id } = action.payload;

            return {
                ...state,
                selected: state.selected.filter(i => i !== id)
            };
        }

        case actions.REVIEWS_DELETE: {
            const { list } = action.payload;
            const entities = {};

            Object.keys(state.entities).forEach(id => {
                if (!list.includes(id)) {
                    entities[id] = state.entities[id];
                }
            });

            return {
                ...state,
                entities,
                selected: initialState.selected,
                ids: state.ids.filter(id => !list.includes(id)),
                count: state.count - list.length
            };
        }

        default:
            return state;
    }
}
