import qs from 'qs'
import request from '../utils/request'

import API from '../config/api'

// 3.2.1 购物车商品
export async function fetchCartGoods(params) {
    return request(`${API.CART_GOODS}?${qs.stringify(params)}`)
}

// 3.2.2 加入购物车
export async function fetchCartAddGoods(params) {
    return request(`${API.CART_ADD_GOODS}?${qs.stringify(params)}`, {
        body: JSON.stringify(params),
    })
}

// 3.2.3 勾选/取消购物车商品
export async function fetchCartCheck(params) {
    return request(`${API.CART_CHECK}`, {
        body: JSON.stringify(params),
    })
}

// 3.2.4 从购物车中移除商品
export async function fetchCartRemove(params) {
    return request(`${API.CART_REMOVE}?${qs.stringify(params)}`)
}

// 3.2.5 修改购物车中的商品数量
export async function fetchCartNum(params) {
    return request(`${API.CART_NUM}?${qs.stringify(params)}`)
}

// 3.2.6 订单商品加入购物车
export async function fetchCartOrderGoods(params) {
    return request(`${API.CART_ORDER_GOODS}?${qs.stringify(params)}`)
}

// 3.2.7 查询购物车数量
export async function fetchCartTotal(params) {
    return request(`${API.CART_TOTAL}?${qs.stringify(params)}`)
}
