import { getCart } from "@/api/shopcart";
const actions = {
  //接口
  updateCart(contex) {
    getCart().then((res) => {
      contex.commit("addCart", { count: res.data.length || 0 });
    });
  },
};

export default actions;
