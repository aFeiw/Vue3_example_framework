<template>
  <div class="nav-bar">
    <div class="left" @click="goback">
      <slot name="left">
        <img src="@/assets/images/zuojian.png" alt="" />
      </slot>
    </div>
    <div class="center">
      <slot>ECSHOP</slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  name: "NavBar",
  setup() {
    //创建路由
    const router = useRouter();

    const goback = () => {
      router.go(-1);
    };
    return {
      goback,
    };
  },
};
</script>

<style scoped>
.nav-bar {
  display: flex;
  background-color: #49b783;
  color: aliceblue;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 60px;
}
.left img {
  width: 26px;
  padding: 8px;
}
.center {
  flex: 1;
}
</style>
