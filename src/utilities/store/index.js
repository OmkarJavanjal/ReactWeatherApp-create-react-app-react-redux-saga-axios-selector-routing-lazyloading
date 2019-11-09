import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReducer from '../reducer';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
    let composeEnhancers = compose;
    const devtools = window.devToolsExtension || (() => noop => noop);
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history),
    ];
    const enhancers = [
        applyMiddleware(...middlewares),
        devtools(),
    ];
    const store = createStore(
        createReducer({}, history),
        fromJS(initialState),
        composeEnhancers(...enhancers),
    );
    store.runSaga = sagaMiddleware.run;
    store.asyncReducers = {};
    store.history = history;

    if (module.hot) {
        module.hot.accept('../reducer', () => {
            store.replaceReducer(createReducer(store.injectedReducers, history));
        });
    }

    return store;
}