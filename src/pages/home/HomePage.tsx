import "./home-page.scss";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api";
import { useState, useEffect, useCallback } from "react";
import { CurrentWeatherResponse } from "../../interfaces/CurrentWeatherResponse";
import { WeatherForecastResponse } from "../../interfaces/WeatherForecastResponse";
import { AxiosError } from "axios";

import { ToastContainer, toast } from "react-toastify";
import AppHeader from "../../components/AppHeader/AppHeader";
import WeatherDetailedInfo from "../../components/WeatherDetailedInfo/WeatherDetailedInfo";

import mainBg from "../../assets/images/bg/main-bg.jpg";
import clear from "../../assets/images/bg/clear.jpg";
import clearNight from "../../assets/images/bg/clear-night.jpg";
import clouds from "../../assets/images/bg/clouds.jpg";
import cloudsNight from "../../assets/images/bg/clouds-night.jpg";
import brokenClouds from "../../assets/images/bg/broken-clouds.jpg";
import mist from "../../assets/images/bg/mist.jpg";
import rain from "../../assets/images/bg/rain.jpg";
import thunderstorm from "../../assets/images/bg/thunderstorm.jpg";
import snow from "../../assets/images/bg/snow.jpg";

const weatherConditionsIcons = [
  {
    id: [800],
    bgIndexDay: 1,
    bgIndexNight: 2,
  },
  {
    id: [801, 802, 803],
    bgIndexDay: 5,
    bgIndexNight: 5,
  },
  {
    id: [804],
    bgIndexDay: 3,
    bgIndexNight: 4,
  },
  {
    id: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
    bgIndexDay: 6,
    bgIndexNight: 6,
  },
  {
    id: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
    bgIndexDay: 9,
    bgIndexNight: 9,
  },
  {
    id: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
    bgIndexDay: 8,
    bgIndexNight: 8,
  },
  {
    id: [
      300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511,
      520, 521, 522, 531,
    ],
    bgIndexDay: 7,
    bgIndexNight: 7,
  },
];

const backgroundImages = [
  mainBg,
  clear,
  clearNight,
  clouds,
  cloudsNight,
  brokenClouds,
  mist,
  rain,
  thunderstorm,
  snow,
];

type DateTimeInfo = {
  time: string;
  dayOfWeek: string;
  day: string;
  month: string;
  year: string;
};

const HomePage = () => {
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentDateTime, setCurrentDateTime] = useState<DateTimeInfo>({
    time: "",
    dayOfWeek: "",
    day: "",
    month: "",
    year: "",
  });
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);
  const [weatherForecast, setWeatherForecast] =
    useState<WeatherForecastResponse | null>(null);

  const updateDateTime = useCallback(() => {
    const date = new Date();
    setCurrentDateTime({
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
      day: String(date.getDate()),
      month: date.toLocaleDateString("en-US", { month: "long" }),
      year: String(date.getFullYear()),
    });
  }, []);

  const fetchCurrentWeather = useCallback(
    async (city: string) => {
      try {
        const response = await api.get("/data/2.5/weather", { q: city });
        setCurrentWeather(response.data);
        updateDateTime();
        const itemBg = weatherConditionsIcons.find((el) =>
          el.id.includes(response.data?.weather?.[0].id)
        );
        const currentTime = new Date().getHours();
        const bgIndex =
          currentTime > 6 && currentTime < 20
            ? itemBg?.bgIndexDay
            : itemBg?.bgIndexNight;
        setCurrentImageIndex(bgIndex || 0);
      } catch (err) {
        showErrorToast(
          err instanceof AxiosError
            ? err?.response?.data.message
            : "An unexpected error occurred"
        );
      }
    },
    [updateDateTime]
  );

  const fetchWeatherForecast = useCallback(async () => {
    if (!currentWeather?.coord) return;
    try {
      const response = await api.get("/data/2.5/forecast", {
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon,
      });
      setWeatherForecast(response.data);
    } catch (err) {
      showErrorToast(
        err instanceof AxiosError
          ? err?.response?.data.message
          : "An unexpected error occurred"
      );
    }
  }, [currentWeather]);

  useEffect(() => {
    backgroundImages.forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  useEffect(() => {
    if (currentCity.length) {
      fetchCurrentWeather(currentCity);
    }
  }, [currentCity, fetchCurrentWeather]);

  useEffect(() => {
    if (currentWeather) {
      fetchWeatherForecast();
    }
  }, [currentWeather, fetchWeatherForecast]);

  const showErrorToast = (message: string) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
      className="content-wrapper"
    >
      <ToastContainer />
      <AppHeader />
      <section className="content-wrapper__short-info">
        {currentCity && currentWeather ? (
          <div className="info-wrapper">
            <div className="info-wrapper__main-wrapper">
              <span className="info-wrapper__temp">
                {currentWeather?.main?.temp &&
                  Math.round(currentWeather.main.temp)}
                &deg;
              </span>
              <div>
                <span className="info-wrapper__city">
                  {currentWeather?.name}
                </span>
                <div className="info-wrapper__time">
                  {`${currentDateTime.time} - ${currentDateTime.dayOfWeek}, ${currentDateTime.day} ${currentDateTime.month} ${currentDateTime.year}`}
                </div>
              </div>
            </div>
            <p className="info-wrapper__description">
              {currentWeather?.weather?.[0].description}
            </p>
          </div>
        ) : (
          <div className="info-wrapper">
            <p className="info-wrapper__welcome-text">Welcome to free<br></br><span>Weather Web App</span></p>
            <p className="info-wrapper__welcome-description">
              Just write the name of your city in the search field,<br></br>
              and enjoy the latest weather information...
            </p>
          </div>
        )}
      </section>
      <WeatherDetailedInfo
        currentWeather={{
          clouds: currentWeather?.clouds.all,
          wind: currentWeather?.wind.speed,
          ...currentWeather?.main,
        }}
        weatherForecast={weatherForecast}
        handleInputChange={setCurrentCity}
      />
    </div>
  );
};

export default HomePage;
