import * as actions from '../constants';
import Api from '../api';

export const showAddCatalogItemButton = () => ({ type: actions.SHOW_ADD_CATALOG_ITEM_BUTTON });
export const hideAddCatalogItemButton = () => ({ type: actions.HIDE_ADD_CATALOG_ITEM_BUTTON });


export const selectAll = () => ({ type: actions.SELECT_ALL });
export const selectNone = () => ({ type: actions.SELECT_NONE });

export const clearData = () => ({ type: actions.CLEAR_DATA });

export const fetchObjects = (category, page) => function (dispatch) {
    dispatch(clearData());
    Api.object.fetch(category, page).then((result) => {
        dispatch(receiveObjects(result));
    });
};

export const fetchCallbacks = (id, page) => function (dispatch) {
    dispatch(clearData());
    Api.callback.fetch(id, page).then((result) => {
        dispatch(receiveObjects(result));
    });
};

export const fetchReviews = (id, page) => function (dispatch) {
    dispatch(clearData());
    Api.reviews.fetch(id, page).then((result) => {
        dispatch(receiveObjects(result));
    });
};

export const searchObjects = (category, query, page) => function (dispatch) {
    dispatch(clearData());
    Api.object.search(category, query, page).then((result) => {
        dispatch(receiveObjects(result));
    });
};

export const receiveObjects = (result) => ({ type: actions.RECEIVE_OBJECTS, result });
export const deleteObjects = () => ({type: actions.DELETE_OBJECTS});

export const toggleObjectSelect = (id) => ({type: actions.TOGGLE_OBJECT_SELECT, id});
export const toggleObjectHidden = (id) => ({type: actions.TOGGLE_OBJECT_HIDDEN, id});

export const activateAllSelected = (id) => ({type: actions.ACTIVATE_ALL_SELECTED, id});
export const deactivateAllSelected = (id) => ({type: actions.DEACTIVATE_ALL_SELECTED, id});
