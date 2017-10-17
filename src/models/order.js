import {
    Toast,
} from 'antd-mobile'

import ROUTES from '../config/routes'
import { setInfo } from '../utils/library'

import {
    fetchOrderPlace,
    fetchOrderList,
    fetchOrderDetail,
    fetchOrderPay,
} from '../services/order'

import { onBridgeReady } from '../utils/wechat'
import { SPECIFICATION_NONE } from '../config/status'

// 订单列表默认数据
const ORDER_LIST_DETAIL = []

// 订单详情默认数据
const ORDER_DETAIL_DEFAULT = {
    address: {},
    ticket: {
        ticket_info: {},
    },
    details: [
        {
            goods_id: '',
        },
    ],
}

export default {
    namespace: 'order',
    state: {
        // 订单列表
        orderList: ORDER_LIST_DETAIL,

        // 订单列表分页
        orderListPaginate: {},

        // 订单列表查询类型 1: 待支付 2: 待取货 3: 已完成 4: 售后
        orderListType: 0,

        // 订单详情
        orderListDetail: ORDER_DETAIL_DEFAULT,

        // 订单详情选项卡展示
        showTabsIndex: '订单详情',

        // 支付信息
        orderPay: {},
    },
    reducers: {
        // 清除订单列表页数据
        removeOrderList(state) {
            return {
                ...state,
                orderList: [],
                // orderListType: 0,
                orderListPaginate: {},
            }
        },
        // 清除订单详情页数据
        removeOrderDetail(state) {
            return {
                ...state,
                showTabsIndex: '订单详情',
                orderListDetail: ORDER_DETAIL_DEFAULT,
            }
        },
        // 清除结算页数据
        removeOrderPay(state) {
            setInfo('remark', '')
            setInfo('addressList', [])
            setInfo('selectedCard', {})
            setInfo('selectedGoods', [])
            return {
                ...state,
            }
        },
        // 保存订单列表的数据
        saveOrderList(state, { orderList, orderListPaginate }) {
            return {
                ...state,
                orderList,
                orderListPaginate,
            }
        },
        // 保存当前订单列表的状态
        saveOrderListType(state, { orderListType }) {
            return {
                ...state,
                orderListType,
            }
        },
        // 保存订单详情的数据
        saveOrderDetail(state, { orderListDetail }) {
            return {
                ...state,
                orderListDetail,
            }
        },
        // 保存订单详情选项卡展示标记
        saveShowTabsIndex(state, { showTabsIndex }) {
            return {
                ...state,
                showTabsIndex,
            }
        },
        // 保存支付信息
        saveOrderPay(state, { orderPay }) {
            return {
                ...state,
                orderPay,
            }
        },
    },
    effects: {
        // 5.2.2 支付
        *fetchOrderPay({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchOrderPay, payload)

            yield put({
                type: 'saveOrderPay',
                orderPay: data,
            })

            if (status === 1) {
                if (typeof WeixinJSBridge === 'undefined') {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
                    }
                    else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
                    }
                }
                else {
                    onBridgeReady(data)
                }
            }
        },

        // 5.2.1 确认下单
        *fetchOrderPlace({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchOrderPlace, payload)

            if (status === 1) {
                yield put({
                    type: 'fetchOrderPay',
                    payload: {
                        ...data,
                    },
                })
            }
            else if (status === SPECIFICATION_NONE) {
                Toast.fail(`${data.specification_title}${data.goods_title}库存不足，请重新下单`, 1)
            }
        },

        // 5.1.1 获取订单列表
        *fetchOrderList({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchOrderList, payload)

            if (status === 1) {
                yield put({
                    type: 'saveOrderList',
                    orderList: data.list,
                    orderListPaginate: data.paginate,
                })
            }
        },

        // 5.1.2 获取订单详情
        *fetchOrderDetail({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchOrderDetail, payload)

            if (status === 1) {
                yield put({
                    type: 'saveOrderDetail',
                    orderListDetail: data,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                // if (pathname === ROUTES.USER_ORDER_LIST) {
                //     dispatch({
                //         type: 'fetchOrderList',
                //     })
                // }

                if (pathname === ROUTES.USER_ORDER_DETAIL) {
                    dispatch({
                        type: 'fetchOrderDetail',
                        payload: {
                            ...query,
                        },
                    })
                }
                else if (pathname === ROUTES.USER_ORDER_PAY_SUCCESS) {
                    dispatch({
                        type: 'fetchOrderDetail',
                        payload: {
                            ...query,
                        },
                    })
                    dispatch({
                        type: 'removeOrderPay',
                    })
                }
                else if (pathname === ROUTES.USER_ORDER_PAY_FAIL) {
                    dispatch({
                        type: 'fetchOrderDetail',
                        payload: {
                            ...query,
                        },
                    })
                    dispatch({
                        type: 'removeOrderPay',
                    })
                }
                else if (pathname === ROUTES.USER_ORDER_PAY) {
                    dispatch({
                        type: 'user/fetchAddressDefault',
                    })
                }
                else if (pathname === ROUTES.USER_ORDER_PAY_ADDRESS) {
                    dispatch({
                        type: 'user/fetchAddressList',
                    })
                }
            })
        },
    },
}
