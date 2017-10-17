import qs from 'qs'
import request from '../utils/request'

import API from '../config/api'

// 2.6.1 卡券列表
export async function fetchTicketList(params) {
    return request(`${API.TICKET_LIST}?${qs.stringify(params)}`)
}

// 2.6.2 可用卡券查询
export async function fetchTicketUsable(params) {
    return request(`${API.TICKET_USABLE}?${qs.stringify(params)}`, {
        body: JSON.stringify(params),
    })
}
