import "./weather-forecast-tab-item.scss"
import { WeatherForecastItem } from "../../../../interfaces/WeatherForecastResponse"
import clearDay from "../../../../assets/images/icons/clear-day.svg"
import clearNight from "../../../../assets/images/icons/clear-night.svg"
import brokenCloudsDay from "../../../../assets/images/icons/broken-clouds-day.svg"
import brokenCloudsNight from "../../../../assets/images/icons/broken-clouds-night.svg"
import cloudy from "../../../../assets/images/icons/cloudy.svg"
import mistDay from "../../../../assets/images/icons/mist-day.svg"
import mistNight from "../../../../assets/images/icons/mist-night.svg"
import snowDay from "../../../../assets/images/icons/snow-day.svg"
import snowNight from "../../../../assets/images/icons/snow-night.svg"
import thunderstormDay from "../../../../assets/images/icons/thunderstorm-day.svg"
import thunderstormNight from "../../../../assets/images/icons/thunderstorm-night.svg"
import rainDay from "../../../../assets/images/icons/rain-day.svg"
import rainNight from "../../../../assets/images/icons/rain-night.svg"

interface WeatherForecastTabItemProps {
  items: WeatherForecastItem[];
  label: React.ReactElement;
}

const weatherConditionsIcons = [
  {
    id: [800],
    iconDay: clearDay,
    iconNight: clearNight,
  },
  {
    id: [801, 802, 803],
    iconDay: brokenCloudsDay,
    iconNight: brokenCloudsNight,
  },
  {
    id: [804],
    iconDay: cloudy,
    iconNight: cloudy,
  },
  {
    id: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    iconDay: mistDay,
    iconNight: mistNight,
  },
  {
    id: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    iconDay: snowDay,
    iconNight: snowNight,
  },
  {
    id: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    iconDay: thunderstormDay,
    iconNight: thunderstormNight,
  },
  {
    id: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
    iconDay: rainDay,
    iconNight: rainNight,
  }
];

const WeatherForecastTabItem: React.FC<WeatherForecastTabItemProps> = ({ items, label }) => {

  let elments = items.map((elem) => {
    const itemIcon = weatherConditionsIcons.find((el) => el.id.includes(elem?.weather?.[0].id));
    const currentTime = new Date().getHours()
    return (
    <div key={elem.dt_txt} className="weather-forecast-tab-item">
      <div className="weather-forecast-tab-item__left-value">
        <img src={currentTime > 6 && currentTime < 20 ? itemIcon?.iconDay : itemIcon?.iconNight} alt="Weather condition icon" className="weather-forecast-tab-item__icon" />
        <div className="weather-forecast-tab-item__condition-wrapper">
          <span>{elem.dt_txt.slice(11, 16)}</span>
          <span className="weather-forecast-tab-item__condition-description">{elem?.weather?.[0].description}</span>
        </div>
      </div>
      <div className="weather-forecast-tab-item__right-value">{Math.round(elem.main.temp)} °C</div>
    </div>)
  })
  return (<div>
    {elments}
  </div>);
};

export default WeatherForecastTabItem;
