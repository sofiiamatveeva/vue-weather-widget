import axios, { AxiosResponse } from "axios";
import { BASE_GEO_URL, BASE_WEATHER_URL } from "@/constants/api.constant";
import { WeatherApiResponse } from "@/interfaces/weather.interfaces";
import { LocationInfo } from "@/interfaces/location.interfaces";

export default class ApiService {
  private _getWeatherUrl: string = BASE_WEATHER_URL;
  private _getGeoInfoUrl: string = BASE_GEO_URL;
  private _apiKey = "c46753eb451a07012130f506fff5f978";

  public getWeatherData(
    cityName: string
  ): Promise<AxiosResponse<WeatherApiResponse>> {
    const params = new URLSearchParams();

    params.set("q", cityName);
    params.set("appid", this._apiKey);

    const url = `${this._getWeatherUrl}?${params.toString()}`;

    return axios.get<WeatherApiResponse>(url);
  }

  public getGeoInfo(cityName: string): Promise<AxiosResponse<LocationInfo[]>> {
    const params = new URLSearchParams();

    params.set("q", cityName);
    params.set("appid", this._apiKey);

    const url = `${this._getGeoInfoUrl}?${params.toString()}`;

    return axios.get<LocationInfo[]>(url);
  }
}
