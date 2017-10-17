import qs from 'qs'
import request from '../utils/request'

import {
    UPLOAD_IMAGE,
    VERIFY_MESSAGE,
    DATA_TASTE,
    DATA_REGION,
    DATA_VILLAGE,
    DATA_POINT,
} from '../config/api'

// 1.1.1 图片上传
export async function fetchUploadImage(params) {
    return request(`${UPLOAD_IMAGE}?${qs.stringify(params)}`)
}

// 1.1.2 发送验证码
export async function fetchVerifyMessage(params) {
    return request(`${VERIFY_MESSAGE}?${qs.stringify(params)}`)
}

// 1.3.1 获取所有口味标签
export async function fetchDataTaste(params) {
    return request(`${DATA_TASTE}?${qs.stringify(params)}`)
}

// 1.3.2 区/县列表
export async function fetchDataRegion(params) {
    return request(`${DATA_REGION}?${qs.stringify(params)}`)
}

// 1.3.3 小区列表
export async function fetchDataViliage(params) {
    return request(`${DATA_VILLAGE}?${qs.stringify(params)}`)
}

// 1.3.4 自提点列表
export async function fetchDataPoint(params) {
    return request(`${DATA_POINT}?${qs.stringify(params)}`)
}
