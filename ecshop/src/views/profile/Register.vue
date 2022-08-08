<template>
  <div>
    <nav-bar>
      <template v-slot:default>用户注册</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center; padding-top: 50px">
        <van-image width="10rem" height="10rem" fit="contain" src="" />
      </div>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="name"
          name="用户名"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="password_confirmation"
          type="password"
          name="确认密码"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[{ required: true, message: '请填写一致密码' }]"
        />
        <van-field
          v-model="email"
          name="电子邮箱"
          label="电子邮箱"
          placeholder="请输入电子邮箱"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <div class="link_login" @click="$router.push({ path: '/login' })">
          已有账号?立即登录
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
import { register } from "@/api/user.js";
import { Toast } from "vant";
import { Notify } from "vant";
import { useRouter } from "vue-router";
export default {
  name: "Register",
  components: {
    NavBar,
  },
  setup() {
    const userInfor = reactive({
      name: "",
      password: "",
      password_confirmation: "",
      email: "",
    });
    const router = useRouter();
    const onSubmit = () => {
      //先验证
      if (userInfor.password !== userInfor.password_confirmation) {
        Notify("两次密码不一致");
      } else {
        //提交
        register(userInfor).then((res) => {
          if (res.status === 201) {
            Toast.success("注册成功");
            setTimeout(() => {
              router.push({
                name: "Login",
              });
            }, 1000);
          }
          userInfor.password = "";
          userInfor.password_confirmation = "";
        });
      }
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
