import React, { useState } from "react";
import { Input, Popup } from "./components";

import "./index.css";
import { useFetchWeather } from "./hooks";
import { getNameTemperature } from "./utils";
import { TemperatureValue } from "./interfaces";
import WeatherDisplay from "./WeatherDisplay";

function App() {
  const [cityName, setCityName] = useState<string>("");
  const { weather, statusCode, isLoading } = useFetchWeather(cityName);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [temperatureCurrent, setTemperatureCurrent] =
    useState<TemperatureValue>("f");

  const onChangeCityName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };

  return (
    <div className="container flex-center">
      <div className="tool flex-center">
        <Input
          type="text"
          value={cityName}
          onChange={(event) => onChangeCityName(event)}
          placeholder="Search for location"
        />
        <div className="btn-wrap-tool">
          <div
            className="btn flex-center pointer"
            onClick={() => setIsShowPopup(!isShowPopup)}
          >
            °{getNameTemperature(temperatureCurrent)}
          </div>
          <Popup
            stateValue={temperatureCurrent}
            setStateValue={setTemperatureCurrent}
            isShowPopup={isShowPopup}
            setIsShowPopup={setIsShowPopup}
          />
        </div>
      </div>
      {isLoading ? (
        "Loading...."
      ) : (
        <WeatherDisplay
          weather={weather}
          statusCode={statusCode}
          temperatureCurrent={temperatureCurrent}
        />
      )}
    </div>
  );
}

export default App;
