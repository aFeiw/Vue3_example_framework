// 二次封装axios
import axios from "axios";
import { Notify, Toast } from "vant";
import router from "../router/index";
export function request(config) {
  const instance = axios.create({
    baseURL: "https://api.shop.eduwork.cn",
    timeout: 5000,
  });
  //请求拦截
  instance.interceptors.request.use(
    (config) => {
      //如果有一些接口需要认证才可以访问，token
      const token = window.localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = "Bearer" + token;
      }
      //直接放行
      return config;
    },
    (errConfig) => {}
  );
  //响应拦截
  instance.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (err) => {
      //如果需要授权，跳转login
      if (err.response.status && err.response.status == "401") {
        Toast.fail("请先登录");
        router.push({ path: "/login" });
      }
      //如果有错误，统一处理错误码
      Notify(
        err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
      );
    }
  );
  return instance(config);
}
