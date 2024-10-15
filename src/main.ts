import {App as R, createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/style/main.scss";
import 'nprogress/nprogress.css';
import {createPinia} from "pinia";

const store = createPinia();

const mountApp = (app: R<Element>): void => {
    app.mount("#app");
};

const app = createApp(App)
    .use(router)
    .use(store);

mountApp(app)
