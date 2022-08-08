<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in title"
      :key="index"
      class="tab-control-item"
      :class="{ active: index == currentIndex }"
      @click="itemChage(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, context) {
    const currentIndex = ref(0);
    const itemChage = (index) => {
      currentIndex.value = index;
      context.emit("tabClick", index);
    };

    return {
      currentIndex,
      itemChage,
    };
  },
  watch: {
    title: {
      handler(newV) {
        // console.log(newV);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped lang="scss">
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  z-index: 10;
  background-color: #fff;
  width: 100%;
  //实现置顶
  position: sticky;
  top: 45px;
  .tab-control-item {
    cursor: pointer;
    flex: 1;
    span {
      padding: 5px;
    }
  }
  .active {
    color: #49b783;
    span {
      border-bottom: 3px solid #49b783;
    }
  }
}
</style>
