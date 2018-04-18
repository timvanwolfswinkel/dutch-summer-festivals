<template>
  <div
    v-if="!loading"
    :id="'list'"
    class="list">
    <mouse-follower/>
    <intro :show-intro="showIntro"/>
    <div 
      v-for="month in festivalsList" 
      :key="month.month"
      class="list__month">
      <columns 
        :festivals="month.festivalsInMonth" 
        :show-intro="showIntro"/>
      <transition 
        :css="false"
        @enter="animateMonthTitleIn">
        <span 
          v-show="!showIntro"
          :id="month.month" 
          :style="styleMonthTitle"
          class="list__month-title">{{ month.month | uppercase }}</span>
      </transition>
      <div 
        v-for="festival in month.festivalsInMonth" 
        :key="festival.name"
        class="list__festival">
        <festival-item :festival="festival"/>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs";

import MouseFollower from "../MouseFollower";
import FestivalItem from "../FestivalItem";
import Intro from "../Intro";
import Columns from "../Columns";

export default {
  name: "List",
  components: {
    MouseFollower,
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
  data() {
    return {
      styleMonthTitle: this.showIntro
        ? "transform: translateX(-100px); opacity: 0;"
        : "transform: translateX(0); opacity: 1;"
    };
  },
  computed: {
    festivalsList() {
      // const festivalsList = this.$props.festivals;
      let position = "odd";

      const festivalsList = this.$props.festivals.map(months => {
        if (months.festivalsInMonth.length > 0) {
          months.festivalsInMonth.map(festival => {
            position = position === "even" ? "odd" : "even";
            festival.fields.position = position; // eslint-disable-line no-param-reassign
            return festival;
          });
        }
        return months;
      });

      return festivalsList;
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
@import "src/assets/scss/components/overview/list.scss";
</style>
