import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { selectLoadingCityList, selectCityList, selectLoadingWeather, selectWeatherData, selectSelectedCity } from './selectors';
import { connect } from 'react-redux';
import { getCityList, getWeatherFromCityId } from './actions';
import Select from '../../components/CustomSelect';
import styles from './styles.module.scss';
import Debounce from 'debounce';
import WeatherWidget from '../../components/WeatherWidget';
import classNames from 'classnames';

class Home extends Component {
    constructor(props) {
        super(props);
        this.queryCityList = Debounce(this.queryCityList, 400);
        this.state = {
            selectedCity: {}
        };
    }
    componentDidMount() {
        this.queryCityList();
    }

    componentDidUpdate(prevProps, prevState) {
        const { loadingCityList } = prevProps;
        const { selectedCity } = prevState;
        if (selectedCity && this.state.selectedCity && selectedCity.value !== this.state.selectedCity.value) {
            this.getWeatherFromCityId();
        }
        if (loadingCityList && !this.props.loadingCityList) {
            this.initSelect();
        }
    }

    initSelect = () => {
        const { cityList } = this.props;
        const { selectedCity } = this.state;
        const list = this.getCitySelectOptions(cityList);
        if (list && list.length && selectedCity && !selectedCity.value) {
            this.setState({
                selectedCity: list[0],
            });
        }
    }

    getCitySelectOptions = (list) => {
        if (!list || !Array.isArray(list)) return [];
        return list.map(city => ({
            label: city.name.concat(', ', city.country),
            value: city.id,
        }));
    }

    getWeatherFromCityId() {
        const { selectedCity } = this.state;
        this.props.getWeatherFromCityId(selectedCity.value);
    }

    handleChangeSelectedCity = (evt) => {
        this.setState({
            selectedCity: evt,
        });
    }

    handleInputChangeCitySelect = (query) => {
        console.log(query);
        this.queryCityList(query);
    }

    queryCityList = (query = 'a') => {
        if (!query) return;
        this.props.getCityList(query);
    }

    transformWeatherData = (weatherData) => {
        if (!weatherData || !Array.isArray(weatherData)) return [];
        return weatherData.map(item => ({
            temperature: item.main.temp,
            temperature_max: item.main.temp_max,
            temperature_min: item.main.temp_min,
            pressure: item.main.pressure,
            humidity: item.main.humidity,
            weatherDescription: item.weather.description,
            weatherIcon: item.weather[0].icon,
            weatherMain: item.weather[0].main,
            wind: {
                degree: item.wind.deg,
                speed: item.wind.speed,
            },
            date: new Date(item.dt * 1000),
        }));
    }

    renderWeatherWidget = () => {
        const { weatherData, selectedCityFromWeatherData, loadingWeather } = this.props;
        const transformedWeatherData = this.transformWeatherData(weatherData);
        if (!selectedCityFromWeatherData || !selectedCityFromWeatherData.id || loadingWeather) return <div className="loader"></div>
        return (
            <div className={styles.wrapper}>
                <WeatherWidget 
                    weatherData={transformedWeatherData} 
                    selectedCity={selectedCityFromWeatherData} 
                />
            </div>
        )
    }

    render() {
        const { cityList, loadingCityList } = this.props;
        const { selectedCity } = this.state;
        const citySelectOptions = this.getCitySelectOptions(cityList);
        return (
            <div className={styles.container}>
                <div className={classNames(styles.wrapper, styles.displayCenter)}>
                    <strong>Select City: </strong>
                    <div className={styles.selectWrapper}>
                        <Select 
                            options={citySelectOptions}
                            value={selectedCity}
                            onInputChange={this.handleInputChangeCitySelect}
                            onChange={this.handleChangeSelectedCity}
                            isLoading={loadingCityList}
                            onBlur={null}
                        />
                    </div>
                </div>
                {this.renderWeatherWidget()}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loadingCityList: selectLoadingCityList(),
    cityList: selectCityList(),
    loadingWeather: selectLoadingWeather(),
    weatherData: selectWeatherData(),
    selectedCityFromWeatherData: selectSelectedCity(),
})

function mapDispatchToProps(dispatch) {
    return {
        getCityList: (query) => {
            dispatch(getCityList(query));
        },
        getWeatherFromCityId: (id) => {
            dispatch(getWeatherFromCityId(id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);