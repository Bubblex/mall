import qs from 'qs'
import request from '../utils/request'
import { query } from '../utils/library'

import API from '../config/api'

// 3.1.1 商品分类
export async function fetchGoodstype(params) {
    return request(`${API.GOODS_TYPE}?${qs.stringify(params)}`)
}

// 3.1.2 商品详情
export async function fetchGoodsDetail(params) {
    return request(`${API.GOODS_DETAIL}?${qs.stringify(params)}`)
}

// 3.1.3 商品列表
export async function fetchGoodsList(params) {
    return request(API.GOODS_LIST, {
        body: query(params),
    })
}

// 3.1.4 排行列表
export async function fetchGoodsRank(params) {
    return request(API.GOODS_RANK, {
        body: query(params),
    })
}

// 3.1.5 当季列表
export async function fetchGoodsSeason(params) {
    return request(API.GOODS_SEASON, {
        body: query(params),
    })
}

// 3.1.6 搜索商品 （废弃）
// export async function fetchGoodsSearch(params) {
//     return request(`${API.GOODS_SEARCH}?${qs.stringify(params)}`)
// }

// 3.1.7 按标签搜索
export async function fetchGoodsTag(params) {
    return request(API.GOODS_TAG, {
        body: query(params),
    })
}
