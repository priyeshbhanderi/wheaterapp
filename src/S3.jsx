import './App.css';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const api = {
  key: '34480b98aa332da53123a0ac63a4ea9d',
  base: "https://api.openweathermap.org/data/2.5/",
};



const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Surat");



  const city_api = 'https://countriesnow.space/api/v0.1/countries/population/cities';

  useEffect(() => {
    axios.get(`${city_api}`)
      .then((response) => {
        const cityData = response.data.data.map(city => ({
          value: city.city,
          name: city.city,
        }));
        setCities(cityData);
        // console.log(cityData);

        // Set default city if it exists in the city list
        const defaultCity = cityData.find(city => city.value === "Surat");
        if (defaultCity) {
          setSelectedCity(defaultCity.value);
        }
      })
      .catch((error) => {
        console.error('Error fetching city data:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      axios.get(`${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`)
        .then((response) => {
          setWeather(response.data);
          // console.log(response.data);
          return axios.get(`${api.base}forecast/daily?q=${selectedCity}&cnt=7&units=metric&APPID=${api.key}`);
        })
        .then((response) => {
          setForecast(response.data.list);
        })
        .catch((error) => {
          console.error("Error fetching the weather data", error);
        });
    }
  }, [selectedCity]);

  const handleChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    console.log('Selected city:', selectedOption);
  };

  return (
    <>
      <div className='weatherr'>
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center h-100'>
          <SelectSearch
            id="city-select"
            options={cities}
            value={selectedCity}
            onChange={handleChange}
            search
            placeholder="Choose a city"
          />
          {typeof weather.main !== "undefined" ? (
            <div className='row p-3 w-70'>
              <div className='col-md-4 bggg'>
                <span className='fs-2 text-white'><i className="bi bi-geo-alt-fill"></i> &nbsp;{weather.name}</span>
                <h1 className='text-white'>{Math.round(weather.main.temp)} °C</h1>
                <div className='card'>
                  <div className='card border-0 d-flex align-items-start ps-5 justify-content-center text-white'>
                    <span className='fs-5 '>Feels Like &nbsp; {weather.main.feels_like} °C</span>
                    <div className='d-flex flex-row align-items-center mt-3'>
                      <i className="fa-solid fa-up-long fs-4 me-2"></i>
                      <span className='text-center fs-4  '>{Math.round(weather.main.temp_max)} °C</span>
                      <i className="fa-solid fa-down-long fs-4 mx-2 ms-4"></i>
                      <span className='text-center fs-4  '>{Math.round(weather.main.temp_min)} °C</span>
                    </div>
                    <div className='d-flex flex-row align-items-center mt-3'>
                      <i className="bi bi-droplet-fill fs-4"></i>
                      <span className='text-center fs-4  mx-3'>Humidity</span>
                      <span className='text-center fs-4  '>{weather.main.humidity} %</span>
                    </div>
                    <div className='d-flex flex-row align-items-center mt-3'>
                      <i className="bi bi-wind fs-4"></i>
                      <span className='text-center fs-4  mx-3'>Wind</span>
                      <span className='text-center fs-4  '>{weather.wind.speed} KPH</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-8 text-dark'>
                <h2 className='my-3 text-end fs-1 fw-bold bggg p-2'>7-Day Forecast</h2>
                <div className='d-flex justify-content-around row row-cols-3 g-4 w-100 mt-5'>
                  {forecast.map((day, index) => (
                    <div key={index} className='col'>
                      <div className='d-flex flex-column align-items-center bggg'>
                        <span className='fw-bold fs-4'>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}</span>
                        <span className='fs-4'>{Math.round(day.temp.day)}°C</span>
                        <span className='text-capitalize fs-5'>{day.weather[0].description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className='text-white fs-3'>Enter a city name to get the weather information</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
