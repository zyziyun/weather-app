import { getFullTime, getTimeHM } from "../../services/utils";
import { Sunrise, Sunset, User, Wind, Thermometer, Umbrella, Map} from 'react-feather';
import styles from "./index.module.scss";
import WeatherIcon from "./icon";

const icon_style = { margin: '3px 15px 0 0' };

const Weather = ({ weather }) => {
  return (
    <div className={styles.panel}>
      <div className={styles.panel_inner}>
        <div className={styles.updatetime}>{getFullTime(weather.dt, weather.timezone)}</div>
        <div className={styles.city}>{weather.city}, {weather.country}</div>
        <div className={styles.temp}><Thermometer/>{weather.temp}</div>
      </div>
      <div className={styles.panel_inner}>
          <div className={styles.description}>
            <WeatherIcon type={weather.description}/>
            {'  ' + weather.main}, {weather.description}
          </div>
          <div><User style={{marginRight: '18px'}}/>Feels like <b>{weather.feels_like}</b></div>
          <div>
            <div><Sunrise color="red" style={icon_style}/>sunrise: <b>{getTimeHM(weather.sunrise, weather.timezone)}</b></div>
            <div><Sunset color="orange" style={icon_style}/>sunset: <b>{getTimeHM(weather.sunset, weather.timezone)}</b></div>
          </div>
      </div>
      <div className={styles.panel_inner}>
        <div>
           <Thermometer color="blue" size={22} style={icon_style}/>Min: <b>{weather.temp_min}</b>, { ' '}
           <Thermometer color="red" size={22}/>Max: <b> {weather.temp_max}</b>
        </div>
        <div><Map style={{marginRight: '18px'}} size={20}/>Visibility: <b>{weather.visibility}</b></div>
        <div>
          <div><Wind color="green" size={22} style={icon_style}/>Wind: <b>{weather.wind.speed}</b> m/s, deg: <b>{weather.wind.deg}°</b></div>
        </div>
        <div>
          <div><Umbrella size={22} style={icon_style}/>Humidity:<b>{weather.humidity}</b>,Pressure:<b>{weather.pressure}</b></div>
        </div>
      </div>
      
    </div>
  );
};

export default Weather;

