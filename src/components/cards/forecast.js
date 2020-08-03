import React from "react";
import { weather } from "../utils/helperFunctions";

// forecast card component
const Forecast = (props) => {
  // process data and get weather object
  let weatherObj = weather(props.data, props.info);

  // returns JSX
  return (
    <div className={`card`} style={{ width: "18rem" }}>
      <div className={weatherObj.weather}>
      <div className='card-body'>
        <h5 className='card-title'>{weatherObj.date}</h5>
        <p className='card-text'>
          {weatherObj.weather} <i className={weatherObj.weather_icon}></i>
        </p>
      </div>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item'>
          <b>High Temperature: </b>
          {weatherObj.high} &#8451;
        </li>
        <li className='list-group-item'>
          <b>Low Temperature: </b>
          {weatherObj.low} &#8451;
        </li>
        <li className='list-group-item'>
          <b>Humidity: </b>
          {weatherObj.humidity}%
        </li>
        <li className='list-group-item'>
          <b>Sunrise: </b>
          {weatherObj.sunrise}
        </li>
        <li className='list-group-item'>
          <b>Sunset: </b>
          {weatherObj.sunset}
        </li>
      </ul>
      <div className='card-body'>
        <b>Geolocation:</b>
        <p>
          Lat: <span>{weatherObj.geo.lat}</span>, Lon:{" "}
          <span>{weatherObj.geo.lon}</span>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
