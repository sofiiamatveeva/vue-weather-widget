import axios, { AxiosResponse } from "axios";
import {
  BASE_GEO_URL,
  BASE_WEATHER_URL,
  GEO_LIST_LIMIT,
  WEATHER_UNITS,
} from "@/constants/api.constant";
import { WeatherApiResponse } from "@/interfaces/weather.interfaces";
import { LocationInfo } from "@/interfaces/location.interfaces";

export default class ApiService {
  private _getWeatherUrl: string = BASE_WEATHER_URL;
  private _getGeoInfoUrl: string = BASE_GEO_URL;
  private _apiKey = "c46753eb451a07012130f506fff5f978";
  private _weatherDataUnits: string = WEATHER_UNITS;

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

  public getGeoInfo(cityName: string): Promise<AxiosResponse<LocationInfo[]>> {
    const params = new URLSearchParams();

    params.set("q", cityName);
    params.set("limit", GEO_LIST_LIMIT.toString());
    params.set("appid", this._apiKey);

    const url = this._urlFactory(this._getGeoInfoUrl, params);

    return axios.get<LocationInfo[]>(url);
  }

  private _urlFactory(url: string, params: URLSearchParams): string {
    return `${url}?${params.toString()}`;
  }
}
