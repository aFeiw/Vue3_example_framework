<template>
  <nav-bar>
    <template v-slot:default>订单预览</template>
  </nav-bar>
  <div style="margin-top: 45px">
    <van-contact-card
      type="edit"
      :name="address.name"
      :tel="address.phone"
      is-edit="true"
      @click="goEditAddress"
    />
    <div class="cart-s" v-for="item in orderList" :key="item.id">
      <van-card
        :num="item.num"
        :price="item.goods.price + '.00'"
        :title="item.goods.title"
        :thumb="item.goods.cover_url"
      />
    </div>
    <div id="submit">
      <van-submit-bar
        :price="total * 100"
        button-text="生成订单"
        @submit="onSubmit"
      />
    </div>
    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '40%' }"
      @close="close"
    >
      <!-- <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block>
          支付宝支付
        </van-button>
        <van-button color="#4fc08d" block> 微信支付 </van-button>
      </div> -->
      <div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item>
            支付宝二维码<br />
            <van-image width="150" height="150" :src="aliyun" />
          </van-grid-item>
          <van-grid-item>
            微信二维码<br />
            <van-image width="150" height="150" :src="wechat" />
          </van-grid-item>
        </van-grid>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from "vue";
import NavBar from "../../components/navbar/NavBar.vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { useStore } from "vuex";
import {
  getOrderPreview,
  payOrder,
  payOrderStatus,
  createOrder,
} from "@/api/order.js";

export default {
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      orderList: [],
      address: {},
      showPay: false,
      orderNo: "",
      aliyun: "",
      wechat: "",
    });
    const init = () => {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getOrderPreview().then((res) => {
        console.log(res);
        let address = res.address.filter((n) => n.is_default == "1");
        if (address.length == 0) {
          state.address = {
            address: "还没有地址信息，请选择或添加地址信息",
          };
        } else {
          state.address = address[0];
        }
        state.orderList = res.carts;
        Toast.clear();
      });
    };
    onMounted(() => {
      init();
    });
    const goEditAddress = () => {
      router.push({
        name: "Address",
      });
    };
    const close = () => {
      router.push({ name: "Order", query: { id: state.orderNo } });
    };
    const handleCreteOrder = () => {};
    //计算商品总价
    const total = computed(() => {
      let sum = 0;
      state.orderList.forEach((item) => {
        sum += parseInt(item.num) * parseInt(item.goods.price);
      });
      return sum;
    });
    //提交
    const onSubmit = () => {
      const params = {
        address_id: state.address.id,
      };
      createOrder(params).then((res) => {
        Toast("创建订单成功");
        store.dispatch("updateCart");
        state.showPay = true;
        //订单id
        state.orderNo = res.id;
        //获取阿里云二维码
        payOrder(state.orderNo, { type: "aliyun" }).then((res) => {
          state.aliyun = res.qr_code_url;
          state.wechat = res.qr_code_url;
        });

        // payOrder(state.orderNo, { type: "wechat" }).then((res) => {
        //   console.log(res);
        //   state.wechat = res.qr_code_url;
        // });

        //轮训查看
        const timer = setInterval(() => {
          payOrderStatus(state.orderNo).then((res) => {
            if (res == "1") {
              clearInterval(timer);
              //跳转到订单列表页面
              router.push({ name: "Order", query: { id: state.orderNo } });
            }
          });
        }, 3000);
      });
    };
    return {
      ...toRefs(state),
      goEditAddress,
      handleCreteOrder,
      close,
      total,
      onSubmit,
    };
  },
};
</script>

<style>
.van-submit-bar.van-safe-area-bottom {
  margin-bottom: 53px;
}
</style>
