import Mock from 'mockjs'

import { generatePaginateData } from './lib'

export default {
    // 5.1.1 获取订单列表
    'POST /api/order/list': (req, res) => {
        const mock = Mock.mock({
            code: /[0-9]{6}/,
            status: '@natural(1, 9)',
            order_date: '@datetime("yyyy-MM-dd")',
            goods_num: '@natural(1, 99)',
            p_price: '@float(60, 100, 2, 2)',
            price: '@float(60, 100, 2, 2)',
            'details|4': [{
                goods: {
                    image: '@image()',
                },
            }],
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body),
        }))
    },

    // 5.1.2 获取订单详情
    'POST /api/order/detail': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            code: /[0-9]{6}/,
            // status: /[1-9]{1}/,
            status: 9,
            address_title: '@cname()',
            address_phone: /[0-9]{11}/,
            region_title: '@county()',
            village_title: '@ctitle(5)',
            village_address: '@ctitle(10)',
            point_title: '@ctitle(5)',
            point_image: '@image(140X140)',
            'account|3': [{
                title: '@ctitle(3)',
                phone: /[0-9]{11}/,
            }],
            lng: '117.185564',
            lat: '34.264259',
            o_price: '@float(60, 100, 2, 2)',
            p_price: '@float(60, 100, 2, 2)',
            d_price: '@float(60, 100, 2, 2)',
            price: '@float(60, 100, 2, 2)',
            info: '@ctitle(10)',
            order_date: '@datetime("yyyy-MM-dd")',
            pay_date: '@datetime("yyyy-MM-dd")',
            delivery_date: '@datetime("yyyy-MM-dd")',
            arrival_date: '@datetime("yyyy-MM-dd")',
            deal_date: '@datetime("yyyy-MM-dd")',
            // cancel_date: '@datetime("yyyy-MM-dd")',
            apply_date: '@datetime("yyyy-MM-dd")',
            finish_date: '@datetime("yyyy-MM-dd")',
            ticket: {
                ticket_info: {
                    type: '@natural(1, 3)',
                    title: '礼品券',
                    reduce_price: '@float(60, 100, 2, 2)',
                    cash_price: '@float(60, 100, 2, 2)',
                },
            },
            details: [
                {
                    goods_id: '@natural(1, 99)',
                    goods_title: '@csentence(8, 15)',
                    goods_image: '@image(140X140)',
                    num: '@natural(1, 9999)',
                    specification_id: '@natural(1, 9)',
                    specification_title: '@cname()',
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                    gift: 2,
                },
                {
                    goods_id: '@natural(1, 99)',
                    goods_title: '@csentence(8, 15)',
                    goods_image: '@image(140X140)',
                    num: '@natural(1, 9999)',
                    specification_id: '@natural(1, 9)',
                    specification_title: '@cname()',
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                    gift: 2,
                },
                {
                    goods_id: '@natural(1, 99)',
                    goods_title: '@csentence(8, 15)',
                    goods_image: '@image(140X140)',
                    num: '@natural(1, 9999)',
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                    specification_id: '@natural(1, 9)',
                    specification_title: '@cname()',
                    menu_id: 2,
                    gift: 2,
                    menu_title: '鱼香茄子',
                },
                {
                    goods_id: '@natural(1, 99)',
                    goods_title: '@csentence(8, 15)',
                    goods_image: '@image(140X140)',
                    num: '@natural(1, 9999)',
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                    specification_id: '@natural(1, 9)',
                    specification_title: '@cname()',
                    menu_id: 2,
                    gift: 2,
                    menu_title: '鱼香茄子',
                },
                {
                    goods_id: '@natural(1, 99)',
                    goods_title: '@csentence(8, 15)',
                    goods_image: '@image(140X140)',
                    specification_id: '@natural(1, 9)',
                    specification_title: '@cname()',
                    num: '@natural(1, 9999)',
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                    gift: 1,
                },
            ],
        }),
    },

    // 5.2.1 确认下单
    'POST /api/order/place': {
        status: 1102,
        message: '请求成功',
        data: Mock.mock({
            code: '@natural(1, 99999)',
            goods_title: '@csentence(8, 15)',
            specification_title: '@cname()',
        }),
    },

    // 5.3.1 支付
    'POST /api/order/pay': {
        status: 1,
        message: '请求成功',
        data: Mock.mock({
            code: '@natural(1, 999)',
            wechatPay: {
                appId: '@cname()',
                timeStamp: '@datetime("yyyy-MM-dd")',
                nonceStr: '@natural(1, 999)',
                package: '@natural(1, 999)',
                signType: '@natural(1, 999)',
                paySign: '@natural(1, 999)',
            },
            js: {},
        }),
    },
}
