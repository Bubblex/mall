import request from '../utils/request'

import { query } from '../utils/library'

import API from '../config/api'

/**
 * 拉取账单列表
 *
 * @param {object} params 请求参数
 */
export async function fetchUserBillList(params) {
    return request(API.USER_BILL, {
        body: query(params),
    })
}

/**
 * 拉取账单详情
 *
 * @param {object} params 请求参数
 */
export async function fetchUserBillDetail(params) {
    return request(API.USER_BILL_DETAIL, {
        body: query(params),
    })
}
