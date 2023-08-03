import { CommonWeatherInfo, ForecastComponentData, WeatherComponentWind } from "./weather.interfaces";

export interface CityWeatherData {
  commonInfo: CommonWeatherInfo;
  pressure: number;
  humidity: number;
  visibility: number;
  wind: WeatherComponentWind;
  forecast: ForecastComponentData[];
	isLoadingWeather: boolean;
  isLoadingForecast: boolean;
}

export interface SettingsTabData {
  inputCity: string;
	selectedCity: string;
	addDisabled: boolean;
  autocompleteList: string[];
  listCityIndex: number;
}

export interface State {
  citiesList: string[];
}

export interface WeatherWidgetData {
  isSettingsMode: boolean;
  askForLocation: boolean;
}