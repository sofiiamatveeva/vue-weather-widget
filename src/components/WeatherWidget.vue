<template>
  <div class="w-80 m-6">
    <div
      class="grid gap-4 mb-10 animation-ping"
      v-if="!citiesList.length && askForLocation"
    >
      <p class="col-start-1 col-end-3 text-center">
        Do you want to allow app to access your location?
      </p>
      <button
        class="col-start-1 py-1 px-6 border rounded-lg bg-blue-200 hover:bg-blue-300"
        type="button"
        @click="getLocation(true)"
      >
        Yes
      </button>
      <button
        class="col-start-2 py-1 px-6 border rounded-lg hover:bg-blue-300"
        type="button"
        @click="getLocation(false)"
      >
        No
      </button>
    </div>
    <SettingsTab />
    <CityWeatherCard
      v-for="cityItem in citiesList"
      :key="cityItem"
      :city="cityItem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { WeatherWidgetData } from "@/interfaces/components.interfaces";
import LocationService from "@/services/location.service";
import CityWeatherCard from "./CityWeatherCard.vue";
import SettingsTab from "./SettingsTab.vue";

export default defineComponent({
  name: "WeatherWidget",
  components: {
    CityWeatherCard,
    SettingsTab,
  },
  data(): WeatherWidgetData {
    return {
      cities: [],
      isSettingsMode: false,
      askForLocation: true,
      locationService: new LocationService(),
    };
  },
  computed: {
    ...mapState(["citiesList"]),
  },
  mounted(): void {
    if (localStorage.citiesList && !this.citiesList.length) {
      const savedCitiesList = JSON.parse(localStorage.citiesList);

      savedCitiesList.forEach((city: string) => {
        this.addCity(city);
      });
    }
  },
  methods: {
    ...mapMutations(["addCity"]),
    getLocation(access: boolean): void {
      this.askForLocation = false;

      if (access) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lon = position.coords.longitude;
            const lat = position.coords.latitude;

            this.getCityNameByCoords(lon, lat);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    },
    getCityNameByCoords(lon: number, lat: number): void {
      this.locationService
        .getCitiesByCoordinates(lon, lat)
        .then((cities: string[]) => {
          const currentCity = cities[0];
          this.addCity(currentCity);
        })
        .catch((error) => {
          console.error(error);
          throw Error("An error of fetching cities list data occured");
        });
    },
  },
});
</script>
