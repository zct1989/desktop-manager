import App from "./App.vue";
import { createSSRApp } from "vue";

export function createApp() {
  return createSSRApp(App);
}
