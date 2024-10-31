import { useEffect, useRef } from "react";
import { Temperature, TemperatureValue } from "../../interfaces"; // => this one i can use craco to optimize path but in requirement don't accept out lib.
import { WEATHER_SETTINGS } from "../../mocks"; // => this one i can use craco to optimize path but in requirement don't accept out lib.


interface PropsPopup {
  stateValue: string | number;
  setStateValue: (e: TemperatureValue) => void;
  setIsShowPopup: (e: boolean) => void;
  isShowPopup: boolean;
}

const Popup = ({
  stateValue,
  setStateValue,
  setIsShowPopup,
  isShowPopup,
}: PropsPopup) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setIsShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsShowPopup]);

  if (!isShowPopup) {
    return <div></div>;
  }

  return (
    <div ref={divRef} className="popup">
      <h3>Weather settings</h3>
      <ul className="temperature-list">
        {WEATHER_SETTINGS.map((temperature: Temperature, index: number) => {
          return (
            <li
              className={`${
                stateValue === temperature.value ? "active" : ""
              } pointer`}
              key={`${temperature.value}_${index}`}
              onClick={() => setStateValue(temperature.value)}
            >
              {temperature.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Popup;
