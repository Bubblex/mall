import ROUTES from '../config/routes'
import {
    getInfo,
    setInfo,
} from '../utils/library'

import {
    fetchTicketList,
    fetchTicketUsable,
} from '../services/ticket'

export default {
    namespace: 'ticket',
    state: {
        // 我的卡券列表
        ticketsList: {
            tickets: [],
            paginate: {},
        },

        // 卡券状态
        status: 2,

        // 可用卡券列表
        ticketUsableList: [],
    },
    reducers: {
        // 保存可用卡券列表
        saveTicketUsableList(state, { ticketUsableList }) {
            setInfo('localTicketUsableList', ticketUsableList)
            return {
                ...state,
                ticketUsableList,
            }
        },

        // 保存我的卡券列表
        saveTicketList(state, { ticketsList }) {
            return {
                ...state,
                ticketsList,
            }
        },

        // 保存卡券状态
        saveTicketStatus(state, { status }) {
            return {
                ...state,
                status,
            }
        },

        // 清空卡券列表
        emptyTicketList(state) {
            return {
                ...state,
                ticketsList: {
                    tickets: [],
                    paginate: {},
                },
            }
        },
    },
    effects: {
        // 2.6.1 卡券列表
        *fetchTicketList({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchTicketList, payload)

            if (status === 1) {
                yield put({
                    type: 'saveTicketList',
                    ticketsList: data,
                })
            }
        },

        // 2.6.2 可用卡券查询
        *fetchTicketUsable({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchTicketUsable, payload)

            if (status === 1) {
                yield put({
                    type: 'saveTicketUsableList',
                    ticketUsableList: data.tickets,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            const selectedGoods = !getInfo('selectedGoods') ? [] : getInfo('selectedGoods')
            const goods = []

            if (selectedGoods.length !== 0) {
                for (const arr of selectedGoods) {
                    goods.push({
                        goods_id: arr.goods_id,
                        specification_id: arr.specification_id,
                        num: arr.num,
                    })
                }
            }

            return history.listen(({ pathname }) => {
                if (pathname === ROUTES.USER_CARD_LIST) {
                    // dispatch({
                    //     type: 'fetchTicketList',
                    //     payload: {
                    //         status: 1,
                    //         page: 1,
                    //         pageSize: 15,
                    //     },
                    // })
                    dispatch({
                        type: 'products/fetchGoodstype',
                    })
                }
                else if (pathname === ROUTES.USER_CARD_LIST_UNAVAILABLE) {
                    dispatch({
                        type: 'emptyTicketList',
                    })
                    dispatch({
                        type: 'fetchTicketList',
                        payload: {
                            status: 2,
                            page: 1,
                            pageSize: 15,
                        },
                    })
                }
                else if (pathname === ROUTES.USER_ORDER_PAY_CARD) {
                    dispatch({
                        type: 'fetchTicketUsable',
                        payload: { goods },
                    })
                }
                else if (pathname === ROUTES.USER_ORDER_PAY) {
                    dispatch({
                        type: 'fetchTicketUsable',
                        payload: { goods },
                    })
                }
            })
        },
    },
}
