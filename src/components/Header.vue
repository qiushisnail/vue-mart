<template>
  <div class="header">
    <h1>{{title}}</h1>
    <i v-if="$routerHistory.canBack()" @click="back" class="cubeic-back"></i>
    <div class="extend">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: " "
    }
  },
  methods: {
    back() {
      // h5 history bug:可能跳出当前应用
      this.$router.goBack();
    }
  }
};
</script>


<style scoped lang="stylus">
.header {
  position: relative;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background: #edf0f4;

  .cubeic-back {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 15px;
    color: #fc915b;
  }

  .extend {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 15px;
    color: #fc915b;
  }
}
</style>