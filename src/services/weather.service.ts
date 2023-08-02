import { MAIN_ICON_SCALE } from "@/constants/api.constant";
import {
  ForecastComponentData,
  ForecastItem,
  WeatherComponentData,
} from "@/interfaces/weather.interfaces";
import ApiService from "./api.service";
import { AxiosError } from "axios";

export default class WeatherService {
  private _apiService!: ApiService;
  private _mainIconScale: string = MAIN_ICON_SCALE;

  constructor() {
    this._apiService = new ApiService();
  }

  public async getWeatherByCity(
    cityName: string
  ): Promise<WeatherComponentData> {
    try {
      const weather = await this._apiService.getWeatherData(cityName);
      const iconLink = this._apiService.createIconLink(
        weather.data.weather[0].icon,
        this._mainIconScale
      );

      const handledWeatherData = {
        commonInfo: {
          cityName: weather.data.name,
          country: weather.data.sys.country,
          degrees: weather.data.main.temp,
          feelsLike: weather.data.main.feels_like,
          sky: weather.data.weather[0].main,
          description: weather.data.weather[0].description,
          iconLink: iconLink,
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
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async getForecastWeather(
    cityName: string
  ): Promise<ForecastComponentData[]> {
    try {
      const weather = await this._apiService.getWeatherForecastData(cityName);
      const handledForecastData: ForecastComponentData[] = [];

      weather.data.list.forEach((forecast: ForecastItem) => {
        const iconLink = this._apiService.createIconLink(
          forecast.weather[0].icon,
          ""
        );

        const forecastDate = new Date(forecast.dt_txt);

        const forecastInfo = {
          date: forecastDate.toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
          }),
          time: forecastDate.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          }),
          degrees: forecast.main.temp,
          iconLink: iconLink,
        };

        handledForecastData.push(forecastInfo);
      });

      return handledForecastData;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
