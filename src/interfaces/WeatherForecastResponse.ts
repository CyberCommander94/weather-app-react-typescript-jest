export interface WeatherForecastResponse {
  list: Array<WeatherForecastItem>
}

export interface WeatherForecastItem {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: Main;
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: Weather[];
  wind: Wind;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf: number;
}
