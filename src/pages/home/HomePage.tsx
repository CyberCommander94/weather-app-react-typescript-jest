import "./home-page.scss"
import api from '../../services/api'
import { useState, useEffect, useCallback } from 'react';
import { CurrentWeatherResponse } from '../../interfaces/CurrentWeatherResponse'
import { ApiError } from '../../types/Api';

import AppHeader from '../../components/AppHeader/AppHeader';
import WeatherDetailedInfo from '../../components/WeatherDetailedInfo/WeatherDetailedInfo';

import clear from "../../assets/images/bg/clear.jpg"
import clearNight from "../../assets/images/bg/clear-night.jpg"
import clouds from "../../assets/images/bg/clouds.jpg"
import cloudsNight from "../../assets/images/bg/clouds-night.jpg"
import brokenClouds from "../../assets/images/bg/broken-clouds.jpg"
import mist from "../../assets/images/bg/mist.jpg"
import rain from "../../assets/images/bg/rain.jpg"
import thunderstorm from "../../assets/images/bg/thunderstorm.jpg"
import snow from "../../assets/images/bg/snow.jpg"

const backgroundImages = [
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
  time: string,
  dayOfWeek: string,
  day: string,
  month: string,
  year: string
};

const HomePage = () => {
  const [currentCity, setCurrentCity] = useState<string>('Zhytomyr');
  const [currentImageIndex, setCurrentImageIndex] = useState(2);
  const [currentDateTime, setCurrentDateTime] = useState<DateTimeInfo>({
    time: '',
    dayOfWeek: '',
    day: '',
    month: '',
    year: ''
  });
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResponse | null>(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [error, setError] = useState<ApiError>(null);

  const updateDateTime = useCallback(() => {
    const date = new Date();
    setCurrentDateTime({
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: 'long' }),
      day: String(date.getDate()),
      month: date.toLocaleDateString("en-US", { month: 'long' }),
      year: String(date.getFullYear())
    });
  }, []);

  const fetchCurrentWeather = useCallback(async (city: string) => {
    try {
      const response = await api.get('/data/2.5/weather', { q: city });
      setCurrentWeather(response.data);
      updateDateTime();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  }, [updateDateTime]);

  const fetchWeatherForecast = useCallback(async () => {
    if (!currentWeather?.coord) return;
    try {
      const response = await api.get('/data/2.5/forecast', {
        lat: currentWeather.coord.lat,
        lon: currentWeather.coord.lon
      });
      setWeatherForecast(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  }, [currentWeather]);

  // const getBackgroundImage = () => {
  //   const weatherCondition = currentWeather?.weather?.[0]?.main || "Clear";
  //   return backgroundImages[weatherCondition] || backgroundImages.Clear;
  // };

  useEffect(() => {
    fetchCurrentWeather(currentCity);
  }, [currentCity, fetchCurrentWeather]);

  useEffect(() => {
    if (currentWeather) {
      fetchWeatherForecast();
    }
  }, [currentWeather, fetchWeatherForecast]);

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
      className="content-wrapper"
    >
      <AppHeader />
      <section className="content-wrapper__short-info">
        <div className="info-wrapper">
          <span className="temp">
            {currentWeather?.main?.temp ? Math.round(currentWeather.main.temp) : 'N/A'}&deg;
          </span>
          <div>
            <span className="city">{currentWeather?.name || 'Unknown City'}</span>
            <div className="time">
              {`${currentDateTime.time} - ${currentDateTime.dayOfWeek}, ${currentDateTime.day} ${currentDateTime.month} ${currentDateTime.year}`}
            </div>
          </div>
        </div>
      </section>
      {currentWeather && <WeatherDetailedInfo
          currentWeather={{
            clouds: currentWeather.clouds.all,
            wind: currentWeather.wind.speed,
            ...currentWeather.main }
          }
          description={currentWeather.weather?.[0].description}
        />
      }
    </div>
  );
};

export default HomePage;
