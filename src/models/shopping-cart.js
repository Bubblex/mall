import { browserHistory } from 'dva/router'

import {
    Popup,
    Toast,
} from 'antd-mobile'

import ROUTES from '../config/routes'
import STATUS from '../config/status'

import {
    fetchCartAddGoods,
    fetchCartGoods,
    fetchCartCheck,
    fetchCartRemove,
    fetchCartNum,
    fetchCartTotal,
    fetchCartOrderGoods,
} from '../services/shopping-cart'

function handleCarts(carts) {
    let totalMoney = 0
    const checkCartId = []
    const checkCarts = []
    const uncheckCarts = []
    const menuGroup = {}

    for (const cart of carts) {
        const menu = cart.menu
        const specification = cart.specification
        const understock = specification.is_stock === 1 && specification.stock === 0
        const forbiddenStatus = cart.goods.status === 1 && cart.goods.type.status === 1 && cart.goods.type.parent.status === 1

        if (cart.status === 1 && !understock && forbiddenStatus) {
            totalMoney += cart.specification.p_price * cart.num
            checkCarts.push(cart)
            checkCartId.push(cart.id)
        }
        else if (cart.status === 2 && !understock) {
            uncheckCarts.push(cart)
        }

        if (menu && !understock) {
            if (!menuGroup[menu.id]) {
                menuGroup[cart.menu.id] = {
                    total: 0,
                    checkNum: 0,
                }
            }

            menuGroup[menu.id].total += 1

            if (cart.status === 1) {
                menuGroup[menu.id].checkNum += 1
            }
        }
    }

    return {
        carts,
        menuGroup,
        totalMoney,
        checkCarts,
        checkCartId,
        uncheckCarts,
    }
}

export default {
    namespace: 'shoppingCart',
    state: {
        // 已选择待下单物品
        selectedGoods: [],

        // 购物车列表
        carts: [],

        // 合计(元)
        totalMoney: 0,

        // 购物车选中的 id
        checkCartId: [],

        // 选中的购物车信息
        checkCarts: [],

        // 未选中的购物车信息
        uncheckCarts: [],

        // 购物车数量
        cartTotal: 0,
    },
    reducers: {
        saveSelectedafaoods(state, { selectedGoods }) {
            return {
                ...state,
                selectedGoods,
            }
        },

        /**
         * 保存购物车列表
         *
         * @param {object} state
         * @param {object} param
         * @param {array} param.carts 购物车列表
         * @param {object} param.paginate 购物车列表分页
         * @return {object} storage
         */
        saveCarts(state, { carts }) {
            return {
                ...state,
                ...handleCarts(carts),
            }
        },

        /**
         * 勾选 / 取消勾选
         * @param {object} state
         * @param {object} param
         * @param {number} param.index 勾选的下标
         * @param {number} param.status 1: 勾选 2: 取消勾选
         * @return {object} storage
         */
        checkCarts(state, { index, status }) {
            const carts = state.carts.slice()
            carts[index].status = status

            return {
                ...state,
                ...handleCarts(carts),
            }
        },

        /**
         * 移除购物车商品
         *
         * @param {object} state
         * @param {object} param
         * @param {number} param.index 移除的下标
         * @return {number}
         */
        removeCarts(state, { index }) {
            const carts = state.carts.slice()
            carts.splice(index, 1)

            return {
                ...state,
                ...handleCarts(carts),
            }
        },

        /**
         * 修改购物车商品数量
         *
         * @param {object} state
         * @param {object} param
         * @param {object} param.index 修改的商品下标
         * @param {object} param.value 修改后的数量
         */
        updateCartsNum(state, { index, value }) {
            const carts = state.carts.slice()
            carts[index].num = value

            return {
                ...state,
                ...handleCarts(carts),
            }
        },

        saveCartTotal(state, { cartTotal }) {
            return {
                ...state,
                cartTotal,
            }
        },
    },
    effects: {
        // 3.2.6 订单商品加入购物车
        *fetchCartOrderGoods({ payload, id }, { call }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCartOrderGoods, payload)

            if (status === STATUS.SUCCESS) {
                browserHistory.push(ROUTES.SHOPPING_CART)
            }
        },

        *fetchCartAddGoods({ payload, id }, { call, put }) {
            const {
                response: {
                    status,
                    message,
                },
            } = yield call(fetchCartAddGoods, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'products/fetchGoodsDetail',
                    payload: { id },
                })
                Popup.hide()
                Toast.success(message, 1)
            }
        },

        *fetchCartGoods({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchCartGoods, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    ...data,
                    type: 'saveCarts',
                })
            }
        },

        *fetchCartCheck({ id, index, status }, { call, put }) {
            const {
                response: {
                    status: responseStatus,
                },
            } = yield call(fetchCartCheck, {
                id,
                type: status,
            })

            if (responseStatus === STATUS.SUCCESS) {
                yield put({
                    type: 'checkCarts',
                    index,
                    status,
                })
            }
        },

        *fetchCartCheckMenu({ carts, status, id }, { put, call }) {
            const {
                response: {
                    status: responseStatus,
                },
            } = yield call(fetchCartCheck, { type: status, id })

            if (responseStatus === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCarts',
                    carts,
                })
            }
        },

        *fetchCartCheckAll({ status, id, carts }, { put, call }) {
            const {
                response: {
                    status: responseStatus,
                },
            } = yield call(fetchCartCheck, { id, type: status })

            if (responseStatus === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCarts',
                    carts,
                })
            }
        },

        *fetchCartRemove({ id, index }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCartRemove, { id })

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'removeCarts',
                    index,
                })
            }
        },

        *fetchCartRemoveMenu({ id, carts }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCartRemove, { id })

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCarts',
                    carts,
                })
            }
        },

        *fetchCartNum({ id, num, index }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchCartNum, { id, num })

            if (status === STATUS.SUCCESS) {
                yield put({
                    index,
                    type: 'updateCartsNum',
                    value: num,
                })
            }
        },

        *fetchCartTotal(state, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchCartTotal)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveCartTotal',
                    cartTotal: data.num,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === ROUTES.SHOPPING_CART) {
                    localStorage.clear()
                    dispatch({
                        type: 'fetchCartGoods',
                    })
                }
                else if (pathname !== ROUTES.FORBIDDEN) {
                    dispatch({
                        type: 'fetchCartTotal',
                    })
                }
            })
        },
    },
}
