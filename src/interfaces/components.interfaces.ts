import WeatherService from "@/services/weather.service";
import { CommonWeatherInfo, ForecastComponentData, WeatherComponentWind } from "./weather.interfaces";

export interface CityWeatherData {
  commonInfo: CommonWeatherInfo;
  pressure: number;
  humidity: number;
  visibility: number;
  wind: WeatherComponentWind;
  forecast: ForecastComponentData[];
  weatherService: WeatherService;
	isLoadingWeather: boolean;
  isLoadingForecast: boolean;
}