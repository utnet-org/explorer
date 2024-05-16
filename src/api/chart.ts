import request from "../utils/request";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export async function PosttChartData(data: any) {
  // return request.get("/chart/data", { params });
  return await request({
    url: '/api/power/chart',
    method: 'post',
    data,
  });
}
export async function PosttgasData() {
  // return request.get("/chart/data", { params });
  return await request({
    url: '/api/gas/chart',
    method: 'post',
  });
}
export async function ApiMetworkValidators() {
  // return request.get("/chart/data", { params });
  return await request({
    url: '/api/network/validators',
    method: 'post',
  });
}
export async function ApiMetworkValidator(data: any) {
  // return request.get("/chart/data", { params });
  return await request({
    url: '/api/network/validator',
    method: 'post',
    data,
  });
}
export async function ApiBlockList(data: any) {
  // return request.get("/chart/data", { params });
  return await request({
    url: '/api/block/list',
    method: 'get',
    data,
  });
}
