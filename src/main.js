// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "./store/store";
import router from "./router";

const moment = require("moment");

Vue.config.productionTip = false;

const dateFormat = date =>
  date ? moment(date, "YYYY-MM-DD").format("ll") : "N/A";

const dateDayMonth = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD MMM") : "N/A";

const dateDay = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD") : "N/A";

const uppercase = message => message.toUpperCase();

Vue.filter("date", dateFormat);
Vue.filter("dateDayMonth", dateDayMonth);
Vue.filter("dateDay", dateDay);
Vue.filter("uppercase", uppercase);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
