import api from '../../apis';
import { createService } from '../../utilities/ServiceFactory';

export const SampleApiService = createService(api.sampleTestUrl);
export const WeatherAppService = createService(api.weatherAppApi);
export const GetCityList = createService(api.getCityList);

export default {
    SampleApiService,
    WeatherAppService,
    GetCityList,
};
