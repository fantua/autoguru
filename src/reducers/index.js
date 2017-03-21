import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import objectsReducer from './objects';
import callbacksReducer from './callbacks';

const reducers = combineReducers({
    objects: objectsReducer,
    callbacks: callbacksReducer,
    routing: routerReducer
});

export default reducers;