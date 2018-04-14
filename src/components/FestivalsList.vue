<template>
  <div
    v-if="!loading"
    :id="'festivals-list'"
    class="festivals-list">
    <intro :show-intro="showIntro"/>
    <div 
      v-for="month in festivals" 
      :key="month.month"
      class="festivals-list__month">
      <columns :show-intro="showIntro"/>
      <transition 
        :css="false"
        @enter="animateMonthTitleIn">
        <span 
          v-if="!showIntro"
          :id="month.month" 
          class="festivals-list__month-title"
          style="transform: translateX(-100px); opacity: 0;">{{ month.month | uppercase }}</span>
      </transition>
      <div 
        v-for="(festival, index) in month.festivalsInMonth" 
        :key="festival.name"
        class="festivals-list__festival">
        <festival-item 
          :festival="festival" 
          :margin="{value: !(index % 2)}"/> <!--use even/odd for handling left or right margin-->
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

import FestivalItem from "../components/FestivalItem";
import Intro from "../components/Intro";
import Columns from "../components/Columns";

export default {
  name: "FestivalsList",
  components: {
    FestivalItem,
    Intro,
    Columns
  },
  props: {
    festivals: {
      type: [Array, Promise],
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
    showIntro: {
      type: Boolean,
      required: true,
      validate(value) {
        return [value];
      }
    }
  },
  methods: {
    animateMonthTitleIn(el, done) {
      anime({
        targets: el,
        duration: 350,
        delay: 1500,
        translateX: 0,
        opacity: 1,
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
