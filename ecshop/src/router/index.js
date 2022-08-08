import { createRouter, createWebHistory } from "vue-router";
import store from "../store/index";
import { Toast } from "vant";

const Home = () => import("@/views/home/Home.vue");
const Category = () => import("@/views/category/Category.vue");
const Detail = () => import("@/views/detail/Detail.vue");
const Person = () => import("@/views/profile/Person.vue");
const ShopCart = () => import("@/views/shopcart/ShopCart.vue");
const Register = () => import("@/views/profile/Register.vue");
const Login = () => import("@/views/profile/Login.vue");
const Address = () => import("@/views/profile/addressList.vue");
const AddressDetail = () => import("@/views/profile/addressDetail.vue");
const CreateShop = () => import("@/views/shopcart/CreateShop.vue");
const Order = () => import("@/views/shopcart/Order.vue");
const routes = [
  {
    path: "/",
    name: "DefaultHome",
    component: Home,
    meta: {
      title: "图书兄弟",
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "图书兄弟",
    },
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta: {
      title: "图书兄弟-商品分类",
    },
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
    meta: {
      title: "图书兄弟-商品详情",
    },
  },
  {
    path: "/person",
    name: "Person",
    component: Person,
    meta: {
      title: "图书兄弟-个人信息",
      isAuthRequired: true,
    },
  },
  {
    path: "/shopCart",
    name: "ShopCart",
    component: ShopCart,
    meta: {
      title: "图书兄弟-购物车",
      isAuthRequired: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "图书兄弟-注册",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "图书兄弟-登录",
    },
  },
  {
    path: "/adress",
    name: "Address",
    component: Address,
    meta: {
      title: "图书兄弟-地址列表",
      isAuthRequired: true,
    },
  },
  {
    path: "/addressDetail",
    name: "AddressDetail",
    component: AddressDetail,
    meta: {
      title: "图书兄弟-地址管理",
      isAuthRequired: true,
    },
  },
  {
    path: "/createShop",
    name: "CreateShop",
    component: CreateShop,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  //判断需要授权才能访问的页面
  if (to.meta.isAuthRequired && store.state.user.isLogin == false) {
    Toast.fail("您还没有登录,请先登录");
    return next("/login");
  } else {
    next();
  }

  document.title = to.meta.title;
});

export default router;
