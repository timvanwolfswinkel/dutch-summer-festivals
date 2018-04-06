<template>
  <div
    v-if="!loading" 
    class="festivals-list">
    <transition 
      :css="false"
      @enter="animateInfoPanelIn"
      @leave="animateInfoPanelOut">
      <info-panel 
        v-show="showInfoPanel" 
        style="transform: translateX(440px)"/>
    </transition>
    <div class="festivals-list__intro">
      <div class="festivals-list__intro-container">
        <h1 class="festivals-list__header">Your complete festival overview.</h1>
        <span class="festivals-list__description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
    </div>
    <div 
      v-for="(festival, index) in festivals" 
      :key="festival.name"
      class="festivals-list__item">
      <festival-item 
        :festival="festival" 
        :margin="{value: !(index % 2)}"/> <!-- use even/odd for handling left or right margin -->
    </div>
  </div>
</template>

<script>
import anime from "animejs";

import FestivalItem from "../components/FestivalItem";
import InfoPanel from "../components/InfoPanel";

export default {
  name: "FestivalsList",
  components: {
    FestivalItem,
    InfoPanel
  },
  props: {
    festivals: {
      type: Array || Promise,
      required: true,
      validate(value) {
        return [value];
      }
    },
    loading: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    },
    showInfoPanel: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  methods: {
    animateInfoPanelIn(el, done) {
      anime({
        targets: el,
        duration: 500,
        translateX: 0,
        easing: "easeOutExpo",
        complete() {
          done();
        }
      });
    },
    animateInfoPanelOut(el, done) {
      console.log("animateOut");
      anime({
        targets: el,
        duration: 500,
        translateX: 440,
        easing: "easeOutExpo",
        complete() {
          done();
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/festivals-list.scss";
</style>
