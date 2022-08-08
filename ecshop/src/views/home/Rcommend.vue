<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="item in recommends.slice(0, 4)"
      :key="item.id"
    >
      <a @click.prevent="goD(item.id)">
        <img v-lazy="item.cover_url" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const router = useRouter();
    const goD = (id) => {
      router.push({
        name: "Detail",
        params: { id },
      });
    };
    return {
      goD,
    };
  },
};
</script>

<style scoped lang="scss">
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 6px solid #eee;
  font-size: 13px;
}
.recommend-item {
  flex: 1;
  img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
}
</style>
