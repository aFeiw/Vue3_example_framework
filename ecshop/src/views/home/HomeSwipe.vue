<template>
  <div class="swipe">
    <van-swipe
      v-if="banner.length"
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="item in banner" :key="item.id" v-lazy="item">
        <!-- <img :src="item.img_url" alt="" /> -->
        <img v-lazy="item.img_url" alt="" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeSplider",
  props: {
    banner: {
      typeof: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped lang="scss">
img {
  width: 100%;
  height: 250px;
}
</style>
