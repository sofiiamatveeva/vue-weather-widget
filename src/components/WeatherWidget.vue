<template>
  <div class="w-80 m-6 p-3 border rounded-lg">
    <header class="flex items-center h-14">
      <h1 v-if="!isSettingsMode" class="text-lg">Weather</h1>
      <h1 v-if="isSettingsMode" class="text-lg">Widget Settings</h1>
      <button
        class="ml-auto hover:text-blue-300"
        type="button"
        @click="isSettingsMode = !isSettingsMode"
      >
        <Icon icon="akar-icons:gear" width="30" height="30" />
      </button>
    </header>
    <div class="grid gap-4 mb-10" v-if="askForLocation">
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
    <div v-if="isSettingsMode">
      <SettingsTab />
    </div>
    <div v-if="!isSettingsMode">
      <CityWeatherCard
        v-for="cityItem in citiesList"
        :key="cityItem"
        :city="cityItem"
      />
      <div
        v-if="!citiesList.length && askForLocation"
        class="text-center text-blue-400"
      >
        <span class="font-bold">There are no chosen cities.</span> <br />
        <span>Add city in settings or allow access to your location.</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { Icon } from "@iconify/vue";
import { WeatherWidgetData } from "@/interfaces/components.interfaces";
import LocationService from "@/services/location.service";
import CityWeatherCard from "./CityWeatherCard.vue";
import SettingsTab from "./SettingsTab.vue";

export default defineComponent({
  name: "WeatherWidget",
  components: {
    CityWeatherCard,
    SettingsTab,
    Icon,
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
  created(): void {
    const storageItem = localStorage.citiesList;

    if (storageItem && !this.citiesList.length) {
      const savedCitiesList = JSON.parse(localStorage.citiesList);

      savedCitiesList.forEach((city: string) => {
        this.addCity(city);
      });
    }

    if (!storageItem || !JSON.parse(storageItem).length) {
      this.askForLocation = true;
    } else {
      this.askForLocation = false;
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
