import qs from 'qs'
import request from '../utils/request'

import { query } from '../utils/library'

import API from '../config/api'

// 2.1.1 获取授权(待定)
export async function fetchMenberAuth(params) {
    return request(`${API.MEMBER_AUTH}?${qs.stringify(params)}`)
}

// 2.1.2 获取用户基本信息
export async function fetchMenberBasicInfo(params) {
    return request(`${API.MEMBER_BASIC_INFO}?${qs.stringify(params)}`)
}

// 2.1.3 获取用户详细信息
export async function fetchMenberInfo(params) {
    return request(`${API.MEMBER_INFO}?${qs.stringify(params)}`)
}

// 2.1.4 保存个人信息
export async function fetchMenberUpdateInfo(params) {
    return request(API.MEMBER_UPDATE_INFO, {
        body: JSON.stringify(params),
    })
}

// 2.1.5 绑定/验证手机号
export async function fetchMenberBind(params) {
    return request(`${API.MEMBER_BIND}?${qs.stringify(params)}`)
}

// 2.1.6 获取取货码
export async function fetchMenberQrcode(params) {
    return request(`${API.MEMBER_QRCODE}?${qs.stringify(params)}`)
}

// 2.1.7 扫一扫
export async function fetchMenberScancod(params) {
    return request(`${API.MEMBER_SCANCOD}?${qs.stringify(params)}`)
}

// 2.2.1 收藏/取消收藏商品
export async function fetchCollectionCollect(params) {
    return request(API.COLLECTION_COLLECT, {
        body: query(params),
    })
}

// 2.2.2 查询是否收藏商品
export async function fetchCollectionCollected(params) {
    return request(`${API.COLLECTION_COLLECTED}?${qs.stringify(params)}`)
}

// 2.2.3 我的收藏
export async function fetchCollectedList(params) {
    return request(API.COLLECTED_LIST, {
        body: query(params),
    })
}

// 2.3.1 默认收货地址
export async function fetchAddressDefault(params) {
    return request(`${API.ADDRESS_DEFAULT}?${qs.stringify(params)}`)
}

// 2.3.2 收货地址列表
export async function fetchAddressList(params) {
    return request(`${API.ADDRESS_LIST}?${qs.stringify(params)}`)
}

// 2.3.3 收货地址详情
export async function fetchAddressDetail(params) {
    return request(`${API.ADDRESS_DETAIL}?${qs.stringify(params)}`)
}

// 2.3.4 删除收货地址
export async function fetchAddressDel(params) {
    return request(`${API.ADDRESS_DEl}?${qs.stringify(params)}`)
}

// 2.3.5 添加收货地址
export async function fetchAddressAdd(params) {
    return request(`${API.ADDRESS_ADD}?${qs.stringify(params)}`)
}

// 2.3.6 修改收货地址
export async function fetchAddressModify(params) {
    return request(`${API.ADDRESS_MODIFY}?${qs.stringify(params)}`)
}

// 2.4.1 消息列表
export async function fetchNoticeList(params) {
    return request(`${API.NOTICE_LIST}?${qs.stringify(params)}`)
}

// 2.4.2 阅读消息
export async function fetchNoticeRead(params) {
    return request(`${API.NOTICE_READ}?${qs.stringify(params)}`)
}

// 2.4.3 未读消息数量
export async function fetchNoticeNum(params) {
    return request(`${API.NOTICE_NUM}?${qs.stringify(params)}`)
}
