<template>
  <transition 
    :css="false"
    @enter="animateInfoPanelIn"
    @leave="animateInfoPanelOut">
    <div 
      v-if="showMonthsPanel"
      ref="monthsPanel"
      class="info-panel"
      style="transform: translateX(-440px)">
      <div 
        class="info-panel__close"
        @click="toggleMonthsPanel">
        <img
          :src="require(`@/assets/img/icons/close.svg`)"
          class="info-panel__close-icon">
      </div>
      <div class="info-panel__content">
        <div 
          v-for="(month, index) in festivals" 
          :key="month.monthTitle"
          class="info-panel__month">
        <element-transition :delay="index">
          <span class="info-panel__heading">{{ month.month }}</span>
        </element-transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// TODO: move content outside of component
import anime from "animejs";

import ElementTransition from "../components/ElementTransition";

export default {
  name: "MonthsPanel",
  components: {
    ElementTransition
  },
  props: {
    showMonthsPanel: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    },
    festivals: {
      type: [Array, Promise],
      required: true,
      validate(value) {
        return [value];
      }
    },
  },
  methods: {
    toggleMonthsPanel() {
      this.$store.dispatch("toggleMonthsPanel");
    },
    // TODO: disable clicking on element during animation (state)
    // TODO: before route leave set panel to false
    animateInfoPanelIn(el, done) {
      document.body.style.overflow = "hidden";
      this.$refs.monthsPanel.style.left = "0px";

      anime({
        targets: el,
        duration: 500,
        translateX: 0,
        easing: "easeOutExpo",
        complete() {
          document.body.style.overflow = "auto";
          done();
        }
      });
    },
    animateInfoPanelOut(el, done) {
      document.body.style.overflow = "hidden";

      anime({
        targets: el,
        duration: 500,
        translateX: -440,
        easing: "easeOutExpo",
        complete() {
          document.body.style.overflow = "auto";
          done();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/info-panel.scss";
</style>
