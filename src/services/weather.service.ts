import ApiService from "./api.service";
import { WeatherApiResponse } from "@/interfaces/weather.interfaces";

export default class WeatherService {
  private _apiService!: ApiService;

  constructor() {
    this._apiService = new ApiService();
  }

  public async getWeatherByCity(cityName: string): Promise<WeatherApiResponse> {
    try {
      const weather = await this._apiService.getWeatherData(cityName);
      return weather.data;
    } catch (error) {
      console.error("An error occured");
      throw new Error("Get weather request error");
    }
  }
}
