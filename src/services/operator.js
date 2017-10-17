import qs from 'qs'
import request from '../utils/request'

import { query } from '../utils/library'

import {
    OPERATOR_CLAIM_ORDER,
    OPERATOR_CLAIM,
    OPERATOR_HISTORY,
    OPERATOR_DATE,
    OPERATOR_OEDER_DETAIL,
    OPERATOR_FEEDBACK,
} from '../config/api'

// 2.5.1 操作员-查询用户可取货订单
export async function fetchOperatorClaimOrder(params) {
    return request(`${OPERATOR_CLAIM_ORDER}?${qs.stringify(params)}`)
}

// 2.5.2 操作员-确定取货
export async function fetchOperatorClaim(params) {
    return request(`${OPERATOR_CLAIM}?${qs.stringify(params)}`, {
        body: JSON.stringify(params),
    })
}

// 2.5.3 操作员-历史订单
export async function fetchOperatorHistory(params) {
    return request(OPERATOR_HISTORY, {
        body: query(params),
    })
}

// 2.5.4 操作员-当日订单
export async function fetchOperatorDate(params) {
    return request(OPERATOR_DATE, {
        body: query(params),
    })
}

// 2.5.5 操作员-操作员订单详情
export async function fetchOperatorOrderDetail(params) {
    return request(`${OPERATOR_OEDER_DETAIL}?${qs.stringify(params)}`)
}

// 2.5.6 操作员-提交售后信息
export async function fetchOperatorFeedback(params) {
    return request(`${OPERATOR_FEEDBACK}`, {
        body: JSON.stringify(params),
    })
}
