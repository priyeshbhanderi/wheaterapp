import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import { useState } from 'react';
import axios from 'axios';

const api = {
  key: '34480b98aa332da53123a0ac63a4ea9d',
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const searchPressed = () => {
    axios.get(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
        return axios.get(`${api.base}forecast/daily?q=${search}&cnt=7&units=metric&APPID=${api.key}`);
      })
      .then((response) => {
        setForecast(response.data.list);
        console.log(response.data.list);
      })
      .catch((error) => {
        console.error("Error fetching the weather data", error);
      });
  };

  return (
    <>
      <div className='container-fluid p-5 bg-info px-5 d-flex justify-content-center align-items-center flex-column'>
        <div className="d-flex w-100">
          <input className="form-control me-2" type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
          <button className="btn btn-outline-dark" onClick={searchPressed} type='submit'>Search</button>
        </div>
        {typeof weather.main !== "undefined" ? (
          <>

            <div className='row w-100 bg-white rounded-3 py-3'>
              <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
                <span className='fs-1 mt-3 text-capitalize fw-bold'>{weather.name}</span>
                <h1>{weather.main.temp}°C</h1>
              </div>
              <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
                <div className='card border-0'>
                  <span className='fs-5 fw-bold'>Feels Like &nbsp;{weather.main.feels_like}°C</span>
                  <div className='d-flex flex-row align-items-center mt-3'>
                    <i className="fa-solid fa-up-long fs-4 me-2"></i>
                    <span className='text-center fs-4 fw-bold '>{weather.main.temp_max}°C</span>
                    <i className="fa-solid fa-down-long fs-4 mx-2 ms-4"></i>
                    <span className='text-center fs-4 fw-bold '>{weather.main.temp_min}°C</span>
                  </div>
                  <div className='d-flex flex-row align-items-center mt-3'>
                    <i className="bi bi-droplet-fill text-dark fs-4"></i>
                    <span className='text-center fs-4 fw-bold mx-3'>Humidity</span>
                    <span className='text-center fs-4 fw-bold '>{weather.main.humidity}%</span>
                  </div>
                  <div className='d-flex flex-row align-items-center mt-3'>
                    <i className="bi bi-wind text-dark fs-4"></i>
                    <span className='text-center fs-4 fw-bold mx-3'>Wind</span>
                    <span className='text-center fs-4 fw-bold '>{weather.wind.speed} KPH</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='row w-100 bg-white rounded-3 py-3 mt-4'>
              <div className='col-12'>
                <h2 className='mb-3 text-center'>7-Day Forecast</h2>
                <div className='d-flex justify-content-around row row-cols-2 g-4'>
                  {forecast.map((day, index) => (
                    <div className='col'>
                      <div key={index} className='d-flex flex-column align-items-center'>
                        <span className='fw-bold'>{new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: 'long' })}</span>
                        <span>{day.temp.day}°C</span>
                        <span className='text-capitalize'>{day.weather[0].description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className='text-white fs-3'>Enter a city name to get the weather information</p>
        )}
      </div>


      <div className='weatherr'>
        <div className='container-fluid d-flex justify-content-center align-items-center'>
          <div className='row bg-white'>
            <div className='col-md-4'>
                  <span>surat</span>
            </div>
            <div className='col-md-8'></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
