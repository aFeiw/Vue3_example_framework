<template>
  <div>
    <nav-bar>
      <template v-slot:default>订单列表</template>
    </nav-bar>
    <div class="status-order">
      <van-tabs @click="onchange">
        <van-tab title="全部"></van-tab>
        <van-tab title="待付款"></van-tab>
        <van-tab title="已支付"></van-tab>
        <van-tab title="发货"></van-tab>
        <van-tab title="交易完成"></van-tab>
        <van-tab title="过期"></van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list
          v-model:loading="loadin"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="item in list" :key="item.id">
            <van-card
              v-for="sub in item.goods.data"
              :key="sub.id"
              :title="'商品名称：' + sub.title"
              :desc="'订单编号：' + item.order_no + 'T：' + item.created_at"
              :num="sub.num"
              :price="sub.price"
              :thumb="sub.cover_url"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import NavBar from "../../components/navbar/NavBar.vue";
import { Toast } from "vant";
import { getOrderList } from "@/api/order.js";
export default {
  name: "Order",
  components: {
    NavBar,
  },
  setup() {
    const active = ref(0);
    const loading = ref(false);
    const list = ref([]);
    const loadin = ref(false);
    const finished = ref(false);
    const page = ref(1);
    const onRefresh = () => {
      loading.value = true;
      finished.value = false;
      loadin.value = true;
    };
    const onLoad = () => {
      // 异步更新数据
      if (loading.value == false) {
        list.value = [];
        loading.value = false;
      }
      getOrderList({
        page: page,
        active,
        include: "user,orderDetails,goods",
      }).then((res) => {
        console.log(res);
        list.value = list.value.concat(res.data);
        // 加载状态结束
        loading.value = false;
      });

      // 数据全部加载完成
      if (list.value.length >= 40) {
        finished.value = true;
      }
    };
    // watch(active, (v) => {
    //   console.log(v);
    //   // active.value = v;
    //   // onLoad();
    // });
    const onchange = (name) => {
      console.log(name);
      active.value = name;
      onLoad();
    };
    return {
      active,
      loading,
      onRefresh,
      list,
      onLoad,
      loadin,
      finished,
      onchange,
    };
  },
};
</script>

<style>
.status-order {
  margin-top: 45px;
}
</style>
