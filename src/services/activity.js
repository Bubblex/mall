import qs from 'qs'
import request from '../utils/request'

import API from '../config/api'

// 6.1.1 活动列表
export async function fetchActiveList(params) {
    return request(`${API.ACTIVE_LIST}?${qs.stringify(params)}`)
}

// 6.1.2 活动详情
export async function fetchActiveDetail(params) {
    return request(`${API.ACTIVE_DETAIL}?${qs.stringify(params)}`)
}

// 6.1.3 一键领取
export async function fetchActiveDraw(params) {
    return request(`${API.ACTIVE_DRAW}?${qs.stringify(params)}`)
}
