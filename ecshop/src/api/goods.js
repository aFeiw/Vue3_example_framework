import { request } from "../network/request";

export function getDatil(id) {
  return request({
    url: "/api/goods/" + id,
  });
}
