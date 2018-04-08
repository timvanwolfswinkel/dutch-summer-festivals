// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueScrollReveal from "vue-scroll-reveal";
import App from "./App";
import store from "./store/store";
import router from "./router";

const moment = require("moment");

moment.locale("nl-be");

Vue.config.productionTip = false;

const dateFormat = date =>
  date ? moment(date, "YYYY-MM-DD").format("ll") : "N/A";

const dateDayMonth = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD MMM") : "N/A";

const dateDayMonthFull = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD MMMM") : "N/A";

const dateDay = date =>
  date ? moment(date, "YYYY-MM-DD").format("DD") : "N/A";

const uppercase = message => message.toUpperCase();

Vue.filter("date", dateFormat);
Vue.filter("dateDayMonth", dateDayMonth);
Vue.filter("dateDayMonthFull", dateDayMonthFull);
Vue.filter("dateDay", dateDay);
Vue.filter("uppercase", uppercase);

Vue.use(VueScrollReveal, {
  scale: { direction: "up", power: "50%" }
});

Vue.directive("split-text", {
  bind(el) {
    const text = el.innerHTML;
    const words = text.trim().split(" ");
    const div = document.createElement("div");
    div.className = "festival-item__words-container";

    // create spans for every word
    words.forEach(val => {
      const span = document.createElement("div");
      span.className = "festival-item__word";
      span.style.display = "inline-block";
      span.innerHTML = val;
      div.appendChild(span);
    });

    el.innerHTML = el.innerHTML.replace(el.innerHTML, div.innerHTML);

    const spans = el.childNodes;
    const newDiv = document.createElement("div");

    setTimeout(() => {
      let offsetTop = spans[0].getBoundingClientRect().top;
      let newSpan = document.createElement("div");
      newSpan.style.position = "relative";
      newSpan.style.display = "inline-block";
      newSpan.style.zIndex = "2";

      [].forEach.call(spans, span => {
        if (span.getBoundingClientRect().top === offsetTop) {
          newSpan.innerHTML += ` ${span.innerHTML}`;
        } else {
          const background = document.createElement("span");
          background.style.position = "absolute";
          background.style.top = "0";
          background.style.left = "0";
          background.style.width = "100%";
          background.style.height = "0";
          background.style.backgroundColor = "#F35333";
          background.style.zIndex = "0";

          const extraDiv = document.createElement("div");
          extraDiv.style.position = "relative";
          extraDiv.style.zIndex = "1";
          extraDiv.innerHTML = newSpan.innerHTML;
          newSpan.innerHTML = "";

          newSpan.appendChild(extraDiv);
          newSpan.appendChild(background);
          newDiv.appendChild(newSpan);

          newSpan = document.createElement("div");
          newSpan.style.position = "relative";
          newSpan.style.display = "inline-block";
          newSpan.style.zIndex = "2";
          newSpan.innerHTML = "";
          offsetTop = span.getBoundingClientRect().top;
          newSpan.innerHTML = ` ${span.innerHTML}`;
        }
      });

      console.log(newDiv.childNodes);
      const background = document.createElement("span");
      background.style.position = "absolute";
      background.style.top = "0";
      background.style.left = "0";
      background.style.width = "100%";
      background.style.height = "0";
      background.style.backgroundColor = "#F35333";
      background.style.zIndex = "0";

      const extraDiv = document.createElement("div");
      extraDiv.style.position = "relative";
      extraDiv.style.zIndex = "1";
      extraDiv.innerHTML = newSpan.innerHTML;
      newSpan.innerHTML = "";

      newSpan.appendChild(extraDiv);
      newSpan.appendChild(background);
      newDiv.appendChild(newSpan);

      el.innerHTML = el.innerHTML.replace(el.innerHTML, newDiv.innerHTML);
    }, 50);
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
