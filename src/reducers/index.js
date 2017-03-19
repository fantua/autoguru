import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import objectsReducer from './objects';

const reducers = combineReducers({
    objects: objectsReducer,
    routing: routerReducer
});

export default reducers;