<template>
  <div class="mouse-background"/>
</template>

<script>
export default {
  name: "MouseBackground",
  mounted() {
    console.log(this.$el);
    document.body.addEventListener("mousedown", this.onMouseDown);
    document.body.addEventListener("mousemove", this.onMouseMove);
  },
  beforeDestroy() {
    document.body.removeEventListener("mousedown", this.onMouseDown);
    document.body.removeEventListener("mousemove", this.onMouseMove);
  },
  methods: {
    onMouseDown() {
      console.log("onMouseDown");
    },
    onMouseMove() {
      console.log("onMouseMove");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/components/mouse-background.scss";
</style>
