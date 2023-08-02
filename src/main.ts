import { createApp } from "vue";
import App from "./App.vue";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";
import { store, key } from "./store/store";
import "./index.css";

const app = createApp(App);
app.use(ToastPlugin);
app.use(store, key);

app.mount("weather-widget");
