import { LocationInfo } from "@/interfaces/location.interfaces";
import ApiService from "./api.service";

export default class LocationService {
  private _apiService!: ApiService;

  constructor() {
    this._apiService = new ApiService();
  }

  public async getCitiesList(query: string): Promise<string[]> {
    try {
      const cities = await this._apiService.getGeoInfo(query);
      const citiesList = cities.data.map(
        (location: LocationInfo) => location.name
      );

      return Array.from(new Set(citiesList));
    } catch (error) {
      console.error("An error occured");
      throw new Error("Get weather request error");
    }
  }
}
