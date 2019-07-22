<template>
  <div class="home">
    <!-- 页头 -->
    <k-header title="开课吧商城"></k-header>
    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="item in slider" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" class="slider" />
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <!-- 触发分类选择按钮-->
    <cube-button @click="showCatg">选择分类</cube-button>
    <!-- 商品列表 -->
    <goods-list :goods="filterGoods" @addCart="onAddCart"></goods-list>

    <!-- 商品分类列表 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" @select="selectHandler"></cube-drawer>
    <!-- 加购动画载体 -->
    <div class="ball-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show"></div>
      </transition>
    </div>
  </div>
</template> 

<script>
import GoodsList from "@/components/GoodsList.vue";
const labels = {
  fe: "前端",
  python: "Python",
  java: "Java",
  bigdata: "大数据",
  ai: "人工智能"
};
export default {
  name: "home",
  data() {
    return {
      ball: {
        show: true,
        el: null // 动画目标dom引用
      },
      slider: [],
      goods: [], // 所有商品列表
      selectedKeys: [], //分类过滤时使用
      keys: [] // 分类
    };
  },
  components: {
    GoodsList
  },
  async created() {
    const {
      data: { data: goods, slider, keys }
    } = await this.$http.get("/api/goods");
    this.slider = slider;
    this.goods = goods;
    this.keys = keys;
    this.selectedKeys = [...this.keys]; // 默认选中全部分类
  },
  methods: {
    showCatg() {
      // 显示分类列表
      this.$refs.drawer.show();

      // 创建Notice实例
      const notice = this.$createNotice();
      notice.add({ content: "lalala", duration: 2 });
    },
    selectHandler(val) {
      this.selectedKeys = [...val];
    },
    onAddCart(el) {
      this.ball.el = el;
      this.ball.show = true;
    },
    beforeEnter() {
      // 动画初始值设置
      // 1. 获取点击dom坐标
      const dom = this.ball.el;
      const rect = dom.getBoundingClientRect();
      console.log(rect.top, rect.left);
      // 2. 计算点击坐标
      const x = rect.left - window.innerWidth / 2;
      const y = -(window.innerHeight - rect.top - 30);
      el.style.display = "";
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    enter(el, done) {
      // 动画重绘触发
      // 获取offsetHeight触发重绘
      document.body.offsetHeight;
      // 设置动画结束点
      el.style.transform = "translate3d(0, 0 ,0)";
      el.addEventListener("transitionEnd", done);
    },
    afterEnter(el) {
      this.ball.show = false;
      el.style.display = "none";
    }
  },
  computed: {
    filterGoods() {
      let ret = [];
      this.selectedKeys.forEach(v => {
        ret = ret.concat(this.goods[v]);
      });
      return ret;
    },
    drawerList() {
      return this.keys.map(v => {
        return {
          value: v,
          text: labels[v] // 中英文对照表
        };
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
}

.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 200;
    color: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 7.75, 0.41);
  }
}
</style>
