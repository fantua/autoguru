import Parse from 'parse';
import { push } from 'react-router-redux';
import * as actions from '../constants';

export const receive = (entities, result = {}) => ({type: actions.REVIEWS_RECEIVE, payload: { entities, result }});
export const request = () => ({type: actions.REVIEWS_REQUEST, payload: {}});
export const deleted = (list) => ({type: actions.REVIEWS_DELETE, payload: { list }});

export const fetch = (id, offset, limit, search = null) => function (dispatch) {
    dispatch(request());

    const object = Parse.Object.extend('Review');
    const query = new Parse.Query(object);

    query.equalTo('reviewObjectId', id);
    query.equalTo('isAnswer', false);
    query.include('user');
    query.include('answerObject');
    query.include('reviewObject');
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

export const selectAll = () => ({type: actions.REVIEWS_SELECT_ALL, payload: {}});
export const selectNone = () => ({type: actions.REVIEWS_SELECT_NONE, payload: {}});

export const select = (id) => ({type: actions.REVIEWS_SELECT, payload: { id }});
export const unselect = (id) => ({type: actions.REVIEWS_UNSELECT, payload: { id }});

export const deleteAllSelectedSuccess = () => function (dispatch, getState) {
    const { pathname, query } = getState().routing.locationBeforeTransitions;

    dispatch(push({ pathname, query }));
};
export const deleteAllSelected = () => function (dispatch, getState) {
    const { selected, entities } = getState().reviews;

    if (selected.length) {
        const list = selected.map(id => {
            const item = entities[id];

            item.get('reviewObject').increment('reviewSum', -(item.get('rating')));
            item.get('reviewObject').increment('reviewCount', -1);

            return item;
        });

        Parse.Object.saveAll(list)
            .then(result => Parse.Object.destroyAll(list))
            .then(result => {
                dispatch(deleted(result.map(item => item.id)));
                dispatch(deleteAllSelectedSuccess());
            })
            .catch(e => { console.log(e); alert(e.message); });
    }
};