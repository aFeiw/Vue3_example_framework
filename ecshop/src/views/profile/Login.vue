<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户登录</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center; padding-top: 50px">
        <van-image width="10rem" height="10rem" fit="contain" src="" />
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="请输入电子邮箱"
          :rules="[{ required: true, message: '请填写电子邮箱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <div class="link_login" @click="$router.push({ path: '/register' })">
          没有账号，立即注册
        </div>
        <van-button color="#49b783" round block native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "../../components/navbar/NavBar.vue";
import { reactive, ref, toRefs } from "vue";
import { login } from "@/api/user.js";
import { Toast } from "vant";
import { Notify } from "vant";
import { useRouter } from "vue-router";
//引入状态管理工具
import { useStore } from "vuex";
export default {
  name: "Register",
  components: {
    NavBar,
  },
  setup() {
    const userInfor = reactive({
      email: "",
      password: "",
    });
    const router = useRouter();
    const store = useStore();
    const onSubmit = () => {
      //先验证
      //提交
      login(userInfor).then((res) => {
        //token处理
        window.localStorage.setItem("token", res.access_token);
        //在vuex设置isLogin
        store.commit("setIsLogin", true);
        Toast("登录成功");
        userInfor.email = "";
        userInfor.password = "";
        setTimeout(() => {
          router.go(-1);
        }, 500);
      });
    };

    return {
      onSubmit,
      ...toRefs(userInfor),
    };
  },
};
</script>

<style scoped>
.link_login {
  font-size: 14px;
  margin-bottom: 20px;
  color: #49b783;
  display: inline-block;
  float: left;
}
</style>
