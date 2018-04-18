import Vue from "vue";
import Router from "vue-router";
import Overview from "@/pages/Overview";
import Festival from "@/pages/Festival";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Overview",
      component: Overview
    },
    {
      path: "/festival/:festivalId",
      name: "Festival",
      component: Festival
    }
  ]
});
