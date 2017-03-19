import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(initialState, history) {
    const enhancer = compose(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        )
    );

    return createStore(
        reducers,
        initialState,
        enhancer
    );
}