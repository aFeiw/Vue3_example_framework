import { request } from "@/network/request";

export function createOrder(params) {
  return request({
    url: "/api/orders",
    method: "post",
    params,
  });
}

export function getOrderPreview(params) {
  return request({
    url: "/api/orders/preview",
  });
}

// 获取二维码;
export function payOrder(order, params) {
  return request({
    url: `api/orders/${order}/pay`,
    method: "get",
    params,
  });
}

export function payOrderStatus(order) {
  return request({
    url: `api/orders/${order}/status`,
  });
}

export function getOrderList(params) {
  return request({
    url: "/api/orders",
    params,
  });
}

export function getOrderDetail(order) {
  return request({
    url: `api/orders/${order}`,
    method: "get",
    params: {
      include: "user,orderDetails.goods",
    },
  });
}

export function confirmOrder(order) {
  return request({
    url: `api/orders/${order}/confirm`,
    method: "patch",
  });
}

export function viewExpress(order) {
  return request({
    url: `api/orders/${order}/express`,
    method: "get",
  });
}
