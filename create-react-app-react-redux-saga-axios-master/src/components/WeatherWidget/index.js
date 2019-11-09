import React, { Component } from 'react';
import styles from './styles.module.scss';
import Radio from '../Radio';
import moment from 'moment';
import WIND from '../../assets/wind.svg';
import HUMIDITY from '../../assets/humidity.png';
const options = [
    {
        label: 'Temperature',
        value: 'temperature',
        className: styles.radio,
    },
    {
        label: 'Humidity',
        value: 'humidity',
        className: styles.radio,
    },
    {
        label: 'Wind',
        value: 'wind',
        className: styles.radio,
    }
]

class WeatherWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeBtn: 'temperature',
            selectedUnit: 'C',
        };
    }

    handleChangeSelectedOption = (value) => {
        this.setState({
            activeBtn: value,
        });
    }

    setSelectedUnit = (unit) => () => {
        this.setState({
            selectedUnit: unit,
        });
    }

    getAverageDetails = (weatherData) => {
        if (!weatherData || !Array.isArray(weatherData) || !weatherData.length) return {};

        const totalWeatherData = weatherData.reduce((prevValue, currentValue) => {
            const value = {
                temperature: prevValue.temperature || 0,
                pressure: prevValue.pressure || 0,
                humidity: prevValue.humidity || 0,
                windSpeed: (prevValue.wind && prevValue.wind.speed)|| (prevValue.windSpeed && prevValue.windSpeed) || 0,
            }
            return {
                temperature: value.temperature + currentValue.temperature,
                pressure: value.pressure + currentValue.pressure,
                humidity: value.humidity + currentValue.humidity,
                windSpeed: value.windSpeed + currentValue.wind.speed,
            };
        });

        const listLength = (weatherData && weatherData.length) || 1
        return {
            temperature: totalWeatherData.temperature / listLength,
            pressure: totalWeatherData.pressure / listLength,
            humidity: totalWeatherData.humidity / listLength,
            windSpeed: totalWeatherData.windSpeed / listLength,
        }
    }

    getSelectedCity = () => {
        const { selectedCity } = this.props;
        return `${selectedCity && selectedCity.name}, ${selectedCity && selectedCity.country}`;
    }

    getDay = (item) => {
        if (!item) return '';
        return moment(item.date).format('dddd');
    }

    getWeatherDescription = (item) => {
        return item &&  item.weatherMain;
    }

    getHumidity = (item) => {
        return item && item.humidity;
    }

    getWind = (item) => {
        return item && item.wind && item.wind.speed;
    }

    getWindDegree = (item) => {
        return item && item.wind && item.wind.degree;
    }

    getTemperature = (temperature) => {
        if (!temperature) return 0;
        const { selectedUnit } = this.state;
        if (selectedUnit === 'K') return parseInt(temperature, 10);
        else {
            const kTemp = parseInt(temperature, 10);
            return parseInt(kTemp - 273);
        }
    }

    getIconImageUrl = (item) => {
        if (!item) return '';
        return `http://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`;
    }

    renderUnit = () => {
        const { selectedUnit } = this.state;
        if (selectedUnit === 'K') {
            return (
                <span><label className={styles.link} onClick={this.setSelectedUnit('C')}>°C</label> | °K</span>
            )
        } else {
            return (
                <span> °C | <label className={styles.link} onClick={this.setSelectedUnit('K')}>°K</label></span>
            )
        }
    }

    renderBreakDownDetails = (item, averageDetails) => {
        const { activeBtn } = this.state;
        const averageSpeed = averageDetails && averageDetails.windSpeed;
        const speed = this.getWind(item) / averageSpeed;
        if (activeBtn === 'temperature') {
            return (
                <React.Fragment>
                    <div className={styles.imageWrapper}>
                        <img src={this.getIconImageUrl(item)} width="100%" height="100%" alt="weather" />
                    </div>
                    <div className={styles.subHeader}>
                        {`${this.getTemperature(item.temperature_max)}°`} | {`${this.getTemperature(item.temperature_min)}°`}
                    </div>
                </React.Fragment>
            );
        }
        if (activeBtn === 'humidity') {
            return (
                <React.Fragment>
                    <div className={styles.imageWrapper}>
                        <img src={HUMIDITY} width="100%" height="100%" alt="Humidity" />
                    </div>
                    <div className={styles.subHeader}>
                        {`${this.getHumidity(item)} %`}
                    </div>
                </React.Fragment>
            );
        }
        if (activeBtn === 'wind') {
            return (
                <React.Fragment>
                    <div className={styles.imageWrapper}>
                        <img src={WIND} style={{ transform: `rotateZ(${this.getWindDegree(item)}deg) scale(${speed > 1 ? 1 : speed})`}} width="100%" height="100%" alt="wind direction" />
                    </div>
                    <div className={styles.subHeader}>
                        {`${this.getWind(item)} Km/h`}
                    </div>
                </React.Fragment>
            );
        }
    }

    renderBrackDownWidget = (item, averageDetails) => {
        if (!item) return null;
        const date = moment(item.date);
        const time = date.format('h A');
        const day = date.format('ddd');
        return (
            <div className={styles.brakdownWidgetWrapper}>
                <div className={styles.subHeader}>{day}</div>
                <div className={styles.subHeader}>{time}</div>
                {this.renderBreakDownDetails(item, averageDetails)}
            </div>
        )
    }

    render() {
        const { weatherData } = this.props;
        const { activeBtn } = this.state;
        const averageDetails = this.getAverageDetails(weatherData);
        return (
            <div className={styles.container}>
                <div className={styles.title}>{this.getSelectedCity()}</div>
                <div className={styles.subHeader}>{this.getDay(weatherData[0])}</div>
                <div className={styles.subHeader}>{this.getWeatherDescription(weatherData[0])}</div>
                <div className={styles.detailsWrapper}>
                    <div className={styles.imageWrapper}>
                        <img src={this.getIconImageUrl(weatherData[0])} width="100%" height="100%" alt="weather" />
                    </div>
                    <div className={styles.temperatureWrapper}>
                        <div className={styles.temperature}>{this.getTemperature(weatherData[0] && weatherData[0].temperature)}</div>
                        <div className={styles.unit}>
                            {this.renderUnit()}
                        </div>
                    </div>
                    <div className={styles.weatherDetailsWrapper}>
                        <div className={styles.subHeader}>Humidity: {averageDetails.humidity} %</div>
                        <div className={styles.buttonsWrapper}>
                            {options.map(item => <Radio selectedValue={activeBtn} {...item} onClick={this.handleChangeSelectedOption} />)}
                        </div>
                    </div>
                </div>
                <div className={styles.breakDownsContainer}>
                    {weatherData && weatherData.map(item => this.renderBrackDownWidget(item, averageDetails))}
                </div>
            </div>
        )
    }
}

export default WeatherWidget;