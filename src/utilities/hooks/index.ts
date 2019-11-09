import createReducer from '../reducer';

export function injectAsyncReducer(store: any) {
    return (name: string, asyncReducer: Function) => {
        store.asyncReducers[name] = asyncReducer; // eslint-disable-line
        store.replaceReducer(createReducer(store.asyncReducers, store.history));
    };
}

export function injectAsyncSagas(store: any) {
    return (sagas: Array<Function>) => {
        sagas.map(store.runSaga)
    };
}

export function getHooks(store: any) {
    return {
        injectReducer: injectAsyncReducer(store),
        injectSagas: injectAsyncSagas(store),
    };
}
