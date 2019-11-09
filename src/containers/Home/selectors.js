import { createSelector } from 'reselect';

const HomeState = () => (state) => state && state['Home'];

const selectLoadingCityList = () => createSelector(
    HomeState(),
    (home) => home ? home.get('loadingCityList') : false
);

const selectCityList = () => createSelector(
    HomeState(),
    (home) => home ? home.get('cityList') : []
);

const selectLoadingWeather = () => createSelector(
    HomeState(),
    (home) => home ? home.get('loadingWeatherData') : false
);

const selectWeatherData = () => createSelector(
    HomeState(),
    (home) => home ? home.get('weatherResponse') : {}
);

const selectSelectedCity = () => createSelector(
    HomeState(),
    (home) => home ? home.get('selectedCity') : {}
);

export {
    selectLoadingCityList,
    selectCityList,
    selectLoadingWeather,
    selectWeatherData,
    selectSelectedCity,
};
