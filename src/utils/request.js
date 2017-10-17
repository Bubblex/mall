import fetch from 'dva/fetch'
import Cookies from 'js-cookie'
import { browserHistory } from 'dva/router'

import { Toast } from 'antd-mobile'
import ROUTES from '../config/routes'

/**
 * 记录请求次数
 *
 * @type {number}
 */
let requestCount = 0

/**
 * 请求默认参数
 * @type {object}
 * @property {string} mode 跨域请求模式
 * @property {string} method 请求方式 GET 或 POST
 * @property {object} headers 请求 header
 * @property {boolean} isCheckToken 是否验证 token
 */
const DEFAULT = {
    mode: 'cors',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('user_token')}`,
    },
    checkToken: false,
}

/**
 * 检测响应状态码
 *
 * @param {any} response 响应参数
 * @return {object} 响应参数或 error
 */
function checkStatus(response) {
    requestCount -= 1

    if (requestCount === 0) {
        Toast.hide()
    }

    if (response.status >= 200 && response.status < 300) {
        return response
    }

    const error = new Error(response.statusText)
    error.response = response
    throw error
}

/**
 * 格式化响应参数为 JSON
 *
 * @param {object} response 响应参数
 * @return {object} 格式化后的响应参数
 */
function parseJSON(response) {
    return response.json()
}

/**
 * 显示指定的响应参数错误信息
 * 当响应参数 status 在 101 至 999 时，通过 antd 中的 Toast 组件展示消息
 * @param {object} response 响应参数
 * @return {object} 响应参数
 */
function showMessage(response) {
    if (response.status === 511) {
        window.location.replace(`/h/oAuth/index?redirect_url=${window.location.pathname}`)
    }
    else if (response.status === 1001) {
        browserHistory.push(ROUTES.FORBIDDEN)
    }
    else if (response.status > 100 && response.status < 400) {
        Toast.success(response.message, 1)
    }
    else if (response.status === 500) {
        Toast.fail(response.message, 1)
    }
    return response
}

/**
 * 接口请求错误处理，避免因为执行错误导致整个程序崩溃
 *
 * @return {object} 默认的接口处理参数
 */
function handleError() {
    Toast.offline('网络错误，请稍后再试', 1.5)

    return {
        response: {
            data: {},
            status: -1000,
            message: '',
        },
    }
}

/**
 * 请求一个 URL，返回一个 Promise
 *
 * @param {string} url 请求地址
 * @param {object} [options] 请求参数，可配置项参数参考 Fetch API：
 * https://github.com/github/fetch
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 * @return {object} 返回响应参数 response 或异常信息 err
 */
export default function request(url, options) {
    const {
        ...fetchOptions
    } = Object.assign({}, DEFAULT, options)

    if (requestCount === 0) {
        Toast.loading('加载中...', 0)
    }

    requestCount += 1

    return fetch(url, fetchOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(showMessage)
        .then(response => ({ response }))
        .catch(handleError)
}
