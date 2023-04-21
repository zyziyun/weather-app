import { APP_KEY, Request } from "./request";

// https://api.openweathermap.org/data/2.5/weather?lat=41.8755616&lon=-87.6244212&appid=8fab8af74de5a18abcdf810ee58ac4e8&units=metric
export const fetchWeather = (lat, lon) => {
    return Request({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
            lat: lat,
            lon: lon,
            units: 'metric',
            appid: APP_KEY
        },
        filter: (data) => {
            return {
                city: data.name,
                country: data.sys.country,
                dt: data.dt * 1000,
                visibility: data.visibility + 'km',
                timezone: data.timezone,
                sunrise: data.sys.sunrise * 1000,
                sunset: data.sys.sunset * 1000,
                main: data.weather[0].main,
                description: data.weather[0].main,
                temp: Math.round(data.main.temp) + ' °C',
                temp_min: Math.round(data.main.temp_min) + ' °C',
                temp_max: Math.round(data.main.temp_max) + ' °C',
                feels_like: Math.round(data.main.feels_like) + ' °C',
                pressure: data.main.pressure + 'hPa',
                humidity: data.main.humidity + ' %',
                wind: data.wind,
            }
        }
    });
}