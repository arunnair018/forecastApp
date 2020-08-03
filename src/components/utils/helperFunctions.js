/* 
function to get weather for the day.
return weather orderwise.
for example if there's chance of rain return rain.
*/
export const getWeather = (arr) => {
  if (arr.includes("Snow")) {
    return ["Snowy", "wi wi-snowflake-cold"];
  }
  if (arr.includes("Rain")) {
    return ["Rainy", "wi wi-rain"];
  }
  if (arr.includes("Clouds")) {
    return ["Cloudy", "wi wi-cloudy"];
  }
  return ["Sunny", "wi wi-day-sunny"];
};

// function to process raw data to weather object
export const weather = (data, info) => {
  let weatherarr = data.map((item) => item.weather[0].main);
  console.log(weatherarr)
  let [weather, weather_icon] = getWeather(weatherarr);
  let low = (
    data.reduce((accum, item) => accum + item.main.temp_min, 0) / 8
  ).toFixed(2);
  let high = (
    data.reduce((accum, item) => accum + item.main.temp_max, 0) / 8
  ).toFixed(2);
  let humidity = (
    data.reduce((accum, item) => accum + item.main.humidity, 0) / 8
  ).toFixed(0);
  let geo = info.coord;
  let sunrise = new Date(info.sunrise * 1000).toLocaleTimeString();
  let sunset = new Date(info.sunset * 1000).toLocaleTimeString();
  let date = data[0].dt_txt
    .slice(0, 11)
    .split("-")
    .reverse()
    .join("-")
    .replace(" ", "");

  let weatherObj = {
    weather: weather,
    weather_icon: weather_icon,
    low: low,
    high: high,
    humidity: humidity,
    geo: geo,
    sunrise: sunrise,
    sunset: sunset,
    date: date,
  };
  return weatherObj;
};
