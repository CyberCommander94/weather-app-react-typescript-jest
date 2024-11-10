import "./weather-detailed-info.scss";
import SearchInput from "../SearchInput/SearchInput";
import Tabs from "../Tabs/Tabs";
import MainWeatherTab from "./MainWeatherTab/MainWeatherTab";
import WeatherForecastTab from "./WeatherForecastTab/WeatherForecastTab";
import { MainWeather } from "../../interfaces/CurrentWeatherResponse";
import { WeatherForecastResponse } from "../../interfaces/WeatherForecastResponse";

interface WeatherDetailedInfoData extends MainWeather {
  wind: number | undefined;
  clouds: number | undefined;
}

interface WeatherDetailedInfoProps {
  currentWeather: WeatherDetailedInfoData | null;
  weatherForecast: WeatherForecastResponse | null;
  handleInputChange: (value: string) => void;
}

const WeatherDetailedInfo: React.FC<WeatherDetailedInfoProps> = ({
  currentWeather,
  weatherForecast,
  handleInputChange,
}) => {
  return (
    <div className={`weather-detailed-info ${currentWeather && weatherForecast ? " with-background" : ""}`}>
      <div className="weather-detailed-info__search-input-wrapper">
        <SearchInput onChange={handleInputChange}></SearchInput>
      </div>
      {currentWeather && weatherForecast && (
        <Tabs>
          <MainWeatherTab
            currentWeather={currentWeather}
            label="Current weather"
          ></MainWeatherTab>
          <WeatherForecastTab
            weatherForecast={weatherForecast}
            label="Weather forecast"
          ></WeatherForecastTab>
        </Tabs>
      )}
    </div>
  );
};

export default WeatherDetailedInfo;
