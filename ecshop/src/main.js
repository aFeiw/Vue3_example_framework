import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//引入全局css
import "vant/lib/index.css";
import "@/assets/css/global.css";
//注册全局路由与vuex

//局部导入vant组件
import {
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Badge,
  Sidebar,
  SidebarItem,
  Collapse,
  CollapseItem,
  Tab,
  Tabs,
  Card,
  Tag,
  Form,
  Field,
  CellGroup,
  SubmitBar,
  Stepper,
  Checkbox,
  CheckboxGroup,
  SwipeCell,
  Divider,
  ActionSheet,
  Popup,
  Grid,
  GridItem,
  AddressEdit,
  Image as VanImage,
  AddressList,
  ContactCard,
  ContactList,
  ContactEdit,
  PullRefresh,
  List,
} from "vant";
createApp(App)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(Badge)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tab)
  .use(Tabs)
  .use(Card)
  .use(Tag)
  .use(Form)
  .use(Checkbox)
  .use(SwipeCell)
  .use(VanImage)
  .use(Field)
  .use(AddressList)
  .use(AddressEdit)
  .use(CheckboxGroup)
  .use(CellGroup)
  .use(Stepper)
  .use(SubmitBar)
  .use(Divider)
  .use(ActionSheet)
  .use(Popup)
  .use(Grid)
  .use(GridItem)
  .use(ContactCard)
  .use(ContactList)
  .use(ContactEdit)
  .use(PullRefresh)
  .use(List)
  .use(Lazyload, {
    loading: require("@/assets/images/lazy.jpg"),
  })
  .use(store)
  .use(router)
  .mount("#app");
