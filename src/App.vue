<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/login" v-if="!isLogin">Login</router-link>
      <a @click="logout" v-if="isLogin">Logout</a>
    </div>-->
    <transition name="route-move">
      <router-view class="child-view" />
    </transition>

    <cube-tab-bar show-slider v-model="selectLabel" :data="tabs" @change="changeHandle"></cube-tab-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectLabel: "/", // 默认页签
      tabs: [
        { label: "Home", value: "/", icon: "cube-home" },
        { label: "Cart", value: "/cart", icon: "cube-mail" },
        { label: "Me", value: "/login", icon: "cubic-person" }
      ]
    };
  },
  watch: {
    //路由发生变化是，同步tabs选中（用户返回）监控路由变换
    $route(route) {
      this.selectLabel = route.path;
    }
  },
  created() {
    // 初始化页签的设置
    this.selectLabel = this.$route.path;
  },
  methods: {
    logout() {
      this.$http.get("/api/logout");
    },
    changeHandle(val) {
      this.$router.push(val);
    }
  },
  computed: {
    ...mapGetters(["isLogin"])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #edf0f4;
}
.cube-tab-bar-slider {
  top: 0;
}
/*页面滑动动画*/
.route-move-enter {
  /*入场前*/
  transform: translate3d(-100%, 0, 0);
}
.route-move-leave-to {
  /*出场后*/
  transform: translate3d(100%, 0, 0);
}
.route-move-enter-active,
.route-move-leave-active {
  /*出场后*/
  transition: transform 0.3s;
}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding-bottom: 36px;
}
</style>
