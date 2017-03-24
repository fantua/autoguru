import Parse from 'parse';
import { push } from 'react-router-redux';
import * as actions from '../constants';
import User from '../utils/user';

export const receive = (entities, result = {}) => ({type: actions.OBJECTS_RECEIVE, payload: { entities, result }});
export const request = () => ({type: actions.OBJECTS_REQUEST, payload: {}});
export const deleted = (list) => ({type: actions.OBJECTS_DELETE, payload: { list }});

export const fetch = (categoryId, offset, limit, search = null) => function (dispatch) {
    dispatch(request());

    const object = Parse.Object.extend('Object');
    const query = new Parse.Query(object);

    query.equalTo('type', categoryId);
    if (!User.isAdmin()) {
        query.equalTo('user', User.get());
    }

    if (search) {
        query.matches('canonicalName', `.*${search.toLowerCase()}*.`);
    }
    query.include('user');

    query.descending('createdAt');
    query.skip(offset);
    query.limit(limit);

    Promise.all([
        query.count(),
        query.find()
    ])
        .then(([count, entities]) => { dispatch(receive(entities, { count })); })
        .catch(e => { console.log(e); alert(e.message); });
};

export const fetchById = (id) => function (dispatch) {
    const object = Parse.Object.extend('Object');
    const query = new Parse.Query(object);

    query.equalTo('objectId', id);
    query.include('user');

    query.first()
        .then(entity => { dispatch(receive([ entity ])); })
        .catch(e => { console.log(e); alert(e.message); });
};

export const createSuccess = (category) => function (dispatch) {
    dispatch(push(`/catalog/${category}`));
};
export const create = ({ user, object }, category) => function (dispatch) {
    const parseUser = new Parse.User();

    parseUser.save(user)
        .then(user => {
            const parseObject = Parse.Object.extend('Object');
            const _object = new parseObject();

            return _object.save({ ...object, user });
        })
        .then(entity => {
            dispatch(receive([ entity ]));
            dispatch(createSuccess(category));
        })
        .catch(e => { console.log(e); alert(e.message); });
};

export const editSuccess = (category) => function (dispatch) {
    dispatch(push(`/catalog/${category}`));
};
export const edit = (id, { user, object }, category) => function (dispatch, getState) {
    const objectEntity = getState().objects.entities[id];

    objectEntity.save(object)
        .then(entity => {
            dispatch(receive([ entity ]));
            dispatch(editSuccess(category));
        })
        .catch(e => { console.log(e); alert(e.message); });
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

    dispatch(push({ pathname, query }));
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