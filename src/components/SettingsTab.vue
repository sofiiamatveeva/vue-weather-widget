<template>
  <div class="relative">
    <div class="relative flex h-fit">
      <input
        class="w-full py-1 pl-3 pr-8 border rounded-lg outline-none"
        v-model="inputCity"
        @keydown.down.prevent="downList"
        @keydown.up.prevent="upList"
        @keydown.enter="selectOnEnter"
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
      ref="autocompleteList"
    >
      <li
        class="py-0.5 px-1"
        v-for="(autocompleteItem, index) in autocompleteList"
        :key="autocompleteItem"
      >
        <button
          @click="selectCity(autocompleteItem)"
          class="w-full p-1 text-start rounded-md hover:bg-blue-300"
          :class="{ 'bg-blue-300': index === listCityIndex }"
          type="button"
        >
          {{ autocompleteItem }}
        </button>
      </li>
    </ul>
  </div>
  <draggable
    class="mt-6"
    tag="ul"
    :list="citiesList"
    handle=".handle"
    item-key="element"
    @end="onDragEnd"
  >
    <template #item="{ element }">
      <li
        class="flex items-center h-fit p-2 my-1 border rounded-lg bg-slate-100"
      >
        <Icon
          class="handle hover:text-blue-600 active:text-black hover:cursor-pointer"
          icon="icon-park-outline:drag"
          width="16"
          height="24"
        />
        <span class="ml-3">{{ element }}</span>
        <button @click="deleteCity(element)" class="ml-auto" type="button">
          <Icon
            class="hover:text-blue-600"
            icon="mi:delete"
            width="16"
            height="16"
          />
        </button>
      </li>
    </template>
  </draggable>
</template>
<style lang="scss"></style>
<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import { Icon } from "@iconify/vue";
import draggable from "vuedraggable";
import { store } from "@/store/store";
import LocationService from "@/services/location.service";
import { SettingsTabData } from "@/interfaces/components.interfaces";

export default defineComponent({
  name: "SettingsTab",
  components: {
    Icon,
    draggable,
  },
  data(): SettingsTabData {
    return {
      inputCity: "",
      selectedCity: "",
      addDisabled: true,
      autocompleteList: [],
      listCityIndex: -1,
      locationService: new LocationService(),
    };
  },
  computed: {
    ...mapState(["citiesList"]),
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
    onDragEnd(): void {
      store.commit("saveToLocalStorage");
    },
    downList(): void {
      const listLength = this.autocompleteList.length;

      if (this.listCityIndex < listLength - 1) {
        this.listCityIndex++;
      }
    },
    upList(): void {
      if (this.listCityIndex > 0) {
        this.listCityIndex--;
      }
    },
    selectOnEnter(): void {
      if (this.listCityIndex > -1) {
        const selectedCity = this.autocompleteList[this.listCityIndex];

        this.selectCity(selectedCity);
        this.addCityToStore();

        this.listCityIndex = -1;
      }
    },
  },
  store: store,
});
</script>
