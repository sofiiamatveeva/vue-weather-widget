import { CommonWeatherInfo, ForecastComponentData, WeatherComponentWind } from "./weather.interfaces";
import WeatherService from "@/services/weather.service";
import LocationService from "@/services/location.service";

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

export interface SettingsTabData {
  inputCity: string;
	selectedCity: string;
	addDisabled: boolean;
  autocompleteList: string[];
  locationService: LocationService;
}

export interface State {
  citiesList: string[];
}

export interface WeatherWidgetData {
  cities: string[];
  isSettingsMode: boolean;
  askForLocation: boolean;
  locationService: LocationService;
}