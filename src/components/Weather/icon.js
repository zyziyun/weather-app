import { Cloud, CloudRain, CloudSnow, Sun, CloudDrizzle } from 'react-feather';

const WeatherIcon = ({ type, ...params }) => {
    return (
      <span style={{margin: '0 5px'}}>
        {type.toLowerCase().indexOf('cloud') > -1 && <Cloud {...params}/>}
        {type.toLowerCase().indexOf('rain') > -1 && <CloudRain {...params}/>}
        {type.toLowerCase().indexOf('snow') > -1 && <CloudSnow {...params}/>}
        {type.toLowerCase().indexOf('sun') > -1 && <Sun {...params}/>}
        {type.toLowerCase().indexOf('sky') > -1 && <Sun {...params} color={'red'}/>}
        {type.toLowerCase().indexOf('drizzle') > -1 && <CloudDrizzle {...params}/>}
      </span>
    );
  };
  
  export default WeatherIcon;