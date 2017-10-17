import qs from 'qs'
import request from '../utils/request'

import { query } from '../utils/library'

import {
    ORDER_LIST,
    ORDER_DETAIL,
    ORDER_PLACE,
    ORDER_PAY,
} from '../config/api'

// 5.1.1 获取订单列表
export async function fetchOrderList(params) {
    return request(ORDER_LIST, {
        body: query(params),
    })
}

// 5.1.2 获取订单详情
export async function fetchOrderDetail(params) {
    return request(`${ORDER_DETAIL}?${qs.stringify(params)}`)
}

// 5.2.1 确认下单
export async function fetchOrderPlace(params) {
    return request(`${ORDER_PLACE}?${qs.stringify(params)}`, {
        body: JSON.stringify(params),
    })
}

// 5.3.1 支付
export async function fetchOrderPay(params) {
    return request(`${ORDER_PAY}?${qs.stringify(params)}`, {
        body: JSON.stringify(params),
    })
}
