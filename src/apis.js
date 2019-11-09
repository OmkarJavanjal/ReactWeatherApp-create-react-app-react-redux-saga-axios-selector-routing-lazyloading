const hosts = {
    development: 'http://localhost:3001',
};

const getHost = () => {
    if (process.env.NODE_ENV === 'development') {
        return hosts.development;
    }
    const HTTPS = 'https://';
    const urlHost = window.location.host;
    return HTTPS.concat(urlHost);
};

export const host = getHost();

export const sampleTestUrl = 'https://reqres.in/api/users/:page';
export const weatherAppApi = 'https://api.openweathermap.org/data/2.5/forecast';
export const getCityList = 'http://localhost:3004/list';

export default {
    sampleTestUrl,
    weatherAppApi,
    getCityList,
}