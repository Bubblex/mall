import {
    Toast,
} from 'antd-mobile'

import {
    fetchDataTaste,
    fetchVerifyMessage,
    fetchDataRegion,
    fetchDataViliage,
    fetchDataPoint,
} from '../services/common'

import ROUTES from '../config/routes'
import { PHONE_CODE_SECOND } from '../config/data-item'

const DATA_REGION = [{
    label: '请选择区/县',
    value: '',
}]

const DATA_VILIAGE = [{
    label: '请选择小区',
    value: '',
}]

const DATA_POINT = [{
    label: '请选择取菜点',
    value: '',
}]

export default {
    namespace: 'common',
    state: {
        // 是否展示tab栏菜单弹层
        isTabberLayerShow: 0,

        // 是否展示分享弹层
        isShareLayerShow: 0,

        // 所有口味数据
        dataTaste: [],

        // 是否获取验证码
        isGetCode: 0,

        // 是否正在获取验证码 0：待获取 1：正在获取
        isGetingCode: 0,

        // 倒计时
        second: PHONE_CODE_SECOND,

        // 区县列表
        dataRegion: DATA_REGION,

        // 小区列表
        dataViliage: DATA_VILIAGE,

        // 自提点
        dataPoint: DATA_POINT,
    },
    reducers: {
        changeTabberLayerDisplay(state, { isTabberLayerShow }) {
            return {
                ...state,
                isTabberLayerShow,
            }
        },
        changeShareLayerDisplay(state, { isShareLayerShow }) {
            return {
                ...state,
                isShareLayerShow,
            }
        },
        // 保存所有口味数据
        saveDataTaste(state, { dataTaste }) {
            return {
                ...state,
                dataTaste,
            }
        },
        // 是否获取过验证码
        saveIsGetCode(state, { isGetCode }) {
            return {
                ...state,
                isGetCode,
            }
        },
        // 是否正在获取验证码
        saveIsGetingCode(state, { isGetingCode }) {
            return {
                ...state,
                isGetingCode,
            }
        },
        // 倒计时
        changeSecond(state, { second }) {
            return {
                ...state,
                second,
            }
        },
        // 保存区县列表
        saveDataRegion(state, { dataRegion }) {
            return {
                ...state,
                dataRegion,
            }
        },
        // 保存小区列表
        saveDataViliage(state, { dataViliage }) {
            return {
                ...state,
                dataViliage: dataViliage.length === 0 ? [{
                    label: '该区/县暂无可选小区',
                    value: -1,
                }] : dataViliage,
            }
        },
        // 保存自提点
        saveDataPoint(state, { dataPoint }) {
            return {
                ...state,
                dataPoint: dataPoint.length === 0 ? [{
                    label: '该小区暂无取菜点',
                    value: -1,
                }] : dataPoint,
            }
        },
    },
    effects: {
        // 1.3.1 获取所有口味标签
        *fetchDataTaste({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchDataTaste, payload)

            if (status === 1) {
                yield put({
                    type: 'saveDataTaste',
                    dataTaste: data.tags,
                })
            }
        },
        // 1.1.2 发送验证码
        *fetchVerifyMessage({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    message,
                },
            } = yield call(fetchVerifyMessage, payload)

            if (status === 1) {
                yield put({
                    type: 'saveIsGetCode',
                    isGetCode: 1,
                })
                yield put({
                    type: 'saveIsGetingCode',
                    isGetingCode: 1,
                })
            }
            else if (status === 0) {
                Toast.fail(message, 1)
            }
        },
        // 1.3.2 区/县列表
        *fetchDataRegion({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchDataRegion, payload)

            if (status === 1) {
                yield put({
                    type: 'saveDataRegion',
                    dataRegion: data.regions,
                })
            }
        },
        // 1.3.3 小区列表
        *fetchDataViliage({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchDataViliage, payload)

            if (status === 1) {
                yield put({
                    type: 'saveDataViliage',
                    dataViliage: data.villages,
                })
            }
        },
        // 1.3.4 自提点列表
        *fetchDataPoint({ payload }, { call, put }) {
            const {
                response: {
                    status,
                    data,
                },
            } = yield call(fetchDataPoint, payload)

            if (status === 1) {
                yield put({
                    type: 'saveDataPoint',
                    dataPoint: data.points,
                })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname === ROUTES.USER_ADDRESS_ADD) {
                    dispatch({
                        type: 'fetchDataRegion',
                    })
                }
                dispatch({
                    type: 'changeTabberLayerDisplay',
                    isTabberLayerShow: 0,
                })
            })
        },
    },
}
