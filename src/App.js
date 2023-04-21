import { useState } from 'react';
import Weather from './components/Weather';
import Search from './components/Search';
import Forecast from './components/Forecast';
import { fetchForecast } from './services/forecast';
import { fetchWeather } from './services/weather';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  // after selected a city, we call api to get specific information
  const onSearch = (e) => {
    setWeather(null);
    setForecast(null);
    fetchForecast(e.lat, e.lon).then((data) => setForecast(data));
    fetchWeather(e.lat, e.lon).then((data) => setWeather(data));
  }
  return (
    <div className="App">
      <Search onSearch={onSearch}></Search>
      {weather && <Weather weather={weather}></Weather>}
      {forecast && <Forecast forecast={forecast}></Forecast>}
    </div>
  );
}

export default App;
