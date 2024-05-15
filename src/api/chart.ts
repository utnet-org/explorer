import request from "../utils/request";

export function PosttChartData(data: any) {
    // return request.get("/chart/data", { params });
    return request({
        url: "/api/power/chart",
        method: "post",
        data
    });

}
export function PosttgasData() {
    // return request.get("/chart/data", { params });
    return request({
        url: "/api/gas/chart",
        method: "post",
    });

}
export function ApiMetworkValidators() {
    // return request.get("/chart/data", { params });
    return request({
        url: "/api/network/validators",
        method: "post",
    });

}