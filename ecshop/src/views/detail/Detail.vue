<template>
  <div>
    <nav-bar>
      <template v-slot:default>商品详情</template>
    </nav-bar>
    <van-image
      style="margin-top: 50px"
      width="100%"
      lazy-load
      :src="detail.cover_url"
    />
    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price + '.00'"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag plain type="danger">热销</van-tag>
        <van-tag plain type="danger">{{
          detail.is_recommend ? "推荐" : "新书"
        }}</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handleAddCart"
          >加入购物车</van-button
        >
        <van-button type="danger" @click="goCartAdd">立即购买</van-button>
      </template>
    </van-card>
    <van-tabs v-model:active="active">
      <van-tab title="概述">
        <div class="content" v-html="detail.details"></div>
      </van-tab>
      <van-tab title="热评">
        <div style="margin-top: 66px">非常nice</div>
      </van-tab>
      <van-tab title="相关图书">
        <Content :goods="like_gooods"></Content>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";
import { getDatil } from "../../api/goods";
import Content from "../../components/content/Content.vue";
import { addCart } from "@/api/shopcart.js";
import { useStore } from "vuex";
import { Toast } from "vant";
export default {
  components: {
    NavBar,
    Content,
  },
  setup() {
    const router = useRoute();
    const routers = useRouter();
    const store = useStore();
    const id = ref(0);
    const active = ref(0);
    let book = reactive({
      detail: {},
      like_gooods: [],
    });
    onMounted(() => {
      id.value = router.query.id;
      getDatil(id.value).then((res) => {
        book.detail = res.goods;
        book.like_gooods = res.like_goods;
      });
    });
    //加入购物车
    const handleAddCart = () => {
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        if (res.status === 201 || res.status === 204) {
          Toast.success("添加成功");
          //设置store的状态
          store.dispatch("updateCart");
        }
      });
    };
    //跳转到购物车该商品+1
    const goCartAdd = () => {
      console.log(12121);
      addCart({ goods_id: book.detail.id, num: 1 }).then((res) => {
        if (res.status === 201 || res.status === 204) {
          Toast.success("添加成功");
          store.dispatch("updateCart");
          routers.push({ name: "ShopCart" });
        }
      });
    };
    return {
      id,
      book,
      active,
      ...toRefs(book),
      handleAddCart,
      goCartAdd,
    };
  },
};
</script>

<style scoped lang="scss">
.content {
  padding: 10px;
}
</style>
