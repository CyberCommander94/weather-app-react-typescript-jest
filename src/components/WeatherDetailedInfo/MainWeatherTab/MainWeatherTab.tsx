import "./main-weather-tab.scss"
import { MainWeather } from '../../../interfaces/CurrentWeatherResponse'
import MainWeatherTabItem from './MainWeatherTabItem/MainWeatherTabItem';

interface MainWeatherTabProps {
  currentWeather: MainWeatherTabData;
  label: string;
}

interface MainWeatherTabData extends MainWeather {
  wind: number | undefined;
  clouds: number | undefined;
}

const MainWeatherTab: React.FC<MainWeatherTabProps> = ({ currentWeather }) => {
  const WeatherDetailedInfoItems = Object.entries(currentWeather).map((prop) =>
    <MainWeatherTabItem key={prop[0]} property={prop[0]} value={prop[1]} />
  );

  return (
    <div>
      <div>
        {WeatherDetailedInfoItems}
      </div>
    </div>
  );
};

export default MainWeatherTab;
