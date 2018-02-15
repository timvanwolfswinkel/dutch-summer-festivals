<template>
    <div class="container">
        <h1 class="heading">{{ header }}</h1>
    </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {
      header: 'Festival',
    };
  },
};
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }
</style>
