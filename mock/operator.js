import Mock from 'mockjs'
import { generatePaginateData } from './lib'

export default {
    // 2.5.1 操作员-查询用户可取货订单
    'POST /api/operator/claim-order': {
        status: 1,
        message: '请求成功',
        // data: null,
        data: Mock.mock({
            date: '@datetime("yyyy-MM-dd")',
            num: '@natural(1, 99)',
            'orders|2': [
                {
                    code: /[0-9]{6}/,
                    address_title: '@cname()',
                    address_phone: /[0-9]{11}/,
                    region_title: '@county()',
                    village_title: '@ctitle(5)',
                    village_address: '@ctitle(10)',
                    point_title: '@ctitle(5)',
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
                },
            ],
        }),
    },

    // 2.5.2 操作员-确定取货
    'POST /api/operator/claim': {
        status: 1,
        message: '取货成功',
        data: null,
    },

    // 2.5.3 操作员-历史订单
    'POST /api/operator/history': (req, res) => {
        const mock = Mock.mock({
            date: '@datetime("yyyy-MM-dd")',
            order_num: '@natural(1, 999)',
        })

        res.end(JSON.stringify({
            status: 1,
            message: '请求成功',
            data: generatePaginateData(mock, req.body, { dataName: 'history' }),
        }))
    },

    // 2.5.4 操作员-当日订单
    'POST /api/operator/date': (req, res) => {
        const mock = Mock.mock({
            num: /[0-9]{2}/,
            orders_count: '@natural(1, 999)',
            'orders|4': [{
                code: /[0-9]{6}/,
                address_title: '@cname()',
                address_phone: /[0-9]{11}/,
                details_count: '@natural(1, 99)',
                'details|4': [{
                    goods_id: /[0-9]{6}/,
                    goods_title: '@cname()',
                    goods_image: '@image()',
                    num: /[0-9]{3}/,
                }],
            }],
        })

        res.end(JSON.stringify({
            status: 1,
            message: '请求成功',
            data: Mock.mock({
                ...generatePaginateData(mock, req.body, { dataName: 'packages' }),
                date: '@datetime("yyyy-MM-dd")',
                order_count: '@natural(1, 999)',
            }),
        }))
    },

    // 2.5.5 操作员-操作员订单详情
    'POST /api/operator/order-detail': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            num: '@natural(1, 99)',
            code: /[0-9]{6}/,
            status: 9,
            address_title: '@cname()',
            address_phone: /[0-9]{11}/,
            region_title: '@county()',
            village_title: '@ctitle(5)',
            village_address: '@ctitle(10)',
            point_title: '@ctitle(5)',
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

    // 2.5.6 提交售后信息
    'POST /api/operator/feedback': {
        status: 1,
        message: '提交成功',
        data: null,
    },
}
