import request from '@/utils/request'

// 获取验证码
export function getCaptchas() {
  return request({
    url: "/v1/captchas",
    method: "POST"
  });
}

// 获取个人信息
export function getUserInfo() {
  return request({
    url: "/v1/user",
    method: "GET"
  })
}

// 获取地址
export function getAddress(params) {
  return request({
    url: `/v1/users/${params}/addresses`,
    method: "GET"
  })
}

// 获取城市列表
export function getAllAddress(params) {
  return request({
    url: '/v1/cities',
    method: 'GET',
    params
  })
}

// 新增地址
export function addAddress(data) {
  return request({
    url: `/v1/users/${data.user_id}/addresses`,
    method: "POST",
    data
  })
}

// 删除地址
export function deleteAddress(params) {
  return request({
    url: `/v1/users/${params.user_id}/addresses/${ params.address_id }`,
    method: "DELETE",
  })
}

// 兑换红包
export function exchangeGift(data) {
  return request({
    url: `/v1/users/${data.user_id}/hongbao/exchange`,
    method: "POST",
    data
  })
}

// 获取订单信息
export function getOrder(params) {
  return request({
    url: `/bos/v2/users/${params.user_id}/orders?limit=${params.limit}&offset=${params.offset}`,
    method: "GET",
  })
}

// 获取订单信息
export function getRestaurantList(params) {
  return request({
    url: `/shopping/restaurants`,
    method: "GET",
    params
  })
}

// 获取餐馆具体信息
export function getRestaurantDetail(params) {
  return request({
    url: `/shopping/restaurant/${params}`,
    method: "GET",
  })
}

// 获取菜单信息
export function getMenuList(params) {
  return request({
    url: `/shopping/v2/menu`,
    method: "GET",
    params
  })
}

// 加入购物车
export function checkout(data) {
  return request({
    url: `/v1/carts/checkout`,
    method: "POST",
    data
  })
}

// 获取备注信息
export function getMark(params) {
  return request({
    url: `/v1/carts/${params}/remarks`,
    method: "GET"
  })
}

// 下单
export function placeOrder(data) {
  return request({
    url: `/v1/users/${data.user_id}/carts/${data.cart_id}/orders`,
    method: "POST",
    data
  })
}

// 获取菜馆分类信息
export function getRetaurantCategory(params) {
  return request({
    url: `/shopping/v2/restaurant/category`,
    method: "GET",
    params
  })
}

// 获取红包信息
export function getGiftDetail(params) {
  return request({
    url: `/promotion/v2/users/${params.user_id}/hongbaos?limit=${params.limit}&offset=${params.offset}`,
    method: "GET",
  })
}

// 获取过期红包信息
export function getExpiredGiftDetail(params) {
  return request({
    url: `/promotion/v2/users/${params.user_id}/expired_hongbaos?limit=${params.limit}&offset=${params.offset}`,
    method: "GET",
  })
}

// 登录
export function login(data) {
  return request({
    url: `/v2/login`,
    method: "POST",
    data
  })
}

// 获取食品分类列表
export function getFoodList() {
  return request({
    url: `/v2/index_entry`,
    method: "GET"
  })
}

// 获取订单详情
export function getOrderDetail(params) {
  return request({
    url: `/bos/v1/users/${params.user_id}/orders/${params.order_id}/snapshot`,
    method: "GET"
  })
}

// 搜索
export function search(params) {
  return request({
    url: "/v4/restaurants",
    method: "GET",
    params
  })
}

// 服务中心
export function service() {
  return request({
    url: "/v3/profile/explain",
    method: "GET"
  })
}

// 退出
export function logout() {
  return request({
    url: "/v2/signout",
    method: "GET"
  })
}
