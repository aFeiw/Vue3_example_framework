<template>
  <router-view />
  <!-- <router-view v-slot="{ Component }">
    <transition>
      <keep-alive><component :is="Component" /></keep-alive>
    </transition>
  </router-view> -->
  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-shouye1"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-fenlei-"></i></div>
      <div>分类</div></router-link
    >
    <router-link class="tab-bar-item" to="/shopCart">
      <div class="icon">
        <van-badge :content="$store.state.cartCount" max="9">
          <i class="iconfont icon-shouye"></i
        ></van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/person">
      <div class="icon"><i class="iconfont icon-gerenzhongxin"></i></div>
      <div>我的</div></router-link
    >
  </div>
</template>
<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("updateCart");
    });
  },
};
</script>
<style lang="scss">
@import "./assets/css/font/iconfont.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  a {
    color: #666;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: 14px;
    .icon {
      width: 24px;
      height: 24px;
      margin-top: 4px;
      vertical-align: middle;
      display: inline-block;
    }
  }
}
</style>
