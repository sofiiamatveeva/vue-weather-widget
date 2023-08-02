<template>
  <weather-widget></weather-widget>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WeatherWidget from "./components/WeatherWidget.vue";

export default defineComponent({
  components: {
    WeatherWidget,
  },
});
</script>
