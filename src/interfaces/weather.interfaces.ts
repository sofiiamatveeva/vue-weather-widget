export interface Coordinates {
  lon: number;
  lat: number;
}

export interface WeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherDetails {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface WindDetails {
  speed: number;
  deg: number;
  gust: number;
}

export interface RainData {
  "1h": number;
}

export interface CloudsData {
  all: number;
}

export interface SystemInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherApiResponse {
  coord: Coordinates;
  weather: WeatherData[];
  base: string;
  main: WeatherDetails;
  visibility: number;
  wind: WindDetails;
  rain: RainData;
  clouds: CloudsData;
  dt: number;
  sys: SystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface CommonWeatherInfo {
  country: string;
  cityName: string;
  degrees: number;
  feelsLike: number;
  sky: string;
  description: string;
  iconLink: string;
}

export interface WeatherComponentWind {
  speed: number;
  direction: number;
}

export interface WeatherComponentData {
  commonInfo: CommonWeatherInfo;
  pressure: number;
  humidity: number;
  visibility: number;
  wind: WeatherComponentWind;
}