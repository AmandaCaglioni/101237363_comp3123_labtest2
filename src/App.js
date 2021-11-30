import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import moment from 'moment';

function App() {
  const [cityName, setcityName] = useState();
  const [currentTemperature, setcurrentTemperature] = useState();
  const [minimumTemperature, setminimumTemperature] = useState();
  const [maximumTemperature, setmaximumTemperature] = useState();
  const [pressure, setpressure] = useState();
  const [humidity, sethumidity] = useState();
  const [windSpeed, setwindSpeed] = useState();
  const [sunRise, setsunRise] = useState();
  const [sunSet, setsunSet] = useState();
  const [main, setmain] = useState();
  const [mainDescription, setmainDescription] = useState()
  const [imgIcon, setimgIcon] = useState()
  const [visibility, setvisibility] = useState()
  async function getTemperatureStats() {
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=f536a43b87281796444519d7958f52ec`)
    const res = await response.json()
    if (res) {
      console.log(res.name)
      setcityName(res.name);
      setcurrentTemperature(res.main.temp)
      setminimumTemperature(res.main.temp_min)
      setmaximumTemperature(res.main.temp_max)
      setpressure(res.main.pressure)
      sethumidity(res.main.humidity)
      setwindSpeed(res.wind.speed)
      setsunRise(moment(parseInt(res.sys.sunrise)).format("HH:mm:ss"))
      setsunSet(moment(parseInt(res.sys.sunset)).format("HH:mm:ss"))
      setmain(res.weather[0].main);
      setmainDescription(res.weather[0].description);
      setimgIcon(res.weather[0].icon);
      setvisibility(res.visibility);
    }
  }
  useEffect(() => {
    getTemperatureStats();
  }, []);
  return (
    <div className="container">
      <div className="subcontainer">
        <div className="grid-item">
          <p>City: {cityName} </p>
          <p>Current Temperature: {currentTemperature}  &nbsp;&nbsp;&nbsp;&nbsp;<i class='fas fa-temperature-low'></i></p>
          <p>Minimum Temperature: {minimumTemperature} &nbsp;<i class='fas fa-temperature-low'></i></p>
          <p>Maximum Temperature: {maximumTemperature}  &nbsp;<i class='fas fa-temperature-low'></i></p>
        </div>
        <div className="grid-item">
          <p>Pressure: {pressure} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fas fa-meteor'></i></p>
          <p>humidity: {humidity} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class='fas fa-water'></i></p>
          <p>windSpeed: {windSpeed} &nbsp;<i class='fas fa-wind'></i></p>
        </div>
        <div className="grid-item">
          <p>sunrise: {sunRise} AM</p>
          <p>sunset: {sunSet} PM</p>
        </div>
        <div className="grid-item">
          <p>{main}</p>
          <p>{mainDescription}</p>
          <img src={`https://openweathermap.org/img/wn/${imgIcon}@2x.png`} alt="clouds"></img>
        </div>
        <div className="grid-item">
          <p>Visibility: {visibility}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
