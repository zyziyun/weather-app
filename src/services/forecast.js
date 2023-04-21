import { APP_KEY, Request } from "./request";

// https://api.openweathermap.org/data/2.5/forecast?lat=41.8755616&lon=-87.6244212&appid=8fab8af74de5a18abcdf810ee58ac4e8
export const fetchForecast = (lat, lon) => {
    return Request({
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        params: {
            lat: lat,
            lon: lon,
            units: 'metric',
            appid: APP_KEY
        },
        filter: (results) => {
            const resultObj = {};
            results.list.forEach((item) => {
                const key = item?.dt_txt?.split(' ')[0];
                if (!resultObj[key]) resultObj[key] = [];
                resultObj[key].push({
                    main: item.weather[0]?.main,
                    description: item.weather[0]?.description,
                    visibility: item.visibility,
                    dt: item.dt,
                    time: item.dt_txt?.split(' ')[1],
                    ...(item.main || {}),
                    ...(item.wind || {}),
                    rain: item.rain,
                    clouds: item.clouds
                });
            });
            return resultObj;
        }
    });
}