import { browserHistory } from 'dva/router'

import {
    Toast,
} from 'antd-mobile'

import {
    fetchOperatorDate,
    fetchOperatorClaim,
    fetchOperatorHistory,
    fetchOperatorFeedback,
    fetchOperatorClaimOrder,
    fetchOperatorOrderDetail,
} from '../services/operator'

import ROUTES from '../config/routes'

const OPERATOR_HISTORY_DETAIL = [
    {
        date: '加载中...',
        order_num: 0,
    },
]

const OPERA_CLAMIN_ORDER = {
    orders: [],
}

const OPERATOR_ORDER_DETAIL = {
    details: [],
}

const ORDER_DATE = {
    date: '加载中...',
    order_count: 0,
    packages: [],
    paginate: {},
}

function handleCheckedOrder(state) {
    const checkedOrder = []

    for (const item of state.operatorClaimOrder.orders) {
        if (item.status === 1) {
            checkedOrder.push(parseInt(item.code, 10))
        }
    }

    return {
        checkedOrder,
    }
}

function handleDefaultCheckedOrder(state) {
    const checkedOrder = []

    for (const item of state.operatorClaimOrder.orders) {
        checkedOrder.push(parseInt(item.code, 10))
    }

    return {
        checkedOrder,
    }
}

export default {
    namespace: 'operator',
    state: {
        // 操作员历史订单列表
        operatorHistory: OPERATOR_HISTORY_DETAIL,
        // 操作员历史订单列表分页
        operatorHistoryPaginate: {},
        // 用户可取货订单列表
        operatorClaimOrder: OPERA_CLAMIN_ORDER,
        // 选中的取货订单列表
        checkedOrder: [],
        // 操作员订单详情
        operatorOrderDetail: OPERATOR_ORDER_DETAIL,
        // 上传图片数组
        images: [],
        // 每日订单页包裹、分页数据
        operatorDate: ORDER_DATE,
    },
    reducers: {
        // 清除操作员订单详情数据
        removeOperatorOrderDetail(state) {
            return {
                ...state,
                operatorOrderDetail: OPERATOR_ORDER_DETAIL,
            }
        },
        // 保存每日订单订单列表、分页数据
        saveOperatorDate(state, { operatorDate }) {
            return {
                ...state,
                operatorDate,
            }
        },
        // 清除每日订单数据
        removeOperatorDate(state) {
            return {
                ...state,
                operatorDate: ORDER_DATE,
            }
        },
        // 保存操作员历史订单列表、分页数据
        saveOperatorHistory(state, { operatorHistory, operatorHistoryPaginate }) {
            return {
                ...state,
                operatorHistory,
                operatorHistoryPaginate,
            }
        },
        // 清除用户可取货订单列表页
        removeOperatorClaimOrder(state) {
            return {
                ...state,
                operatorClaimOrder: OPERA_CLAMIN_ORDER,
            }
        },

        // 保存用户可取货订单列表页数据
        saveOperatorClaimOrder(state, { operatorClaimOrder }) {
            return {
                ...state,
                operatorClaimOrder,
            }
        },
        // 保存checkbox选中状态 1：选中 2：未选中
        saveCheckBoxStatus(state, { status, index }) {
            const newState = state
            newState.operatorClaimOrder.orders[index].status = status

            return {
                ...newState,
            }
        },
        // 保存默认选中数组
        saveDefaultCheckedOrder(state) {
            return {
                ...state,
                ...handleDefaultCheckedOrder(state),
            }
        },
        // 保存选中的数组
        saveCheckedOrder(state) {
            handleCheckedOrder(state)
            return {
                ...state,
                ...handleCheckedOrder(state),
            }
        },
        // 保存操作员订单详情页数据
        saveOperatorOrderDetail(state, { operatorOrderDetail }) {
            return {
                ...state,
                operatorOrderDetail,
            }
        },
        // 保存售后上传图片
        saveFeedbackUploadImage(state, { image }) {
            const stateCopy = state
            stateCopy.images.push({ url: image })

            return {
                ...stateCopy,
            }
        },
        // 移除上传的图片
        removeFeedbackUploadImage(state, { index }) {
            const stateCopy = state
            stateCopy.images.splice(index, 1)
            return {
                ...stateCopy,
            }
        },
    },
    effects: {
        // 2.5.1 操作员-查询用户可取货订单
        *fetchOperatorClaimOrder({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                    message,
                },
            } = yield call(fetchOperatorClaimOrder, payload)

            if (status === 1) {
                const orders = []
                for (const item of data.orders) {
                    orders.push({ ...item, status: 1 })
                }

                yield put({
                    type: 'saveOperatorClaimOrder',
                    operatorClaimOrder: { ...data, orders },
                })

                yield put({
                    type: 'saveDefaultCheckedOrder',
                })
            }
            else if (status === 1300) {
                Toast.fail(message, 1)
            }
        },

        // 2.5.2 操作员-确定取货
        *fetchOperatorClaim({ payload }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchOperatorClaim, payload)

            if (status === 1) {
                Toast.info('用户取货成功', 1)
                browserHistory.replace(ROUTES.OPERATOR_CONTROL)
                // window.location.reload()
            }
        },

        // 2.5.3 操作员-历史订单
        *fetchOperatorHistory({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchOperatorHistory, payload)

            if (status === 1) {
                yield put({
                    type: 'saveOperatorHistory',
                    operatorHistory: data.history,
                    operatorHistoryPaginate: data.paginate,
                })
            }
        },

        // 2.5.4 操作员-当日订单
        *fetchOperatorDate({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchOperatorDate, payload)

            if (status === 1) {
                yield put({
                    type: 'saveOperatorDate',
                    operatorDate: data,
                })
            }
        },

        // 2.5.5 操作员-操作员订单详情
        *fetchOperatorOrderDetail({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchOperatorOrderDetail, payload)

            if (status === 1) {
                yield put({
                    type: 'saveOperatorOrderDetail',
                    operatorOrderDetail: data,
                })
            }
        },

        // 2.5.6 操作员-提交售后信息
        *fetchOperatorFeedback({ payload }, { call }) {
            yield call(fetchOperatorFeedback, payload)
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.OPERATOR_ACCEPT_CHECK) {
                    dispatch({
                        type: 'fetchOperatorClaimOrder',
                        payload: {
                            ...query,
                        },
                    })
                }
                else if (pathname === ROUTES.OPERATOR_ORDER_DETAILS) {
                    dispatch({
                        type: 'fetchOperatorOrderDetail',
                        payload: {
                            ...query,
                        },
                    })
                }
                else if (pathname === ROUTES.OPERATOR_RETURN) {
                    dispatch({
                        type: 'fetchOperatorOrderDetail',
                        payload: {
                            ...query,
                        },
                    })
                }
            })
        },
    },
}
