<template>
  <div>
    <nav-bar>
      <template v-slot:default>购物车</template>
    </nav-bar>
    <div class="zhanwei"></div>
    <div v-for="item in list" :key="item.id">
      <div class="cart-list">
        <van-checkbox-group @change="groupChange" v-model="result">
          <van-swipe-cell>
            <van-card
              class="cards_s"
              :num="item.goods.stock"
              :desc="item.goods.description"
              :price="item.goods.price + '.00'"
              :title="item.goods.title"
              :thumb="item.goods.cover_url"
            >
              <template #footer>
                <van-stepper
                  integer
                  :min="1"
                  :max="item.goods.stock"
                  :model-value="item.num"
                  :name="item.id"
                  @change="onChange"
                  async-change
                />
              </template>
              <template #tag>
                <van-checkbox :name="item.id"></van-checkbox>
              </template>
            </van-card>
            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="deleteGoods(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
    </div>
    <div v-if="!list.length" class="empty">购物车空空如也</div>
    <div class="submit_cart">
      <van-submit-bar
        :price="total * 100"
        button-text="结算"
        @submit="onSubmit"
      >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { computed, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import {
  getCart,
  deletedCartItem,
  sheckedCart,
  modifyCart,
} from "@/api/shopcart.js";
export default {
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    //声明cart数据模型
    const state = reactive({
      list: [],
      result: [], //id数组
      checkAll: true,
    });
    //初始化购物车获取数据
    const init = () => {
      Toast.loading({
        message: "加载中...",
        forbidClick: true,
      });
      getCart("include=goods").then((res) => {
        state.list = res.data;
        state.result = res.data
          .filter((f) => f.is_checked == 1)
          .map((item) => item.id);
        // console.log(state.result);
        Toast.clear();
      });
    };
    //改变购物车的数量
    const onChange = (value, detail) => {
      Toast.loading({
        message: "修改中...",
        forbidClick: true,
      });
      //value改变的数量值
      //detail.name获取到item.id
      modifyCart(detail.name, { num: value }).then((res) => {
        console.log(res);
        //将onmounted中的list的num也改变
        state.list.forEach((item) => {
          if (item.id == detail.name) {
            item.num = value;
          }
        });
        Toast.clear();
      });
    };
    //复选框改变处理
    const groupChange = (result) => {
      if (result.length == state.list.length) {
        state.checkAll = true;
      } else {
        state.checkAll = false;
      }

      state.result = result;
      //同比改变服务器的选则
      sheckedCart({ cart_ids: result });
    };
    //全选按钮-全选操作
    const allChecked = () => {
      if (!state.checkAll) {
        state.result = state.list.map((item) => item.id);
        state.checkAll = true;
      } else {
        state.checkAll = false;
        // state.result = [];
      }
    };
    //删除商品
    const deleteGoods = (id) => {
      console.log(id);
      deletedCartItem(id).then((res) => {
        console.log(res);
        init();
        store.dispatch("updateCart");
      });
    };
    onMounted(() => {
      init();
    });
    //通过计算属性返回总价
    const total = computed(() => {
      let res = 0;
      state.list
        .filter((item) => state.result.includes(item.id))
        .forEach((item) => {
          res += parseInt(item.num) * parseInt(item.goods.price);
        });
      return res;
    });
    const onSubmit = () => {
      console.log(total);
      if (state.result.length == 0) {
        Toast.fail("请选择商品结算");
        return;
      } else {
        router.push({
          name: "CreateShop",
        });
      }
    };
    return {
      onSubmit,
      ...toRefs(state),
      onChange,
      groupChange,
      allChecked,
      deleteGoods,
      total,
    };
  },
};
</script>

<style scoped lang="scss">
.van-submit-bar.van-safe-area-bottom {
  margin-bottom: 53px;
}
.cards_s {
  font-size: 16px;
  text-align: left;
}
.delete-button {
  height: 100%;
}
.zhanwei {
  margin-bottom: 45px;
}
.empty {
  margin-top: 100px;
}
</style>
