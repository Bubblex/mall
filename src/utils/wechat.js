/* global someFunction WeixinJSBridge, wx*/

import { browserHistory } from 'dva/router'
import ROUTES from '../config/routes'
import SITE from '../config/site'

export function onBridgeReady(data) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
            // 公众号名称，由商户传入
            appId: data.wechatPay.appId,

            // 时间戳，自1970年以来的秒数
            timeStamp: data.wechatPay.timeStamp,

            // 随机串
            nonceStr: data.wechatPay.nonceStr,

            // 统一支付接口返回的prepay_id参数值
            package: data.wechatPay.package,

            // 微信签名方式
            signType: data.wechatPay.signType,

            // 微信签名
            paySign: data.wechatPay.paySign,
        },
        (res) => {
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                browserHistory.push(`${ROUTES.USER_ORDER_PAY_SUCCESS}?code=${data.order.code}`)
            }
            else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                browserHistory.push(`${ROUTES.USER_ORDER_PAY_FAIL}?code=${data.order.code}`)
            }
            else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                browserHistory.push(`${ROUTES.USER_ORDER_PAY_FAIL}?code=${data.order.code}`)
            }
        },
   )
}

export function scanQRCode() {
    wx.scanQRCode({
        desc: 'scanQRCode desc',

        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        needResult: 0,

        // 可以指定扫二维码还是一维码，默认二者都有
        scanType: ['qrCode', 'barCode'],
    })
}

export function wechatShare(data) {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
        ...data,

        // 分享图标
        imgUrl: SITE.DOMAIN_NAME + require('../assets/share.jpg'),

        success: () => {
            // 用户确认分享后执行的回调函数
            console.log('分享成功')
        },
        cancel: () => {
            // 用户取消分享后执行的回调函数
            console.log('取消分享')
        },
    })

    // 分享给朋友
    wx.onMenuShareAppMessage({
        ...data,

        // 分享图标
        imgUrl: SITE.DOMAIN_NAME + require('../assets/share.jpg'),

        success: () => {
            // 用户确认分享后执行的回调函数
            console.log('分享成功')
        },
        cancel: () => {
            // 用户取消分享后执行的回调函数
            console.log('取消分享')
        },
    })
}

// 打开微信地图
export function openLocation(data) {
    const {
        lat,
        lng,
        region_title: regionTitle,
        village_title: villageTitle,
        village_address: villageAddress,
        point_title: pointTitle,
    } = data

    wx.openLocation({
        // 纬度，浮点数，范围为90 ~ -90
        latitude: parseFloat(lat),

        // 经度，浮点数，范围为180 ~ -180。
        longitude: parseFloat(lng),

        // 位置名
        name: regionTitle,

        // 地址详情说明
        address: regionTitle + villageTitle + villageAddress + pointTitle,

        // 地图缩放级别,整形值,范围从1~28。默认为最大
        scale: 20,

        // 在查看位置界面底部显示的超链接,可点击跳转
        infoUrl: '',
    })
}

export function setConfig(config) {
    wx.config(config)
}
