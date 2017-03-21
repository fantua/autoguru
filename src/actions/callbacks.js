import Parse from 'parse';
import * as actions from '../constants';

export const receive = (entities, result = {}) => ({type: actions.CALLBACKS_RECEIVE, payload: { entities, result }});
export const request = () => ({type: actions.CALLBACKS_REQUEST, payload: {}});

export const fetch = (userId, offset, limit) => function (dispatch) {
    dispatch(request());

    const object = Parse.Object.extend('Callback');
    const query = new Parse.Query(object);
    const user = new Parse.User();

    user.id = userId;
    query.equalTo('owner', user);

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