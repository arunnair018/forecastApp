import React from "react";
import { weather } from "../utils/helperFunctions";

const Jumbo = (props) => {
  // process data and get weather object
  let weatherObj = weather(props.data, props.info);
  let day = props.day || "Today's";

  // return JSX
  return (
    <div className='jumbotron'>
      <span className='jumbodate'>{weatherObj.date}</span>
      <h4 className=''>{`${day} Weather`}</h4> in &nbsp;
      <b>{props.info.name}</b>
      <h1 className='display-6'>
        {weather} <i className={weatherObj.weather_icon}></i>
      </h1>
      <hr className='my-4' />
      <p>
        <span className='jumbo'>
          <b>High Temperature: </b>
          {weatherObj.high} &#8451;
        </span>
        <span className='jumbo'>
          <b>Low Temperature: </b>
          {weatherObj.low} &#8451;
        </span>
        <span className='jumbo'>
          <b>Humidity: </b>
          {weatherObj.humidity}%
        </span>
        <span className='jumbo'>
          <b>Sunrise: </b>
          {weatherObj.sunrise}
        </span>
        <span className='jumbo'>
          <b>Sunset: </b>
          {weatherObj.sunset}
        </span>
        <span className='jumbo'>
          <b>Geolocation: </b>
          Lat: <span>{weatherObj.geo.lat}</span>, Lon:{" "}
          <span>{weatherObj.geo.lon}</span>
        </span>
      </p>
    </div>
  );
};

export default Jumbo;
