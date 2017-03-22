import Parse from 'parse';
import { push } from 'react-router-redux';
import * as actions from '../constants';

export const receive = (entities, result = {}) => ({type: actions.OBJECTS_RECEIVE, payload: { entities, result }});
export const request = () => ({type: actions.OBJECTS_REQUEST, payload: {}});
export const deleted = (list) => ({type: actions.OBJECTS_DELETE, payload: { list }});

export const fetch = (categoryId, offset, limit, search = null) => function (dispatch) {
    dispatch(request());

    const object = Parse.Object.extend('Object');
    const query = new Parse.Query(object);

    query.equalTo('type', categoryId);

    if (search) {
        query.matches('canonicalName', `.*${search.toLowerCase()}*.`);
    }

    query.descending('createdAt');
    query.skip(offset);
    query.limit(limit);

    Promise.all([
        query.count(),
        query.find()
    ])
        .then(([count, entities]) => { dispatch(receive(entities, { count })); })
        .catch(e => { console.log(e); alert(e.message); });

    // if (!this.user.isAdmin()) {
    //     query.equalTo('user', this.user.get());
    // }
};

export const selectAll = () => ({type: actions.OBJECTS_SELECT_ALL, payload: {}});
export const selectNone = () => ({type: actions.OBJECTS_SELECT_NONE, payload: {}});

export const select = (id) => ({type: actions.OBJECTS_SELECT, payload: { id }});
export const unselect = (id) => ({type: actions.OBJECTS_UNSELECT, payload: { id }});

export const setHiddenToAllSelected = (value) => function (dispatch, getState) {
    const { selected, entities, ids } = getState().objects;

    const objects = selected.map(id => entities[id].set('hidden', value));

    Parse.Object.saveAll(objects)
        .then((entities) => { dispatch(receive(entities, { ids })); })
        .catch(e => { console.log(e); alert(e.message); });
};

export const activateAllSelected = () => function (dispatch) {
    dispatch(setHiddenToAllSelected(false));
};
export const deactivateAllSelected = () => function (dispatch, getState) {
    dispatch(setHiddenToAllSelected(true));
};

export const setHiddenById = (id, value) => function (dispatch, getState) {
    const { entities, ids } = getState().objects;

    entities[id].save({ hidden: value })
        .then((entity) => { dispatch(receive([ entity ], { ids })); })
        .catch(e => { console.log(e); alert(e.message); });
};

export const activate = (id) => function (dispatch) {
    dispatch(setHiddenById(id, false));
};
export const deactivate = (id) => function (dispatch) {
    dispatch(setHiddenById(id, true));
};

export const deleteAllSelectedSuccess = () => function (dispatch, getState) {
    const { pathname, query } = getState().routing.locationBeforeTransitions;

    dispatch(push({ pathname, query: { ...query, page: undefined } }));
};
export const deleteAllSelected = () => function (dispatch, getState) {
    const { selected, entities } = getState().objects;

    if (selected.length) {
        const list = selected.map(id => entities[id]);

        Parse.Object.destroyAll(list)
            .then(result => {
                dispatch(deleted(result.map(item => item.id)));
                dispatch(deleteAllSelectedSuccess());
            })
            .catch(e => { console.log(e); alert(e.message); });
    }
};