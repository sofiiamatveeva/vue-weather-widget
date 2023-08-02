import { CommonWeatherInfo, ForecastComponentData, WeatherComponentWind } from "./weather.interfaces";
import WeatherService from "@/services/weather.service";
import LocationService from "@/services/location.service";
import { ToastPluginApi } from "vue-toast-notification";

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
  toastNotify: ToastPluginApi;
}

export interface SettingsTabData {
  inputCity: string;
	selectedCity: string;
	addDisabled: boolean;
  autocompleteList: string[];
  listCityIndex: number;
  locationService: LocationService;
}

export interface State {
  citiesList: string[];
}

export interface WeatherWidgetData {
  isSettingsMode: boolean;
  askForLocation: boolean;
  locationService: LocationService;
  toastNotify: ToastPluginApi;
}