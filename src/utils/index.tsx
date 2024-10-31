import { Temperature, TemperatureValue } from "../interfaces";
import { WEATHER_SETTINGS } from "../mocks";

export const convertTemperature = (type: TemperatureValue, value: number) => {
  if (type === "c") {
    return (value - 273.15).toFixed(0);
  }
  return (((value - 273.15) * 9) / 5 + 32).toFixed(0);
};

export const getNameTemperature = (value: TemperatureValue) => {
  return WEATHER_SETTINGS.find(
    (weatherSetting: Temperature) => weatherSetting.value === value
  )?.value.toLocaleUpperCase();
};
