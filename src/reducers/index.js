import * as actions from '../constants';
import dataReducer from './data';
import Api from '../api';

const initialState = {
    showAddCatalogItemButton: false,
    pagination: Api.paginate.get(),
    data: []
};

export default function reducers (state = initialState, action) {
    switch (action.type) {
        case actions.RECEIVE_OBJECTS: {
            const { pagination, data } = action.result;

            return Object.assign({}, state, {
                pagination,
                data: data.map((item) => dataReducer(item, action))
            });
        }


        case actions.DELETE_OBJECTS: {
            state.data.map((item) => dataReducer(item, action));

            return Object.assign({}, state, {
                data: state.data.filter((item) => !item.selected)
            });
        }

        case actions.CLEAR_DATA: {
            const { pagination, data } = initialState;

            return Object.assign({}, state, {
                pagination,
                data
            });
        }

        case actions.ACTIVATE_ALL_SELECTED:
        case actions.DEACTIVATE_ALL_SELECTED:
        case actions.TOGGLE_OBJECT_SELECT:
        case actions.TOGGLE_OBJECT_HIDDEN:
        case actions.SELECT_ALL:
        case actions.SELECT_NONE:
            return Object.assign({}, state, {
                data: state.data.map((item) => dataReducer(item, action))
            });

        case actions.SHOW_ADD_CATALOG_ITEM_BUTTON:
            return Object.assign({}, state, {
                showAddCatalogItemButton: true
            });

        case actions.HIDE_ADD_CATALOG_ITEM_BUTTON:
            return Object.assign({}, state, {
                showAddCatalogItemButton: false
            });

            return state;

        default:
            return state;
    }
}
