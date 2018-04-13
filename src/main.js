// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueScrollReveal from "vue-scroll-reveal";
import VueDragscroll from "vue-dragscroll";
import App from "./App";
import store from "./store/store";
import router from "./router";

const moment = require("moment");

moment.locale("en");

Vue.config.productionTip = false;

// TODO: move filters to folder: https://stackoverflow.com/questions/47004702/how-to-add-a-bunch-of-global-filters-in-vue-js

const dateFormat = date =>
  date ? moment(date, "YYYY-MM-DD").format("ll") : "N/A";

const dateDayMonth = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD MMM") : "N/A";

const dateDayMonthFull = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD MMMM") : "N/A";

const dateDay = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD") : "N/A";

const uppercase = message => message.toUpperCase();

const lowercase = message => message.toLowerCase();

const getLength = data => data.length;

Vue.filter("date", dateFormat);
Vue.filter("dateDayMonth", dateDayMonth);
Vue.filter("dateDayMonthFull", dateDayMonthFull);
Vue.filter("dateDay", dateDay);
Vue.filter("uppercase", uppercase);
Vue.filter("lowercase", lowercase);
Vue.filter("getLength", getLength);

Vue.use(VueScrollReveal, {
  scale: { direction: "up", power: "50%" }
});

Vue.use(VueDragscroll);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
