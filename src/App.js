import React from 'react';
import './App.css';

//ADD ERROR HANDLING FOR WHEN A CITY IS NOT FOUND

const api = {
  key: '3009de6d834ac4fe29cbff4bd0cda3f5',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = React.useState('');
  const [weather, setWeather] = React.useState('');

  const convertTemp = (temp) => {
    return temp * 1.8 + 32;
  };

  const searchWeather = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 20
            ? 'main-warm'
            : 'main-cold'
          : 'main-div'
      }
    >
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={searchWeather}
        value={query}
      />
      <main>
        {typeof weather.main != 'undefined' ? (
          <div className="data-div">
            <div className="city-div">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="temp-div">
              {Math.round(convertTemp(weather.main.temp))} °F
            </div>
            <div className="type-div">{weather.weather[0].main}</div>
          </div>
        ) : (
          <div>Error error error</div>
        )}
      </main>
    </div>
  );
}

export default App;
