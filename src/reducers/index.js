import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import objectsReducer from './objects';
import reviewsReducer from './reviews';
import callbacksReducer from './callbacks';

const reducers = combineReducers({
    objects: objectsReducer,
    reviews: reviewsReducer,
    callbacks: callbacksReducer,
    routing: routerReducer
});

export default reducers;