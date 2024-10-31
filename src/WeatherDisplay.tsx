import React from "react";
import { StatusCode, TemperatureValue, WeatherData } from "./interfaces";
import { convertTemperature, getNameTemperature } from "./utils";

import "./index.css";

interface PropsWeatherDisplay {
  temperatureCurrent: TemperatureValue;
  statusCode: number;
  weather: WeatherData;
}

const WeatherDisplay = React.memo(
  ({ temperatureCurrent, statusCode, weather }: PropsWeatherDisplay) => {
    if (statusCode === StatusCode.Initial) {
      return <h1>Please search location</h1>;
    }
    if (statusCode === StatusCode.NotFound) {
      return <h1>City not found</h1>;
    }
    if (statusCode === StatusCode.BadRequest) {
      return <h1>Nothing to geocode</h1>;
    }
    return (
      <div className="card flex-center">
        Temperature{" "}
        {convertTemperature(temperatureCurrent, weather.main.temp_min)}° ~{" "}
        {convertTemperature(temperatureCurrent, weather.main.temp_max)}°
        <div>
          <img
            id="wicon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          ></img>
          <h1>
            {convertTemperature(temperatureCurrent, weather.main.temp)}°
            {getNameTemperature(temperatureCurrent)}
          </h1>
        </div>
      </div>
    );
  }
);

export default WeatherDisplay;
