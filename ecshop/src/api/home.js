import { request } from "../network/request";

export function getHomeData() {
  return request({
    url: "/api/index",
    method: "get",
  });
}

export function getHomeGoods(type = "sales", page = 1) {
  return request({
    method: "get",
    url: "/api/index",
    url: "/api/index?" + type + "=1$page=" + page,
  });
}
