import { Toast } from 'antd-mobile'
import ROUTES from '../config/routes'

import {
    fetchActiveList,
    fetchActiveDetail,
    fetchActiveDraw,
} from '../services/activity'

import {
    fetchMenberInfo,
} from '../services/user'

export default {
    namespace: 'activity',
    state: {
        // 活动列表
        actives: [],

        // 活动列表分页
        activesPaginate: {},

        // 活动状态
        status: 1,

        // 活动详情
        activeDetail: {},
        tickets: [],
        draw: null,

        // 任务活动页面
        task: {},
    },
    reducers: {
        // 保存活动列表
        saveActivityList(state, { actives, activesPaginate }) {
            return {
                ...state,
                actives,
                activesPaginate,
            }
        },

        // 保存卡券状态
        saveActivityStatus(state, { status }) {
            return {
                ...state,
                status,
            }
        },

        // 清空活动列表
        emptyActivityList(state) {
            return {
                ...state,
                actives: [],
                activesPaginate: {},
            }
        },

        // 保存活动详情
        saveActivityDetail(state, { activeDetail, tickets, draw }) {
            return {
                ...state,
                activeDetail,
                tickets,
                draw,
            }
        },

        // 保存展开卡券详情的状态
        saveIsDispalyContent(state, { isDispalyContent, index }) {
            const commit = state.activeDetail.tickets.slice()
            commit[index].isDispalyContent = isDispalyContent

            return {
                ...state,
                tickets: commit,
            }
        },

        // 保存卡券领取状态
        saveActivityDraw(state, { draw }) {
            return {
                ...state,
                draw,
            }
        },

        // 保存任务活动
        saveActivityTask(state, { task }) {
            return {
                ...state,
                task,
            }
        },
    },
    effects: {
        // 请求活动列表
        *fetchActiveLists({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchActiveList, payload)

            if (status === 1) {
                yield put({
                    type: 'saveActivityList',
                    actives: data.actives,
                    activesPaginate: data.paginate,
                })
            }
        },

        // 请求活动详情
        *fetchActiveDetail({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchActiveDetail, payload)

            if (status === 1) {
                yield put({
                    type: 'saveActivityDetail',
                    activeDetail: data,
                    tickets: data.tickets,
                    draw: data.draw,
                })
            }
        },

        // 请求一键领取
        *fetchActiveDraw({ payload, query }, { call, put }) {
            const {
                response: {
                    status,
                },
            } = yield call(fetchActiveDraw, payload)

            if (status === 305) {
                Toast.success('卡券领取成功', 1)
                yield put({
                    type: 'saveActivityDraw',
                    draw: 1,
                })

                yield put({
                    type: 'fetchActiveDetail',
                    payload: {
                        ...query,
                    },
                })
            }
            else if (status === 306) {
                Toast.offline('卡券已被领完', 1)
            }
            else if (status === 307) {
                Toast.fail('卡券领取失败', 1)
            }
        },

        // 请求用户详细信息，判定是否完成任务
        *fetchMenberInfo({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchMenberInfo, payload)

            if (status === 1) {
                yield put({
                    type: 'saveActivityTask',
                    task: data,
                })
            }
        },

    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === ROUTES.ACTIVITY_LIST) {
                    dispatch({
                        type: 'fetchActiveLists',
                        payload: {
                            status: 1,
                            page: 1,
                            pageSize: 15,
                        },
                    })
                }
                else if (pathname === ROUTES.ACTIVITY_DATAILS) {
                    dispatch({
                        type: 'fetchActiveDetail',
                        payload: {
                            id: query.id,
                        },
                    })
                }
                else if (pathname === ROUTES.ACTIVITY_TASK_INDEX) {
                    dispatch({
                        type: 'fetchMenberInfo',
                    })
                }
            })
        },
    },
}
