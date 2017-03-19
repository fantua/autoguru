import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import reducers from '../reducers';
import DevTools from '../components/dev-tools';

export default function configureStore(initialState, history) {
    const enhancer = compose(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        ),
        DevTools.instrument()
    );

    return createStore(
        reducers,
        initialState,
        enhancer
    );
}