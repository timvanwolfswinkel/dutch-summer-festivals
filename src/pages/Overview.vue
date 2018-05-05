<template>
  <div
    :id="'overview'"
    class="overview"
    @mousedown="startDrag" 
    @mousemove="onDrag"
    @mouseup="stopDrag">
    <intro-page :show-intro="showIntro"/>
    <months-list 
      :show-months-panel="showMonthsPanel" 
      :festivals="festivals"/>
    <festival-info :show-info-panel="showInfoPanel"/>
    <span 
      class="overview__show-months"
      @click="toggleShowMonthsPanel">
      {{ "Select a month" | uppercase }}
    </span>
    <list 
      :festivals="festivals" 
      :loading="loading"
      :show-intro="showIntro"/>
  </div>
</template>

<script>
import Vuex from "vuex";
import IntroPage from "../components/IntroPage";
import List from "../components/overview/List";
import MonthsList from "../components/panel/MonthsList";
import FestivalInfo from "../components/panel/FestivalInfo";

const mapState = Vuex.mapState;

export default {
  name: "Overview",
  components: {
    IntroPage,
    List,
    MonthsList,
    FestivalInfo
  },
  data() {
    return {
      startX: 0,
      diffX: 0,
      dragging: false,
      start: 1
    };
  },
  computed: {
    ...mapState(["loading"]),
    ...mapState(["showInfoPanel"]),
    ...mapState(["showMonthsPanel"]),
    ...mapState(["showIntro"]),
    festivals() {
      return this.$store.state.festivals.length > 0
        ? this.$store.state.festivals
        : this.$store.dispatch("getFestivals");
    }
  },
  methods: {
    toggleShowMonthsPanel() {
      // close the festival info panel if open
      if (this.$store.state.showInfoPanel) {
        this.$store.dispatch("toggleInfoPanel");
      }

      this.$store.dispatch("toggleMonthsPanel");
    },
    startDrag(e) {
      // TODO: Fix stuttering with lodash throttle: https://medium.com/vuejs-tips/lodash-throttle-b9baf3213f70
      const event = e || window.event; // check for IE

      this.startX = event.clientX + this.$el.scrollLeft;
      this.diffX = 0;
      this.dragging = true;
    },
    onDrag(e) {
      if (this.dragging === true) {
        const event = e || window.event;

        this.diffX = this.startX - (event.clientX + this.$el.scrollLeft);
        this.$el.scrollLeft += this.diffX;
      }
    },
    stopDrag() {
      this.dragging = false;
      // this.animate();
    },
    animate() {
      const step = Math.sin(this.start);

      if (step <= 0) {
        window.cancelAnimationFrame(this.animate());
        this.start = 1;
      } else {
        this.$el.scrollLeft += this.diffX * step;
        this.start -= 0.02;
        window.requestAnimationFrame(this.animate());
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/pages/overview.scss";
</style>
