import * as actions from '../constants';

const initialState = {
    entities: {},   // key (id): value (callbacks)
    selected: [],
    ids: [],
    count: 0,
    isFetching: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case actions.CALLBACKS_RECEIVE: {
            const { entities: callbacks, result } = action.payload;
            const entities = {};

            callbacks.forEach(i => { entities[i.id] = i; });

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

        case actions.CALLBACKS_REQUEST: {
            return {
                ...state,
                ids: initialState.ids,
                isFetching: true
            };
        }

        default:
            return state;
    }
}
