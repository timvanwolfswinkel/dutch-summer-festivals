<template>
  <div class="page-transition">
    <transition name="test">
      <div class="page-transition__container"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PageTransition"
};
</script>

<style lang="scss" scoped>
@import "../scss/components/page-transition.scss";

.test-enter-active,
.test-leave-active {
  transition: width 3s;
}

.test-enter,
.test-leave-to {
  width: 0%;
}

.test-enter-to,
.test-leave {
  width: 100%;
}
</style>
