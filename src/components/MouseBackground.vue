<template>
  <div class="mouse-background"/>
</template>

<script>
import anime from "animejs";

export default {
  name: "MouseBackground",
  data() {
    return {
      xPos: null,
      yPos: null
    };
  },
  mounted() {
    document.body.addEventListener("mousedown", this.onMouseDown);
    document.body.addEventListener("mouseup", this.onMouseUp);
    document.body.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    document.body.removeEventListener("mousedown", this.onMouseDown);
    document.body.removeEventListener("mouseup", this.onMouseUp);
    document.body.removeEventListener("mousemove", this.onMouseMove);
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

      anime({
        targets: this.$el,
        duration: 250,
        left: this.xPos - 50,
        top: this.yPos - 50,
        easing: "easeOutExpo"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/mouse-background.scss";
</style>
