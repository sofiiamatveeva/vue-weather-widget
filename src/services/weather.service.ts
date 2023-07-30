import { AxiosResponse } from "axios";
import ApiService from "./api.service";
import { WeatherApiResponse } from "@/interfaces/weather.interfaces";

export default class WeatherService {
  constructor(private _apiService: ApiService) {}

  public async getWeatherByCoordinates(
    cityName: string
  ): Promise<AxiosResponse<WeatherApiResponse>> {
    try {
      const weather = await this._apiService.getWeatherData(cityName);
      return weather;
    } catch (error) {
      console.error("An error occured");
      throw new Error("Get weather request error");
    }
  }
}
