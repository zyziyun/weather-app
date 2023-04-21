import { APP_KEY, Request } from "./request";

// http://api.openweathermap.org/geo/1.0/direct?q=Chicago,Illinois,US&limit=5&appid=8fab8af74de5a18abcdf810ee58ac4e8
export const fetchGeoPlaces = (value) => {
    return Request({
        url: 'http://api.openweathermap.org/geo/1.0/direct',
        params: {
            q: value,
            limit: 5,
            appid: APP_KEY
        },
        filter: (results) => results.map((item) => {
            return {
                lat: item.lat,
                lon: item.lon,
                title: `${item.name}${item.state ? ' ,' + item.state: ''}, ${item.country}`
            }
        })
    });
}