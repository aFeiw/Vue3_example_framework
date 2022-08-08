import { request } from "../network/request";

export function register(data) {
  return request({
    url: "/api/auth/register",
    method: "post",
    data,
  });
}
export function login(data) {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
}
export function loginOut() {
  return request({
    url: "/api/auth/logout",
    method: "post",
  });
}

export function getUser() {
  return request({
    url: "/api/user",
    method: "get",
  });
}
