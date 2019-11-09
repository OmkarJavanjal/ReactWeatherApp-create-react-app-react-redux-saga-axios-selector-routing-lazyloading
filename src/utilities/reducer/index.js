import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

export default function createReducer(asyncReducers, history) {
    return combineReducers({
        router: connectRouter(history),
        ...asyncReducers,
    });
}
