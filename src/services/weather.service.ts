import { ICON_URL } from "@/constants/api.constant";
import ApiService from "./api.service";
import { WeatherComponentData } from "@/interfaces/weather.interfaces";

export default class WeatherService {
  private _apiService!: ApiService;

  constructor() {
    this._apiService = new ApiService();
  }

  public async getWeatherByCity(
    cityName: string
  ): Promise<WeatherComponentData> {
    try {
      const weather = await this._apiService.getWeatherData(cityName);

      const handledWeatherData = {
        commonInfo: {
          cityName: weather.data.name,
          country: weather.data.sys.country,
          degrees: weather.data.main.temp,
          feelsLike: weather.data.main.feels_like,
          sky: weather.data.weather[0].main,
          description: weather.data.weather[0].description,
          iconLink: ICON_URL.replace("{iconId}", weather.data.weather[0].icon),
        },
        pressure: weather.data.main.pressure,
        humidity: weather.data.main.humidity,
        visibility: weather.data.visibility,
        wind: {
          speed: weather.data.wind.speed,
          direction: weather.data.wind.deg,
        },
      };

      return handledWeatherData;
    } catch (error) {
      console.error("An error occured");
      throw new Error("Get weather request error");
    }
  }
}
