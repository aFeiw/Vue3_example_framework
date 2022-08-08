<template>
  <div>
    <nav-bar>
      <template v-slot:default>分类</template>
    </nav-bar>
    <div id="mainbox">
      <div class="ordertab">
        <van-tabs
          title-active-color="#47b986"
          @click="tabClick"
          v-model:active="active2"
        >
          <van-tab title="销量排序"> </van-tab>
          <van-tab title="价格排序"> </van-tab>
          <van-tab title="评论排序"> </van-tab>
        </van-tabs>
      </div>
      <van-sidebar class="leftmenu" v-model="active">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="item in categories"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <van-sidebar-item
              v-for="it in item.children"
              :key="it.id"
              :title="it.name"
              @click="getGoods(it.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="goodsmain">
        <div class="content">
          <van-card
            @click="itemClick(item.id)"
            v-for="item in showGoods"
            :key="item.id"
            :num="item.commments_count"
            :tag="item.commments_count >= 0 ? '流行' : '待售'"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            :lazy-load="true"
          />
        </div>
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isTabFix"></back-top>
  </div>
</template>

<script>
import { ref, onMounted, reactive, nextTick, computed, watchEffect } from "vue";
import { useRouter } from "vue-router";
import NavBar from "../../components/navbar/NavBar.vue";
import { getCategoryData, getCategoryGoods } from "@/api/category.js";
//引入下拉加载插件
import BScroll from "better-scroll";
import BackTop from "@/components/backTop/backTop";
export default {
  components: {
    NavBar,
    BackTop,
  },
  setup() {
    let active = ref(0);
    let categories = ref([]);
    const activeName = ref("1");
    const active2 = ref(0);
    let isTabFix = ref(false);
    //声明排序条件
    let currentOredr = ref("sales");
    //声明分类id
    let currentCid = ref(0);
    //排序选项卡点击0,1,2
    const tabClick = (id) => {
      const orderList = ["sales", "price", "comments_count"];
      currentOredr.value = orderList[id];
      //
      getCategoryGoods(currentOredr.value, currentCid.value).then((res) => {
        goods[currentOredr.value].list = res.goods.data;
        nextTick(() => {
          //重新计算高度
          bscroll && bscroll.refresh();
        });
      });
    };
    //通过分类得到商品
    const getGoods = (id) => {
      currentCid.value = id;
      initData();
    };
    //数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    //点击切换时的数据变化
    const showGoods = computed(() => {
      return goods[currentOredr.value].list;
    });
    //下拉插件
    let bscroll = reactive({});
    const initData = () => {
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.goods.data;
      });
      getCategoryGoods("price", currentCid.value).then((res) => {
        goods.price.list = res.goods.data;
      });
      getCategoryGoods("comments_count", currentCid.value).then((res) => {
        goods.comments_count.list = res.goods.data;
      });
    };
    onMounted(() => {
      getCategoryData().then((res) => {
        categories.value = res.categories;
      });
      //调用方法
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.goods.data;
      });
      bscroll = new BScroll(document.querySelector(".goodsmain"), {
        probeType: 3, // 0,1,2,3(运动即触发)
        click: true, //是否允许点击
        pullUpLoad: true, //上拉加载更多，默认false
      });
      //注册滚动事件
      bscroll.on("scroll", (position) => {
        isTabFix.value = -position.y > 200;
      });
      //下拉加载数据，触发pullingup
      bscroll.on("pullingUp", () => {
        console.log("上拉加载更多....");
        //完成上拉，等待数据加载完成展示出来
        const page = goods[currentOredr.value].page + 1;
        getCategoryGoods(currentOredr.value, currentCid.value).then((res) => {
          goods[currentOredr.value].list.push(...res.goods.data);
        });
        bscroll.finishPullUp();
        //重新计算高度
        bscroll.refresh();
        console.log(`当前类型${currentOredr.value} `);
      });
    });
    // 监听任何一个变量有变化
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    });
    //回到顶部
    const bTop = () => {
      bscroll.scrollTo(0, 0, 500);
    };
    //点击详情
    const router = useRouter();
    const itemClick = (id) => {
      router.push({
        name: "Detail",
        query: {
          id,
        },
      });
    };
    return {
      active,
      categories,
      activeName,
      active2,
      tabClick,
      currentOredr,
      getGoods,
      currentCid,
      showGoods,
      bscroll,
      isTabFix,
      bTop,
      itemClick,
    };
  },
};
</script>

<style scoped lang="scss">
#mainbox {
  margin-top: 45px;
  display: flex;
  .ordertab {
    flex: 1;
    float: right;

    height: 50px;
    position: fixed;
    top: 45px;
    right: 0;
    left: 130px;
  }
  .leftmenu {
    position: fixed;
    top: 95px;
    left: 0;
    width: 130px;
    height: 100vh;
  }
  .goodsmain {
    flex: 1;
    height: 100vh;
    position: absolute;
    top: 95px;
    left: 130px;
    right: 0;
    padding: 10px;
    text-align: left;
    // .content {
    //   padding-top: 120px;
    // }
  }
  .van-card_thumb {
    width: 68px;
  }
}
</style>
