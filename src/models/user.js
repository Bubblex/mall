import { browserHistory } from 'dva/router'
import ROUTES from '../config/routes'
import STATUS from '../config/status'
import { setInfo } from '../utils/library'

import {
    fetchMenberBasicInfo,
    fetchMenberInfo,
    fetchAddressList,
    fetchAddressDefault,
    fetchMenberQrcode,
    fetchNoticeNum,
    fetchNoticeList,
    fetchMenberBind,
    fetchAddressDel,
    fetchAddressAdd,
    fetchMenberUpdateInfo,
    fetchCollectedList,
    fetchCollectionCollect,
    fetchAddressDetail,
    fetchAddressModify,
} from '../services/user'

const ADDRESS_DETAIL = {
    title: '加载中...',
    phone: '加载中...',
    region: {},
    village: {},
    point: {},
    member: {},
}

const GOODS_COLLECTED = {
    // 收藏的商品列表
    goodsCollectedList: [],

    // 收藏的商品分页信息
    goodsCollectedPaginate: {},

    // 收藏商品的编辑状态
    goodsCollectedEdit: false,

    // 勾选的商品列表
    goodsCollectedChecked: [],

    // 已经被取消收藏的商品
    goodsCollectedDeleted: [],
}

export default {
    namespace: 'user',
    state: {
        // 个人中心信息
        basicInfo: {
            image: require('../assets/default.jpg'),
        },

        // 用户详细信息
        memberInfo: {
            tags: [],
            region: {},
            village: {},
            point: {},
            image: require('../assets/default.jpg'),
        },
        // 收货地址列表
        addressList: [
            {
                region: {},
                village: {},
                point: {},
            },
        ],
        // 默认收货地址
        defaultAddress: {
            region: {},
            village: {},
            point: {},
        },

        // 取货码页面信息
        memberQrcode: {},

        // 消息数量
        noticeNum: {},

        // 消息列表
        noticeList: [],

        // 消息列表分页
        noticePaginate: {},

        // 修改口味中选中的口味
        selectedTag: [],

        // 重新绑定手机当前步骤
        bindPhoneStepCurrent: 0,

        ...GOODS_COLLECTED,

        // 地址详情
        addressDetail: ADDRESS_DETAIL,

        // 第一次完善资料获取卡券信息
        giftCard: {
            tickets: [],
        },

    },
    reducers: {
        // 清除地址详情
        removeAddressDetail(state) {
            return {
                ...state,
                addressDetail: ADDRESS_DETAIL,
            }
        },
        // 保存地址详情
        saveAddressDetail(state, { addressDetail }) {
            return {
                ...state,
                addressDetail,
            }
        },
        // 修改重新绑定手机当前步骤
        changeBindPhoneStepCurrent(state, { bindPhoneStepCurrent }) {
            return {
                ...state,
                bindPhoneStepCurrent,
            }
        },
        // 保存个人中心信息
        saveBasicInfo(state, { basicInfo }) {
            return {
                ...state,
                basicInfo,
            }
        },

        // 保存修改口味中选中的口味
        saveSelectedTag(state, { selectedTag }) {
            return {
                ...state,
                selectedTag,
            }
        },

        // 保存用户详细信息
        saveMemberInfo(state, { memberInfo }) {
            return {
                ...state,
                memberInfo,
            }
        },
        // 保存收货地址列表
        saveAddressList(state, { addressList }) {
            setInfo('addressList', addressList)
            return {
                ...state,
                addressList,
            }
        },
        // 保存默认收货地址
        saveDefaultAddress(state, { defaultAddress }) {
            return {
                ...state,
                defaultAddress,
            }
        },
        // 保存获取的取货码
        saveMemberQrcode(state, { memberQrcode }) {
            return {
                ...state,
                memberQrcode,
            }
        },
        // 保存消息数量
        saveNoticeNum(state, { noticeNum }) {
            return {
                ...state,
                noticeNum,
            }
        },
        // 清除消息列表
        removeNoticeList(state) {
            return {
                ...state,
                noticeList: [],
                noticePaginate: {},
            }
        },
        // 保存消息列表
        saveNoticeList(state, { noticeList, noticePaginate }) {
            return {
                ...state,
                noticeList,
                noticePaginate,
            }
        },

        /**
         * 保存收藏的商品信息
         *
         * @param {object} state
         * @param {object} param
         * @param {object} param.goodsCollectedList 收藏的商品列表
         * @param {object} param.goodsCollectedPaginate 收藏的商品分页信息
         * @return {object}
         */
        saveGoodsCollectedList(state, { goodsCollectedList, goodsCollectedPaginate }) {
            return {
                ...state,
                goodsCollectedList,
                goodsCollectedPaginate,
            }
        },

        /**
         * 修改收藏的商品编辑状态
         *
         * @param {object} state
         * @param {object} param
         * @param {object} param.status 编辑状态
         * @return {object}
         */
        changeGoodsCollectedEditStatus(state, { status }) {
            return {
                ...state,
                goodsCollectedEdit: status,
            }
        },

        /**
         * 勾选 / 取消勾选商品
         *
         * @param {object} state
         * @param {object} param
         * @param {object} param.id 操作商品 id
         * @param {object} param.status 状态
         * @return {object}
         */
        goodsCollectedCheck(state, { id, status }) {
            const goodsCollectedChecked = state.goodsCollectedChecked.slice()

            if (status) {
                goodsCollectedChecked.push(id)
            }
            else {
                const index = goodsCollectedChecked.indexOf(id)

                if (index > -1) {
                    goodsCollectedChecked.splice(index, 1)
                }
            }

            return {
                ...state,
                goodsCollectedChecked,
            }
        },

        resetCollectedCheck(state) {
            return {
                ...state,
                goodsCollectedChecked: [],
            }
        },

        /**
         * 将删除的商品添加至数组
         *
         * @param {object} state
         * @param {object} param
         * @param {object} param.id 商品 id
         * @return {object}
         */
        addGoodsCollectedDeleted(state, { goodsCollectedDeleted }) {
            return {
                ...state,
                goodsCollectedDeleted,
            }
        },

        resetGoodsCollected(state) {
            return {
                ...state,
                ...GOODS_COLLECTED,
            }
        },

        // 第一次完善资料获取卡券信息
        saveGiftCards(state, { giftCard }) {
            if (!giftCard) {
                return {
                    ...state,
                    giftCard: {
                        tickets: [],
                    },
                }
            }

            return {
                ...state,
                giftCard,
            }
        },
    },
    effects: {
        // 2.1.2 获取用户基本信息
        *fetchMenberBasicInfo({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchMenberBasicInfo, payload)

            if (status === 1) {
                yield put({
                    type: 'saveBasicInfo',
                    basicInfo: data,
                })
            }
        },

        // 2.1.3 获取用户详细信息
        *fetchMenberInfo({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchMenberInfo, payload)

            if (status === 1) {
                const defaultTag = []

                for (const tag of data.tags) {
                    defaultTag.push(tag.value)
                }
                yield put({
                    type: 'saveMemberInfo',
                    memberInfo: data,
                })
                yield put({
                    type: 'saveSelectedTag',
                    selectedTag: defaultTag,
                })
            }
        },

        // 2.1.4 保存个人信息
        *fetchMenberUpdateInfo({ payload, back }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchMenberUpdateInfo, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveGiftCards',
                    giftCard: data,
                })

                if (back !== false) {
                    browserHistory.goBack()
                }
            }
        },

        // 2.1.5 绑定/验证手机号
        *fetchMenberBind({ payload }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchMenberBind, payload)

            if (status === STATUS.BIND_PHONE_SUCCESS) {
                browserHistory.goBack()
            }
            else if (status === STATUS.CHECK_PHONE_SECCESS) {
                yield put({
                    type: 'changeBindPhoneStepCurrent',
                    bindPhoneStepCurrent: 1,
                })
                yield put({
                    type: 'common/saveIsGetCode',
                    isGetCode: 0,
                })
            }
            else if (status === STATUS.CHANG_BIND_PHONE_SECCESS) {
                yield put({
                    type: 'changeBindPhoneStepCurrent',
                    bindPhoneStepCurrent: 2,
                })
            }
        },

        // 2.1.6 获取取货码
        *fetchMenberQrcode({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchMenberQrcode, payload)

            if (status === 1) {
                yield put({
                    type: 'saveMemberQrcode',
                    memberQrcode: data,
                })
            }
        },

        // 2.3.1 默认收货地址
        *fetchAddressDefault({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchAddressDefault, payload)

            if (status === 1) {
                yield put({
                    type: 'saveDefaultAddress',
                    defaultAddress: data,
                })
            }
        },

        // 2.3.2 收货地址列表
        *fetchAddressList({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchAddressList, payload)

            if (status === 1) {
                yield put({
                    type: 'saveAddressList',
                    addressList: data.address,
                })
            }
        },

        // 2.3.3 收货地址详情
        *fetchAddressDetail({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchAddressDetail, payload)

            if (status === 1) {
                yield put({
                    type: 'saveAddressDetail',
                    addressDetail: data,
                })
            }
        },

        // 2.3.4 删除收货地址
        *fetchAddressDel({ payload }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchAddressDel, payload)

            if (status === STATUS.DELETE_ADDRESS_SUCCRSS) {
                yield put({
                    type: 'fetchAddressList',
                })
            }
        },

        // 2.3.5 添加收货地址
        *fetchAddressAdd({ payload, state }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchAddressAdd, payload)

            if (status === STATUS.ADD_ADDRESS_SUCCESS) {
                browserHistory.goBack()
            }
        },

        // 2.3.6 修改收货地址
        *fetchAddressModify({ payload }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchAddressModify, payload)

            if (status === STATUS.MODIFY_ADDRESS_SUCCESS) {
                browserHistory.goBack()
            }
        },

        // 2.4.3 未读消息数量
        *fetchNoticeNum({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchNoticeNum, payload)

            if (status === 1) {
                yield put({
                    type: 'saveNoticeNum',
                    noticeNum: data,
                })
            }
        },

        // 2.4.1 消息列表
        *fetchNoticeList({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchNoticeList, payload)

            if (status === 1) {
                yield put({
                    type: 'saveNoticeList',
                    noticeList: data.notices,
                    noticePaginate: data.paginate,
                })
            }
        },

        *fetchCollectedList({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchCollectedList, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveGoodsCollectedList',
                    goodsCollectedList: data.goods,
                    goodsCollectedPaginate: data.paginate,
                })

                yield put({
                    type: 'resetCollectedCheck',
                })
            }
        },

        *fetchCollectionCollect({ payload }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCollectionCollect, payload)

            if (status === STATUS.CANCEL_COLLECT_SUCCESS) {
                if (payload.type === 2) {
                    yield put({
                        type: 'addGoodsCollectedDeleted',
                        goodsCollectedDeleted: payload.goods_id,
                    })
                }

                browserHistory.push(ROUTES.USER_COLLECTION)
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.USER_CENTER) {
                    dispatch({
                        type: 'fetchMenberBasicInfo',
                    })
                }
                else if (pathname === ROUTES.OPERATOR_CONTROL) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                }
                else if (pathname === ROUTES.USER_PICKUP) {
                    dispatch({
                        type: 'fetchMenberQrcode',
                    })
                }
                else if (pathname === ROUTES.USER_MESSAGE) {
                    dispatch({
                        type: 'fetchNoticeNum',
                    })
                }
                else if (pathname === ROUTES.USER_MESSAGE_LIST) {
                    dispatch({
                        type: 'fetchNoticeList',
                        payload: {
                            page: query.page,
                            pageSize: query.pageSize,
                            type: query.type,
                        },
                    })
                }
                else if (pathname === ROUTES.USER_DATA) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                }
                else if (pathname === ROUTES.USER_DATA_NAME) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                }
                else if (pathname === ROUTES.USER_DATA_ADDRESS) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                }
                else if (pathname === ROUTES.USER_DATA_AVATAR) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                }
                else if (pathname === ROUTES.USER_DATA_TASTE) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                    dispatch({
                        type: 'common/fetchDataTaste',
                    })
                }
                else if (pathname === ROUTES.USER_DATA_PHONEUPDATE) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                }
                else if (pathname === ROUTES.USER_ADDRESS) {
                    dispatch({
                        type: 'fetchAddressList',
                    })
                }
                else if (pathname === ROUTES.USER_ADDRESS_ADD) {
                    if (query.id) {
                        dispatch({
                            type: 'fetchAddressDetail',
                            payload: {
                                id: query.id,
                            },
                        })
                    }
                }
            })
        },
    },
}
