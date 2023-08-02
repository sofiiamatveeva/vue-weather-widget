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
            <span class="text-4xl">
              {{ Math.floor(commonInfo.degrees) }} &#176;C</span
            >
            <span class="text-xs">
              Feels like: {{ Math.floor(commonInfo.feelsLike) }} &#176;C
            </span>
          </p>
        </div>
        <div class="grid grid-cols-2 justify-around">
          <p title="Wind" class="flex w-22 ml-4 hover:text-blue-400">
            <span
              class="origin-center"
              :style="{ transform: 'rotate(' + wind.direction + 'deg)' }"
            >
              <Icon icon="wi:direction-up" width="24" height="24" />
            </span>
            <span class="ml-2">{{ wind.speed.toFixed(1) }}</span>
            <span class="leading-6 ml-1"> km/h</span>
          </p>
          <p title="Pressure" class="flex w-22 ml-4 hover:text-blue-400">
            <Icon class="mr-2" icon="carbon:pressure" width="24" height="24" />
            {{ pressure }}
            <span class="leading-6 ml-1">pHa</span>
          </p>
        </div>
        <div class="grid grid-cols-2 justify-around mt-6">
          <p title="Humidity" class="flex w-22 ml-4 hover:text-blue-400">
            <Icon
              class="mr-2"
              icon="carbon:humidity-alt"
              width="24"
              height="24"
            />
            {{ humidity }}
            <span class="leading-6 ml-1">%</span>
          </p>
          <p title="Visibility" class="flex w-22 ml-4 hover:text-blue-400">
            <Icon
              class="mr-2"
              icon="icons8:binoculars"
              width="24"
              height="24"
            />
            {{ visibility / 1000 }}
            <span class="leading-6 ml-1">km</span>
          </p>
        </div>
        <p class="flex justify-center capitalize mt-3">
          {{ commonInfo.sky }}.
          {{ commonInfo.description }}
        </p>
      </div>
      <footer class="forecast-wrapper flex mt-6 overflow-x-auto">
        <div
          class="flex-1 grow-0 shrink-0 basis-1/4 justify-center px-1 pb-2 mx-3 text-xs"
          v-for="(forecastItem, index) in forecast"
          :key="index"
        >
          <img
            class="block m-0 p-0"
            alt="Forecast Icon"
            :src="forecastItem.iconLink"
          />
          <p class="text-center">
            {{ Math.floor(forecastItem.degrees) }}&#176;C
          </p>
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
import { useToast } from "vue-toast-notification";
import {
  ForecastComponentData,
  WeatherComponentData,
} from "@/interfaces/weather.interfaces";
import { CityWeatherData } from "@/interfaces/components.interfaces";
import WeatherService from "@/services/weather.service";
import { mapMutations } from "vuex";

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
      toastNotify: useToast(),
    };
  },
  created(): void {
    this.fetchWeather();
    this.fetchForecast();
  },
  methods: {
    ...mapMutations(["deleteCity"]),
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
          this.deleteCity(this.city);
          this.toastNotify.error("City not found");
          console.error(error);
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
        });
    },
  },
});
</script>
<style lang="scss">
.forecast-wrapper {
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgb(147 197 253);
  }
}
</style>
