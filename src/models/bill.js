import moment from 'moment'

import ROUTES from '../config/routes'
import STATUS from '../config/status'
import {
    fetchUserBillList,
    fetchUserBillDetail,
} from '../services/bill'

const DEFAULT_STATE = {
    // 当前账单日期
    date: moment(),

    // 总支出
    expend: 0,

    // 总结省
    save: 0,

    // 账单列表
    list: [],

    // 账单详情
    detail: {},

    // 是否展示日期选择器
    visible: false,

}

export default {
    namespace: 'bill',
    state: {
        ...DEFAULT_STATE,
    },
    reducers: {
        reset(state) {
            return {
                ...state,
                ...DEFAULT_STATE,
            }
        },

        /**
         * 保存账单列表
         *
         * @param {object} state
         * @param {object} param
         * @param {array} param.list 账单列表
         * @return {object}
         */
        saveUserBillList(state, { list, expend, save }) {
            return {
                ...state,
                list,
                expend,
                save,
            }
        },

        /**
         * 保存账单详情数据
         *
         * @param {object} state
         * @param {object} param
         * @param {object} param.detail 账单详情
         * @return {object}
         */
        saveUserBillDetail(state, { detail }) {
            return {
                ...state,
                detail,
            }
        },

        /**
         * 打开日期选择器
         *
         * @param {object} state
         * @return {object}
         */
        openDatePicker(state) {
            return {
                ...state,
                visible: true,
            }
        },

        /**
         * 关闭日期选择器
         *
         * @param {object} state
         * @return {object}
         */
        closeDatePicker(state) {
            return {
                ...state,
                visible: false,
            }
        },

        /**
         * 选择日期
         *
         * @param {object} state
         * @param {object} param
         * @param {object} param.date 选择的日期
         * @return {object}
         */
        chooseDate(state, { date }) {
            return {
                ...state,
                date,
            }
        },
    },
    effects: {
        *fetchUserBillList({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchUserBillList, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveUserBillList',
                    list: data.bills,
                    expend: data.expend,
                    save: data.save,
                })
            }
        },

        *fetchUserBillDetail({ payload }, { call, put }) {
            const {
                response: {
                    data,
                    status,
                },
            } = yield call(fetchUserBillDetail, payload)

            if (status === STATUS.SUCCESS) {
                yield put({
                    type: 'saveUserBillDetail',
                    detail: data.order,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.USER_BILL) {
                    dispatch({
                        type: 'fetchUserBillList',
                        payload: {
                            year: moment().format('YYYY'),
                            month: moment().format('MM'),
                        },
                    })
                }
                else if (pathname === ROUTES.USER_BILL_DETAIL) {
                    dispatch({
                        type: 'fetchUserBillDetail',
                        payload: query,
                    })
                }
            })
        },
    },
}

