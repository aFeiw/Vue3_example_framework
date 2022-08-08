<template>
  <div class="goods">
    <content-list
      v-for="item in goods"
      :product="item"
      :key="item.id"
    ></content-list>
  </div>
</template>
<script>
import ContentList from "./ContentItem.vue";
export default {
  name: "Content",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    ContentList,
  },
};
</script>

<style scoped lang="scss">
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px;
}
</style>
