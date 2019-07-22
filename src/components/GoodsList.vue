<template>
  <div>
    <div v-for="good in goods" :key="good.id">{{good.title}}</div>
  </div>
</template>

<script>
export default {
  props:["goods"]
};
</script>

<style lang="scss" scoped>
</style>