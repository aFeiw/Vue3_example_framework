import { request } from "@/network/request";

//添加购物车
export function addCart(data) {
  return request({
    url: "/api/carts",
    method: "post",
    data,
  });
}
//修改购物车,data={num:1}
export function modifyCart(id, data) {
  return request({
    url: `/api/carts/${id}`,
    method: "put",
    data,
  });
}
//选择商品的状态,checked,
export function sheckedCart(data) {
  return request({
    url: "api/carts/checked",
    method: "patch",
    data,
  });
}
//获取全部的购物车
export function getCart(data = "") {
  return request({
    url: "api/carts/?" + data,
    method: "get",
  });
}
//删除购物车
export function deletedCartItem(id) {
  return request({
    url: `api/carts/${id}`,
    method: "delete",
  });
}
