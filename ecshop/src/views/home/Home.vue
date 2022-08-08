<template>
  <div id="home">
    <nav-bar>
      <template v-slot:default>图书兄弟</template>
    </nav-bar>
    <tab-control
      v-show="isTabFix"
      @tabClick="tabClick"
      :title="['畅销', '新书', '精选']"
    ></tab-control>
    <div class="wrapper">
      <div class="content">
        <div ref="banref">
          <home-swipe :banner="banner"></home-swipe>
          <div><Recommend :recommends="recommendList"></Recommend></div>
        </div>
        <tab-control
          @tabClick="tabClick"
          :title="['畅销', '新书', '精选']"
        ></tab-control>
        <Content :goods="showGoods"></Content>
      </div>
    </div>
    <back-top @bTop="bTop" v-show="isTabFix"></back-top>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watchEffect, nextTick } from "vue";
import NavBar from "../../components/navbar/NavBar.vue";
import Recommend from "@/views/home/Rcommend";
import { getHomeData, getHomeGoods } from "@/api/home.js";
import TabControl from "@/components/common/TabControl";
import Content from "@/components/content/Content";
import BackTop from "@/components/backTop/backTop";
import HomeSwipe from "./HomeSwipe.vue";
//引入下拉加载插件
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    NavBar,
    Recommend,
    TabControl,
    Content,
    BackTop,
    HomeSwipe,
  },
  setup() {
    let banref = ref(null);
    //声明Recommend组件需要的数据
    const recommendList = ref([]);
    //商品数据列表数据模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      new: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
    });
    //通过计算属性进行切页
    let currentType = ref("sales");

    const showGoods = computed(() => {
      return goods[currentType.value].list;
    });
    let isTabFix = ref(false);
    let bscroll = reactive({});
    //声明轮播图数据
    let banner = ref([]);
    onMounted(() => {
      getHomeData().then((res) => {
        recommendList.value = res.goods.data;
        banner.value = res.slides;
      });
      //畅销', '新书', '精选接口数据
      getHomeGoods("sales").then((res) => {
        goods.sales.list = res.goods.data;
      });
      getHomeGoods("recommend").then((res) => {
        goods.recommend.list = res.goods.data;
      });
      getHomeGoods("new").then((res) => {
        goods.new.list = res.goods.data;
      });
      //-----创建BetterScroll对象--------
      bscroll = new BScroll(document.querySelector(".wrapper"), {
        probeType: 3, // 0,1,2,3(运动即触发)
        click: true, //是否允许点击
        pullUpLoad: true, //上拉加载更多，默认false
      });
      //触发滚动事件
      bscroll.on("scroll", (position) => {
        isTabFix.value = -position.y > banref.value.offsetHeight;
      });
      //下拉加载数据，触发pullingup
      bscroll.on("pullingUp", () => {
        console.log("上拉加载更多....");
        console.log(document.querySelector(".content").clientHeight);
        const page = goods[currentType.value] + 1;
        getHomeGoods(currentType.value, page).then((res) => {
          goods[currentType.value].list.push(...res.goods.data);
          goods[currentType.value].page += 1;
        });
        //完成上拉，等待数据加载完成展示出来
        bscroll.finishPullUp();
        //重新计算高度
        bscroll.refresh();
        console.log(`当前类型${currentType.value} `);
      });
    });
    // 监听任何一个变量有变化
    watchEffect(() => {
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    });
    // 定义分类id;
    const tabClick = (index) => {
      let types = ["sales", "new", "recommend"];
      currentType.value = types[index];
      nextTick(() => {
        //重新计算高度
        bscroll && bscroll.refresh();
      });
    };
    //回到顶部
    const bTop = () => {
      bscroll.scrollTo(0, 0, 500);
    };
    return {
      recommendList,
      tabClick,
      goods,
      currentType,
      showGoods,
      isTabFix,
      banref,
      bTop,
      banner,
    };
  },
};
</script>

<style scoped>
.banners {
  width: 100%;
  height: auto;
  background-color: aqua;
}
#home {
  height: 100vh;
  position: relative;
}
.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.content {
}
</style>
