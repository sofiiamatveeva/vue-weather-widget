<template>
  <div class="w-full min-h-[395px] border rounded-lg my-1.5 p-3">
    <div v-if="!isLoadingWeather && !isLoadingForecast">
      <header class="text-xl text-center">
        <p>
          {{ commonInfo.cityName }},
          {{ commonInfo.country }}
        </p>
      </header>
      <div>
        <div class="flex items-center justify-center">
          <img alt="Weather Icon" :src="commonInfo.iconLink" />
          <p class="flex flex-col">
            <span>{{ commonInfo.degrees }}</span>
            <span class="text-xs">Feels like: {{ commonInfo.feelsLike }}</span>
          </p>
        </div>
        <div class="flex justify-around">
          <p class="flex">
            <Icon icon="fluent-mdl2:wind-direction" width="24" height="24" />
            {{ wind.speed }} SSE
          </p>
          <p class="flex">
            <Icon
              icon="material-symbols:blood-pressure-outline-rounded"
              width="24"
              height="24"
            />
            {{ pressure }} pHa
          </p>
        </div>
        <div class="flex justify-around text-sm mt-6">
          <p>Humidity: {{ humidity }}</p>
          <p>Visibility: {{ visibility }}</p>
        </div>
        <p class="flex justify-center capitalize mt-3">
          {{ commonInfo.sky }}.
          {{ commonInfo.description }}
        </p>
      </div>
      <footer class="flex mt-6 overflow-x-auto">
        <div
          class="flex-1 grow-0 shrink-0 basis-1/4 justify-center px-1 mx-3 text-xs"
          v-for="(forecastItem, index) in forecast"
          :key="index"
        >
          <img
            class="block m-0 p-0"
            alt="Forecast Icon"
            :src="forecastItem.iconLink"
          />
          <p class="text-center">{{ forecastItem.degrees }}</p>
          <p class="text-center">{{ forecastItem.date }}</p>
          <p class="text-center">{{ forecastItem.time }}</p>
        </div>
      </footer>
    </div>
    <div
      class="flex min-h-[395px] items-center justify-center"
      v-if="isLoadingWeather || isLoadingForecast"
    >
      <Icon
        class="animate-bounce"
        icon="system-uicons:sun"
        width="100"
        height="100"
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";
import {
  ForecastComponentData,
  WeatherComponentData,
} from "@/interfaces/weather.interfaces";
import { CityWeatherData } from "@/interfaces/components.interfaces";
import WeatherService from "@/services/weather.service";

export default defineComponent({
  name: "CityWeatherCard",
  components: {
    Icon,
  },
  props: {
    city: {
      type: String,
    },
  },
  data(): CityWeatherData {
    return {
      commonInfo: {
        cityName: "",
        country: "",
        degrees: 0,
        feelsLike: 0,
        sky: "",
        description: "",
        iconLink: "",
      },
      pressure: 0,
      humidity: 0,
      visibility: 0,
      wind: {
        speed: 0,
        direction: 0,
      },
      forecast: [],
      weatherService: new WeatherService(),
      isLoadingWeather: true,
      isLoadingForecast: true,
    };
  },
  created(): void {
    this.fetchWeather();
    this.fetchForecast();
  },
  methods: {
    fetchWeather(): void {
      if (!this.city) return;

      this.weatherService
        .getWeatherByCity(this.city)
        .then((weather: WeatherComponentData) => {
          this.commonInfo = { ...weather.commonInfo };
          this.pressure = weather.pressure;
          this.humidity = weather.humidity;
          this.visibility = weather.visibility;
          this.wind = { ...weather.wind };
          this.isLoadingWeather = false;
        })
        .catch((error) => {
          console.error(error);
          throw Error("An error of fetching weather data occured");
        });
    },
    fetchForecast(): void {
      if (!this.city) return;

      this.weatherService
        .getForecastWeather(this.city)
        .then((forecast: ForecastComponentData[]) => {
          this.forecast = [...forecast];
          this.isLoadingForecast = false;
        })
        .catch((error) => {
          console.error(error);
          throw Error("An error of fetching weather data occured");
        });
    },
  },
});
</script>
