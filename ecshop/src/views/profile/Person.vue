<template>
  <div>
    <nav-bar>
      <template v-slot:default>个人中心</template>
    </nav-bar>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      占位符
    </van-divider>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      {{ name }}
    </van-divider>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      {{ email }}
    </van-divider>
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      {{ created_at }}
    </van-divider>
    <van-grid>
      <van-grid-item icon="photo-o" text="我的收藏" />
      <van-grid-item @click="goTo('Order')" icon="photo-o" text="我的订单" />
      <van-grid-item icon="photo-o" text="账号管理" />
      <van-grid-item @click="goTo('Address')" icon="photo-o" text="地址管理" />
    </van-grid>
    <div style="margin-top: 60px">
      <van-button type="success" @click="loginout">退出</van-button>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { loginOut, getUser } from "@/api/user.js";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, reactive, toRefs } from "vue";
export default {
  components: {
    NavBar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const loginout = () => {
      loginOut().then((res) => {
        if (res.status == "204") {
          //清除token
          window.localStorage.removeItem("token");
          //设置vuex的isLogin为false
          store.commit("setIsLogin", false);
          Toast.success("退出成功");
          setTimeout(() => {
            router.push({ name: "Login" });
          }, 500);
        }
      });
    };
    // User模型
    const user = reactive({
      name: "",
      email: "",
      created_at: "",
    });
    onMounted(() => {
      getUser().then((res) => {
        user.name = res.name;
        user.email = res.email;
        user.created_at = res.created_at;
      });
    });
    //跳转方法
    const goTo = (name, query) => {
      router.push({
        name,
        query: query || {},
      });
    };
    return {
      loginout,
      ...toRefs(user),
      goTo,
    };
  },
};
</script>

<style scoped></style>
