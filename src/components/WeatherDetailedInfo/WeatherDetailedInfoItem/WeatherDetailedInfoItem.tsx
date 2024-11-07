import "./weather-detailed-info-item.scss"

import temp from "../../../assets/images/icons/temp.svg"
import feels_like from "../../../assets/images/icons/feels-like.svg"
import temp_min from "../../../assets/images/icons/temp-min.svg"
import temp_max from "../../../assets/images/icons/temp-max.svg"
import pressure from "../../../assets/images/icons/pressure.png"
import humidity from "../../../assets/images/icons/humidity.svg"
import wind from "../../../assets/images/icons/wind.svg"
import clouds from "../../../assets/images/icons/cloudy.svg"


interface WeatherDetailedInfoItemProps {
  property: string;
  value: string;
}

type ItemsInfo = {
  [property: string]: {
    icon: string
    text: string
    unit: string
  }
}

const itemsInfo: ItemsInfo = {
  temp: {
    icon: temp,
    text: "Temp",
    unit: "°C",
  },
  feels_like: {
    icon: feels_like,
    text: "Feels like",
    unit: "°C",
  },
  temp_min: {
    icon: temp_min,
    text: "Temp min",
    unit: "°C",
  },
  temp_max: {
    icon: temp_max,
    text: "Temp max",
    unit: "°C",
  },
  wind: {
    icon: wind,
    text: "Wind speed",
    unit: "m/s",
  },
  humidity: {
    icon: humidity,
    text: "Humidity",
    unit: "%",
  },
  clouds: {
    icon: clouds,
    text: "Clouds",
    unit: "%",
  },
  pressure: {
    icon: pressure,
    text: "Pressure",
    unit: "hPa",
  },
  sea_level: {
    icon: pressure,
    text: "Sea pressure",
    unit: "hPa",
  },
  grnd_level: {
    icon: pressure,
    text: "Ground pressure",
    unit: "hPa",
  },
}

const WeatherDetailedInfo: React.FC<WeatherDetailedInfoItemProps> = ({ property, value }) => {
  console.log(property, value)
  return (
    <div className="weather-detailed-info-item">
      <span className="weather-detailed-info-item__name">{itemsInfo[property].text}</span>
      <div className="weather-detailed-info-item__value-wrapper">
        <span className="weather-detailed-info-item__value">
          {value}
          <span className="weather-detailed-info-item__unit">{itemsInfo[property].unit}</span>
        </span>
        <img src={itemsInfo[property].icon} alt="icon" className="weather-detailed-info-item__icon"/>
      </div>
    </div>
  );
}

export default WeatherDetailedInfo;
