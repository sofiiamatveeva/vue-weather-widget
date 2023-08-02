import axios, { AxiosResponse } from "axios";
import {
  BASE_FORECAST_URL,
  BASE_GEO_REVERSE_URL,
  BASE_GEO_URL,
  BASE_WEATHER_URL,
  GEO_LIST_LIMIT,
  ICON_URL,
  WEATHER_UNITS,
} from "@/constants/api.constant";
import {
  ForecastApiResponse,
  WeatherApiResponse,
} from "@/interfaces/weather.interfaces";
import { LocationInfo } from "@/interfaces/location.interfaces";

export default class ApiService {
  private _getWeatherUrl: string = BASE_WEATHER_URL;
  private _getGeoInfoUrl: string = BASE_GEO_URL;
  private _apiKey = "83bbbb38810d5047746bc6760a82aa2e";
  private _weatherDataUnits: string = WEATHER_UNITS;
  private _weatherForecastUrl: string = BASE_FORECAST_URL;
  private _iconLink: string = ICON_URL;
  private _getReverseGeoInfoUrl: string = BASE_GEO_REVERSE_URL;
  private _geoListLimit: number = GEO_LIST_LIMIT;

  public getWeatherData(
    cityName: string
  ): Promise<AxiosResponse<WeatherApiResponse>> {
    const params = new URLSearchParams();

    params.set("q", cityName);
    params.set("units", this._weatherDataUnits);
    params.set("appid", this._apiKey);

    const url = this._urlFactory(this._getWeatherUrl, params);

    return axios.get<WeatherApiResponse>(url);
  }

  public getCityNameByLocation(
    lon: number,
    lat: number
  ): Promise<AxiosResponse<LocationInfo[]>> {
    const params = new URLSearchParams();

    params.set("lon", lon.toString());
    params.set("lat", lat.toString());
    params.set("limit", this._geoListLimit.toString());
    params.set("appid", this._apiKey);

    const url = this._urlFactory(this._getReverseGeoInfoUrl, params);

    return axios.get<LocationInfo[]>(url);
  }

  public getGeoInfo(cityName: string): Promise<AxiosResponse<LocationInfo[]>> {
    const params = new URLSearchParams();

    params.set("q", cityName);
    params.set("limit", this._geoListLimit.toString());
    params.set("appid", this._apiKey);

    const url = this._urlFactory(this._getGeoInfoUrl, params);

    return axios.get<LocationInfo[]>(url);
  }

  public getWeatherForecastData(
    cityName: string
  ): Promise<AxiosResponse<ForecastApiResponse>> {
    const params = new URLSearchParams();

    params.set("q", cityName);
    params.set("units", this._weatherDataUnits);
    params.set("appid", this._apiKey);

    const url = this._urlFactory(this._weatherForecastUrl, params);

    return axios.get<ForecastApiResponse>(url);
  }

  public createIconLink(iconId: string, scale: string): string {
    const iconLink =
      scale === "" ? this._iconLink.replace("@", "") : this._iconLink;
    return iconLink.replace("{iconId}", iconId).replace("{scale}", scale);
  }

  private _urlFactory(url: string, params: URLSearchParams): string {
    return `${url}?${params.toString()}`;
  }
}
