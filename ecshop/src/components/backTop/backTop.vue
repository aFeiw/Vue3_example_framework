<template>
  <!-- <div @click="backTop" class="backTop"></div> -->
  <div @click.prevent="backTop" class="back-top">
    <a href="#top">回到顶部</a>
  </div>
</template>

<script>
export default {
  name: "BackTop",

  setup(props, context) {
    const backTop = () => {
      context.emit("bTop");
    };
    return {
      backTop,
    };
  },
};
</script>

<style scoped lang="scss">
.back-top {
  position: fixed;
  top: 600px;
  height: 0px;
  float: right;
  right: 40px;
}
.back-top > a {
  color: rgb(119, 0, 255);
  display: block;
  width: 80px;
  height: 80px;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  line-height: 80px;
  border-radius: 50px;
  background: #49b783;
}
</style>
