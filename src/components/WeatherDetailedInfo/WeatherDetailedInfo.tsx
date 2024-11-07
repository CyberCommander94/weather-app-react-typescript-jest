import "./weather-detailed-info.scss"
import SearchInput from '../SearchInput/SearchInput';
import InfoTabs from '../InfoTabs/InfoTabs';
import WeatherDetailedInfoItem from './WeatherDetailedInfoItem/WeatherDetailedInfoItem';
import { MainWeather } from '../../interfaces/CurrentWeatherResponse'

interface WeatherDetailedInfoData extends MainWeather {
  wind: number;
  clouds: number;
}

interface WeatherDetailedInfoProps {
  currentWeather: WeatherDetailedInfoData;
  description: string;
}

const WeatherDetailedInfo: React.FC<WeatherDetailedInfoProps> = ({ currentWeather, description }) => {
  const WeatherDetailedInfoItems = Object.entries(currentWeather).map((prop) =>
    <WeatherDetailedInfoItem key={prop[0]} property={prop[0]} value={prop[1]} />
  );

  return (
    <div className="weather-detailed-info">
      <div className="weather-detailed-info__search-input-wrapper">
        <SearchInput></SearchInput>
        <InfoTabs></InfoTabs>
        <div className="box details">
          <p className="weather-detailed-info__weather-description">{description}</p>
          <div className="weather-detailed-info__items-wrapper">
            {WeatherDetailedInfoItems}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetailedInfo;
