import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home";
import Festival from "@/pages/Festival";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/festival/:festivalId",
      name: "Festival",
      component: Festival
    }
  ]
});
