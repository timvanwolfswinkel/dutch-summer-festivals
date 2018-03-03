import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Festival from "@/components/Festival";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/:festivalId",
      name: "Festival",
      component: Festival
    }
  ]
});
