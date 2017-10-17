import { browserHistory } from 'dva/router'
import ROUTES from '../config/routes'
import STATUS from '../config/status'

import {
    fetchGoodstype,
    fetchGoodsDetail,
    fetchGoodsList,
    fetchGoodsSeason,
    fetchGoodsRank,
    fetchGoodsTag,
} from '../services/products'

import {
    fetchCollectionCollect,
    fetchCollectionCollected,
} from '../services/user'

const GOODS_DETAIL = {
    // 商品图片列表
    images: [],
    sell_num: 0,
    title: '加载中...',
    content: '加载中...',
    // 商品标签列表
    tags: [
        {
            value: '1',
            label: '加载中...',
        },
    ],
    // 商品规格列表
    specifications: [
        {
            value: '1',
            label: '加载中...',
            is_stock: 1,
            stock: '0',
            o_price: 0,
            p_price: 0,
        },
    ],
}

const GOOD_TYPE = [{
    label: '',
    value: '',
    children: [{
        label: '',
        value: '',
    }],
}]

const SELECTED_GOOD_TYPE = {
    one: -1,
    two: -1,
    oneIndex: 0,
    twoIndex: 0,
}

const GOOD_LIST = {
    goods: [],
    paginate: {},
}

const GOOD_SEASON_LIST = {
    seasons: [],
    paginate: {},
}

const GOOD_RANK_LIST = {
    goods: [],
    paginate: {},
}

const GOOD_TAG_LIST = {
    goods: [],
    paginate: {},
}

export default {
    namespace: 'products',
    state: {
        // 商品详情
        goodsDetail: GOODS_DETAIL,
        // 是否展示商品图片轮播
        isImageLayerShow: 0,
        // 是否收藏 1: 是 2: 否
        collected: '',
        // 商品规格默认下标
        goodSizeIndex: 0,
        // 商品默认选择数量
        selectedNum: 1,
        // 商品类型
        goodType: GOOD_TYPE,
        // 选中的类型
        selectedGoodType: SELECTED_GOOD_TYPE,
        // 商品列表
        goodList: GOOD_LIST,
        // 当季商品列表
        goodSeasonList: GOOD_SEASON_LIST,
        // 排行列表
        goodRankList: GOOD_RANK_LIST,
        // 商品排行分类
        goodsRankType: 2,
        // 标签列表
        goodTagList: GOOD_TAG_LIST,
        // 商品搜索关键字
        keyword: '',
    },
    reducers: {
        // 保存商品搜索关键字
        saveSearchGoodKeyword(state, { keyword }) {
            return {
                ...state,
                keyword,
            }
        },
        // 保存标签列表数据
        saveGoodTagList(state, { goodTagList }) {
            return {
                ...state,
                goodTagList,
            }
        },
        // 清除特殊推荐商品排行列表数据
        removeGoodsRank(state) {
            return {
                ...state,
                goodRankList: {
                    goods: [],
                    paginate: {},
                },
            }
        },
        // 保存商品排行分类
        saveGoodsRankType(state, { goodsRankType }) {
            return {
                ...state,
                goodsRankType,
            }
        },
        saveGoodsDetail(state, { goodsDetail }) {
            return {
                ...state,
                goodsDetail,
            }
        },
        saveCollected(state, { collected }) {
            return {
                ...state,
                collected,
            }
        },
        saveSelectedNum(state, { selectedNum }) {
            return {
                ...state,
                selectedNum,
            }
        },
        //  清除商品列表页数据
        removeGoodsList(state) {
            return {
                ...state,
                goodList: GOOD_LIST,
            }
        },
        // 清除当季列表页数据
        removeSeasonList(state) {
            return {
                ...state,
                goodSeasonList: GOOD_SEASON_LIST,
            }
        },
        // 清除商品详情页的数据
        removeGoodsDetail(state) {
            return {
                ...state,
                goodsDetail: GOODS_DETAIL,
                collected: '',
                isImageLayerShow: 0,
                goodSizeIndex: 0,
                selectedNum: 1,
            }
        },
        changeImagesLayerDisplay(state, { isImageLayerShow }) {
            return {
                ...state,
                isImageLayerShow,
            }
        },
        changeGoodSizeIndex(state, { goodSizeIndex }) {
            return {
                ...state,
                goodSizeIndex,
            }
        },
        // 保存商品分类
        saveGoodType(state, { goodType }) {
            return {
                ...state,
                goodType,
            }
        },
        // 改变选中的类型
        changeSelectedGoodType(state, { selectedGoodType }) {
            return {
                ...state,
                selectedGoodType,
            }
        },
        // 保存商品列表
        saveGoodList(state, { goodList }) {
            return {
                ...state,
                goodList,
            }
        },
        // 保存当季商品列表
        saveGoodSeasonList(state, { goodSeasonList }) {
            return {
                ...state,
                goodSeasonList,
            }
        },
        // 保存排行列表
        saveGoodRankList(state, { goodRankList }) {
            return {
                ...state,
                goodRankList,
            }
        },
    },
    effects: {
        *fetchGoodsDetail({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchGoodsDetail, payload)

            if (status === 1) {
                yield put({
                    type: 'saveGoodsDetail',
                    goodsDetail: data,
                })
            }
            else if (status === STATUS.PRODUCTS_NONE) {
                browserHistory.push(ROUTES.PRODUCTS_NONE)
            }
        },
        *fetchCollectionCollect({ payload }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCollectionCollect, payload)

            if (status === STATUS.COLLECT_SUCCESS) {
                yield put({
                    type: 'saveCollected',
                    collected: 1,
                })
            }
            else if (status === STATUS.CANCEL_COLLECT_SUCCESS) {
                yield put({
                    type: 'saveCollected',
                    collected: 2,
                })
            }
        },
        *fetchCollectionCollected({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchCollectionCollected, payload)

            if (status === 1) {
                yield put({
                    type: 'saveCollected',
                    collected: data.collected,
                })
            }
        },

        // 3.1.1 商品分类
        *fetchGoodstype({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchGoodstype, payload)

            if (status === 1) {
                yield put({
                    type: 'saveGoodType',
                    goodType: data.goods_type,
                })
            }
        },

        // 3.1.3 商品列表
        *fetchGoodsList({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchGoodsList, payload)

            if (status === 1) {
                yield put({
                    type: 'saveGoodList',
                    goodList: data,
                })
            }
        },

        // 3.1.5 当季列表
        *fetchGoodsSeason({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchGoodsSeason, payload)

            if (status === 1) {
                yield put({
                    type: 'saveGoodSeasonList',
                    goodSeasonList: data,
                })
            }
        },

        // 3.1.5 排行列表
        *fetchGoodsRank({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchGoodsRank, payload)

            if (status === 1) {
                yield put({
                    type: 'saveGoodRankList',
                    goodRankList: data,
                })
            }
        },

        // 3.1.7 按标签搜索
        *fetchGoodsTag({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchGoodsTag, payload)

            if (status === 1) {
                yield put({
                    type: 'saveGoodTagList',
                    goodTagList: data,
                })
            }
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.PRODUCTS_DETAILS) {
                    localStorage.clear()
                    dispatch({
                        type: 'fetchGoodsDetail',
                        payload: {
                            ...query,
                        },
                    })
                    dispatch({
                        type: 'fetchCollectionCollected',
                        payload: {
                            goods_id: query.id,
                        },
                    })
                }
                else if (pathname === ROUTES.PRODUCTS_LIST) {
                    dispatch({
                        type: 'fetchGoodstype',
                    })
                }
            })
        },
    },
}
