import { take, cancel, fork, takeLatest, put, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from '../../utilities/constants';
import { GET_CITY_LIST, GET_WEATHER } from './constants';
import HomeService from './services';
import { OPEN_WEATHER_APP_API_KEY } from '../../constants';
import { getCityListDone, getWeatherFromCityIdDone, setSelectedCity } from './actions';

function* doGetCityList(action) {
    const result = yield call(HomeService.GetCityList.get, {
        q: action.query,
        _limit: 15,
    });
    if (result && result.data && Array.isArray(result.data)) {
        yield put(getCityListDone(result.data.slice(0,99)));
    } else {
        yield put(getCityListDone([]));
    }
}

function* getCityListWatcher() {
    yield takeLatest(GET_CITY_LIST, doGetCityList);
}

export function* getCityList() {
    const watcher = yield fork(getCityListWatcher);

    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

function* doGetWeatherFromCityId(action) {
    const result = yield call(HomeService.WeatherAppService.get, {
        id: action.id,
        appid: OPEN_WEATHER_APP_API_KEY,
    });
    if (result && result.data && Array.isArray(result.data.list)) {
        yield put(getWeatherFromCityIdDone(result.data.list));
        yield put(setSelectedCity(result.data.city));
    } else {
        yield put(getWeatherFromCityIdDone([]));
    }
}

function* getWeatherFromCityIdWatcher() {
    yield takeLatest(GET_WEATHER, doGetWeatherFromCityId);
}

export function* getWeatherFromCityId() {
    const watcher = yield fork(getWeatherFromCityIdWatcher);

    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    getCityList,
    getWeatherFromCityId,
];