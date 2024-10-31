import { useCallback, useEffect, useState } from "react";
import { API_END_POINT, API_KEY } from "../config";
import { StatusCode, TIME_DEBOUNCE, WeatherData } from "../interfaces";

export const useFetchWeather = (cityName: string) => {
  const [weather, setWeather] = useState<WeatherData>({} as WeatherData);
  const [statusCode, setStatusCode] = useState<number>(StatusCode.Initial);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_END_POINT}/data/2.5/weather?q=${cityName
          .toLocaleLowerCase()
          .trimEnd()
          .trimStart()}&appid=${API_KEY}`
      );
      const data: WeatherData = await response.json();

      const statusCode = (() => {
        switch (+data.cod) {
          case StatusCode.Success:
            return StatusCode.Success;
          case StatusCode.NotFound:
            return StatusCode.NotFound;
          case StatusCode.BadRequest:
            return StatusCode.BadRequest;
          default:
            return StatusCode.Initial;
        }
      })();

      setStatusCode(statusCode);
      setWeather(
        statusCode === StatusCode.Success ? data : ({} as WeatherData)
      );
    } catch (error) {
      setStatusCode(0);
    } finally {
      setIsLoading(false);
    }
  }, [cityName]);

  useEffect(() => {
    let idDebounce: NodeJS.Timeout;
    if (cityName) {
      setIsLoading(true);
      idDebounce = setTimeout(() => {
        fetchData();
      }, TIME_DEBOUNCE);
    } else {
      setIsLoading(false);
      setWeather({} as WeatherData);
      setStatusCode(0);
    }

    return () => {
      clearTimeout(idDebounce);
    };
  }, [cityName, fetchData]);

  return {
    weather,
    statusCode,
    isLoading,
  };
};
