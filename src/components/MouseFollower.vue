<template>
  <div class="mouse-follower"/>
</template>

<script>
import anime from "animejs";

export default {
  name: "MouseFollower",
  data() {
    return {
      xPos: null,
      yPos: null,
      elementXPos: null,
      elementYPos: null
    };
  },
  mounted() {
    document.body.addEventListener("mousedown", this.onMouseDown);
    document.body.addEventListener("mouseup", this.onMouseUp);
    document.body.addEventListener("mousemove", this.onMouseMove);
    document.body.addEventListener("mouseleave", this.onMouseLeave);
    document.body.addEventListener("mouseenter", this.onMouseEnter);
  },
  beforeDestroy() {
    document.body.removeEventListener("mousedown", this.onMouseDown);
    document.body.removeEventListener("mouseup", this.onMouseUp);
    document.body.removeEventListener("mousemove", this.onMouseMove);
    document.body.removeEventListener("mouseleave", this.onMouseLeave);
    document.body.removeEventListener("mouseenter", this.onMouseEnter);
  },
  methods: {
    onMouseDown() {
      anime.remove(this.$el);

      anime({
        targets: this.$el,
        duration: 500,
        delay: 50,
        scale: 0.5,
        easing: "easeOutExpo"
      });
    },
    onMouseUp() {
      anime.remove(this.$el);

      anime({
        targets: this.$el,
        duration: 500,
        delay: 50,
        scale: 1,
        easing: "easeOutExpo"
      });
    },
    onMouseMove(e) {
      // TODO: Fix stuttering in firefox with lodash throttle: https://medium.com/vuejs-tips/lodash-throttle-b9baf3213f70
      this.xPos = e.clientX;
      this.yPos = e.clientY;

      // set element position only within boundaries of screen
      // TODO: check if window !== undefined
      this.elementXPos =
        this.xPos > window.innerWidth - 50 || this.xPos < 50
          ? this.elementXPos
          : this.xPos - 50;

      this.elementYPos =
        this.yPos > window.innerHeight - 50 || this.yPos < 50
          ? this.elementYPos
          : this.yPos - 50;

      anime({
        targets: this.$el,
        duration: 250,
        left: this.elementXPos,
        top: this.elementYPos
      });
    },
    onMouseLeave() {
      anime.remove(this.$el);

      anime({
        targets: this.$el,
        duration: 500,
        delay: 100,
        opacity: 0,
        scale: 0,
        easing: "easeOutExpo"
      });
    },
    onMouseEnter() {
      anime.remove(this.$el);

      anime({
        targets: this.$el,
        duration: 500,
        delay: 100,
        opacity: 0.6,
        scale: 1,
        easing: "easeOutExpo"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/mouse-follower.scss";
</style>
