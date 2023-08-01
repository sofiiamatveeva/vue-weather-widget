<template>
  <div class="relative">
    <div class="relative flex h-fit">
      <input
        class="w-full py-1 pl-3 pr-8 border rounded-lg outline-none"
        v-model="inputCity"
      />
      <button
        class="absolute right-2 hover:text-blue-300 disabled:text-blue-100"
        :disabled="addDisabled || !inputCity.length"
        @click="addCityToStore"
      >
        <Icon icon="iconamoon:send" width="24" height="34" />
      </button>
    </div>
    <ul
      v-if="autocompleteList.length && inputCity.length"
      class="absolute z-100 w-full p-1 border rounded-lg bg-white"
    >
      <li
        class="py-0.5 px-1"
        v-for="autocompleteItem in autocompleteList"
        :key="autocompleteItem"
      >
        <button
          @click="selectCity(autocompleteItem)"
          class="w-full p-1 text-start rounded-md hover:bg-blue-300"
          type="button"
        >
          {{ autocompleteItem }}
        </button>
      </li>
    </ul>
  </div>
  <ul class="cities-list">
    <li
      class="flex items-center h-fit p-2 border rounded-lg bg-slate-100"
      v-for="(cityItem, index) in citiesList"
      :key="index"
    >
      <Icon icon="icon-park:drag" width="16" height="16" />
      <span class="ml-3">{{ cityItem }}</span>
      <button @click="deleteCity(cityItem)" class="ml-auto" type="button">
        <Icon
          class="hover:text-blue-600"
          icon="mi:delete"
          width="16"
          height="16"
        />
      </button>
    </li>
  </ul>
</template>
<style lang="scss"></style>
<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { Icon } from "@iconify/vue";
import LocationService from "@/services/location.service";
import { SettingsTabData } from "@/interfaces/components.interfaces";

export default defineComponent({
  data(): SettingsTabData {
    return {
      inputCity: "",
      selectedCity: "",
      addDisabled: true,
      autocompleteList: [],
      locationService: new LocationService(),
    };
  },
  components: {
    Icon,
  },
  computed: {
    ...mapState(["citiesList"]),
  },
  methods: {
    ...mapMutations(["addCity", "deleteCity"]),
    getAutocompleteList(query: string): void {
      this.locationService.getCitiesList(query).then((cities) => {
        this.autocompleteList = cities.filter(
          (city) => !this.citiesList.includes(city)
        );
      });
    },
    addCityToStore(): void {
      this.addCity(this.inputCity);
      this.inputCity = "";
      this.addDisabled = true;
    },
    deleteCityFromStore(cityToDelete: string): void {
      this.deleteCity(cityToDelete);
    },
    selectCity(selectedCity: string): void {
      this.addDisabled = false;
      this.inputCity = selectedCity;
      this.selectedCity = selectedCity;
      this.autocompleteList = [];
    },
  },
  watch: {
    inputCity(): void {
      this.addDisabled = this.inputCity !== this.selectedCity;

      if (!this.inputCity) {
        this.selectedCity = "";
        return;
      }

      if (this.inputCity === this.selectedCity) {
        this.autocompleteList = [];
        return;
      }

      this.getAutocompleteList(this.inputCity);
    },
  },
});
</script>