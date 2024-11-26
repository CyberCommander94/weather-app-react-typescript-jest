import "./weather-forecast-tab.scss"
import { WeatherForecastResponse, WeatherForecastItem } from '../../../interfaces/WeatherForecastResponse'
import Tabs from '../../Tabs/Tabs';
import WeatherForecastTabItem from './WeatherForecastItem/WeatherForecastTabItem';

interface WeatherForecastTabProps {
  weatherForecast: WeatherForecastResponse;
  label: string;
}

const WeatherForecastTab: React.FC<WeatherForecastTabProps> = ({ weatherForecast }) => {
  const groupedForecastInfo: WeatherForecastItem[][] = [];

  function prepareWeatherForecastGroups(elements: WeatherForecastResponse) {
    let currentDay: string;
    let currentGroupIndex = 0;
    elements.list.forEach((elem) => {
      if (!currentDay || currentDay !== elem.dt_txt.slice(0, 10) ) {
        if (currentDay) {
          currentGroupIndex = currentGroupIndex + 1;
        }
        currentDay = elem.dt_txt.slice(0, 10);
        groupedForecastInfo[currentGroupIndex] = [];
      }
      groupedForecastInfo[currentGroupIndex].push(elem);
    })
  };

  prepareWeatherForecastGroups(weatherForecast);

  const forecastTabs = groupedForecastInfo.map((elem) => {
    let label: string[] = elem[0].dt_txt.slice(0, 10).split('-');
    let tabButtonContent = (
    <div>
      <div>{label[0]}</div>
      <div>{label[1]}</div>
      <div>{label[2]}</div>
    </div>)
    return <WeatherForecastTabItem key={elem[0].dt_txt} items={elem} label={tabButtonContent}></WeatherForecastTabItem>
  })

  return (
    <div>
      <Tabs>
        {forecastTabs}
      </Tabs>
    </div>
  );
};

export default WeatherForecastTab;
