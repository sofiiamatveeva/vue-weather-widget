import axios, { AxiosResponse } from "axios";
import { BASE_WEATHER_URL } from "@/constants/api.constant";
import { WeatherApiResponse } from "@/interfaces/interfaces";

export default class ApiService {
  private _getWeatherUrl: string = BASE_WEATHER_URL;
  private _apiKey = "c46753eb451a07012130f506fff5f978";

  public getWeatherData(
    latitude: string,
    longitude: string
  ): Promise<AxiosResponse<WeatherApiResponse>> {
    const params = new URLSearchParams();

    params.set("lat", latitude);
    params.set("lon", longitude);
    params.set("appid", this._apiKey);

    const url = `${this._getWeatherUrl}?${params.toString()}`;

    return axios.get<WeatherApiResponse>(url);
  }
}
