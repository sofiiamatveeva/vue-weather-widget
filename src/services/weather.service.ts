import { AxiosResponse } from "axios";
import ApiService from "./api.service";
import { WeatherApiResponse } from "@/interfaces/interfaces";

export default class WeatherService {
  constructor(private _apiService: ApiService) {}

  public async getWeatherByCoordinates(
    latitude: number,
    longitude: number
  ): Promise<AxiosResponse<WeatherApiResponse>> {
    try {
      const weather = await this._apiService.getWeatherData(
        latitude,
        longitude
      );
      return weather;
    } catch (error) {
      console.error("An error occured");
      throw new Error("Get weather request error");
    }
  }
}
