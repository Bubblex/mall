import Mock from 'mockjs'

import { generatePaginateData } from './lib'

export default {
    // 2.1.1 获取授权(待定)
    'POST /api/member/auth': {
        status: 1,
        message: '授权成功',
        data: Mock.mock({
            token: /[0-9]{9}/,
        }),
    },

    // 2.1.2 获取用户基本信息
    'POST /api/member/basic-info': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            code: '@natural(1, 1000)',
            is_admin: '@natural(1, 2)',
            image: '@image()',
            order_num: '@natural(3, 100)',
            consume_num: '@natural(3, 1000)',
            discount_num: 22.198,
            ticket_num: '@natural(1, 100)',
            collection_num: '@natural(1, 100)',
            unread_num: 3,
        }),
    },

    // 2.1.3 获取用户详细信息
    'POST /api/member/info': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            code: /[0-9]{6}/,
            image: '@image(140X140)',
            title: '@cname()',
            sex: 1,
            address: '@csentence()',
            phone: /[0-9]{11}/,
            birth: '1990-01-09',
            hobby: '唱歌',
            tags: [
                {
                    value: 2,
                    label: '甜',
                },
                {
                    value: 3,
                    label: '苦',
                },
            ],
            is_follow: '@natural(1, 2)',
            is_info: '@natural(1, 2)',
            is_order: '@natural(1, 2)',
            region: {
                title: '@cname()',
            },
            village: {
                title: '@csentence(8, 15)',
                address: '@csentence(8, 15)',
            },
            point: {
                title: '@csentence(8, 15)',
            },
        }),
    },

    // 2.1.4 保存个人信息
    'POST /api/member/update-info': {
        status: 1,
        message: '保存成功',
        data: Mock.mock({
            is_info: 1,
            'tickets|3': [{
                date_status: '@natural(1, 2)',
                begin_date: '@datetime("yyyy-MM-dd")',
                end_date: '@datetime("yyyy-MM-dd")',
                ticket: {
                    title: '@csentence(5, 10)',
                    content: '@csentence(50, 350)',
                    type: '@natural(1, 3)',
                    achieve_price: '@natural(1, 100)',
                    reduce_price: '@natural(1, 100)',
                    cash_price: '@natural(1, 100)',
                    scene: '@natural(1, 3)',
                    one_type: {
                        id: '@natural(1, 10)',
                        title: '@csentence(2, 4)',
                    },
                    goods_type: {
                        id: '@natural(1, 10)',
                        title: '@csentence(2, 4)',
                    },
                    good: {
                        id: '@natural(1, 10)',
                        title: '@csentence(2, 10)',
                    },
                    gift: {
                        title: '@csentence(8, 15)',
                        goods_title: '@csentence(8, 15)',
                        gift_num: '@natural(1, 100)',
                    },
                },
            }],
        }),
    },

    // 2.1.5 绑定/验证手机号
    'POST /api/member/bind': {
        status: 200,
        message: '短信验证成功',
        data: Mock.mock({
            is_info: 1,
            'tickets|3': [{
                id: '@natural(1, 9999)',
                status: '@natural(1, 2)',
                date_status: '@natural(1, 2)',
                not_applicable: '@csentence(50, 350)',
                title: '@csentence(5, 10)',
                type: '@natural(1, 3)',
                begin_date: '@datetime("yyyy-MM-dd")',
                end_date: '@datetime("yyyy-MM-dd")',
                content: '@csentence(50, 350)',
                achieve_price: '@natural(1, 100)',
                reduce_price: '@natural(1, 100)',
                cash_price: '@natural(1, 100)',
                scene: '@natural(1, 3)',
                one_type: {
                    id: '@natural(1, 10)',
                    title: '@csentence(2, 4)',
                },
                goods_type: {
                    id: '@natural(1, 10)',
                    title: '@csentence(2, 4)',
                },
                good: {
                    id: '@natural(1, 10)',
                    title: '@csentence(2, 10)',
                },
                gift: {
                    title: '@csentence(8, 15)',
                    goods_title: '@csentence(8, 15)',
                    gift_num: '@natural(1, 100)',
                },
            }],
        }),
    },

    // 2.1.6 获取取货码
    'POST /api/member/qrcode': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            date: '@datetime("yyyy年MM月dd日")',
            qrcode: '@image()',
            claim_code: /[0-9]{6}/,
        }),
    },

    // 2.1.7 扫一扫
    'POST /api/member/scanCod': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            config: {
                appId: '@natural(1, 9999)',
                nonceStr: '@natural(1, 9999)',
                timestamp: '@natural(1, 9999)',
                signature: '@natural(1, 9999)',
            },
        }),
    },

    // 2.2.1 收藏/取消收藏商品
    'POST /api/collection/collect': {
        status: 301,
        message: '收藏成功',
        data: null,
    },

    // 2.2.2 查询是否收藏商品
    'POST /api/collection/collected': {
        status: 1,
        message: '查询成功',
        data: {
            collected: 2,
        },
    },

    // 2.2.3 我的收藏
    'POST /api/collection/list': (req, res) => {
        const mock = {
            id: '@natural(1, 9999)',
            title: '@cname()',
            image: '@image("160x140")',
            sell_num: '@natural(1, 9999)',
            specifications: [{
                id: '@natural(1, 9)',
                title: '@cname()',
                is_stock: 1,
                stock: '@natural(1, 9999)',
                o_price: '@float(60, 1000, 2, 2)',
                p_price: '@float(60, 1000, 2, 2)',
            }],
        }

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body, { dataName: 'goods' }),
        }))
    },

    // {
    //     status: 1,
    //     message: '查询成功',
    //     data: Mock.mock({
    //         'goods|4': [{
    //             id: /[0-9]{6}/,
    //             title: '@cname()',
    //             image: '@image()',
    //             sell_num: '@natural(1, 9999)',
    //             specifications: {
    //                 id: '@natural(1, 9)',
    //                 title: '@cname()',
    //                 is_stock: 1,
    //                 stock: '@natural(1, 9999)',
    //                 o_price: '@float(60, 1000, 2, 2)',
    //                 p_price: '@float(60, 1000, 2, 2)',
    //             },
    //         }],
    //         paginate: {
    //             page: 4,
    //             pageSize: 4,
    //             total: /[0-9]{3}/,
    //         },
    //     }),
    // },

    // 2.3.1 默认收货地址
    'POST /api/address/default': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            id: /[0-9]{6}/,
            is_default: 1,
            title: '@cname()',
            phone: /[0-9]{11}/,
            status: 2,
            region: {
                title: '@cname()',
            },
            village: {
                title: '@csentence(8, 15)',
                address: '@csentence(8, 15)',
            },
            point: {
                title: '@csentence(8, 15)',
            },
        }),
    },

    // 2.3.2 收货地址列表
    'POST /api/address/list': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            'address|5': [{
                id: /[0-9]{6}/,
                is_default: 1,
                title: '@cname()',
                phone: /[0-9]{11}/,
                status: 1,
                region: {
                    title: '@cname()',
                },
                village: {
                    title: '@csentence(8, 15)',
                    address: '@csentence(8, 15)',
                },
                point: {
                    title: '@csentence(8, 15)',
                },
            }],
            // address: [],
        }),
    },

    // 2.3.3 收货地址详情
    'POST /api/address/detail': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            id: /[0-9]{6}/,
            is_default: 1,
            title: '@cname()',
            phone: /[0-9]{11}/,
            region: {
                title: '@cname()',
                id: '@natural(1, 1000)',
            },
            village: {
                id: '@natural(1, 1000)',
                title: '@csentence(8, 15)',
                address: '@csentence(8, 15)',
            },
            point: {
                id: '@natural(1, 1000)',
                title: '@csentence(8, 15)',
            },
        }),
    },

    // 2.3.4 删除收货地址
    'POST /api/address/del': {
        status: 302,
        message: '地址删除成功',
        data: null,
    },

    // 2.3.5 添加收货地址
    'POST /api/address/add': {
        status: 303,
        message: '地址添加成功',
        data: null,
    },

    // 2.3.6 修改收货地址
    'POST /api/address/modify': {
        status: 304,
        message: '地址修改成功',
        data: null,
    },

    // 2.4.1 消息列表
    'POST /api/notice/list': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            'notices|5': [{
                title: '@csentence(8, 15)',
                code: '@natural(1, 1000)',
                info: '@cparagraph(15, 35)',
                content: '@cparagraph',
                status: /[1-2]{1}/,
                created_at: '@datetime("yyyy-MM-dd")',
            }],
            paginate: {
                page: 3,
                pageSize: 15,
                total: 100,
            },
        }),
    },

    // 2.4.2 阅读消息
    'POST /api/notice/read': {
        status: 1,
        message: '操作成功',
        data: null,
    },

    // 2.4.3 未读消息数量
    'POST /api/notice/num': {
        status: 1,
        message: '操作成功',
        data: Mock.mock({
            ticket_num: '@natural(1, 1000)',
            system_num: 1,
            flow_num: '@natural(1, 1000)',
        }),
    },
}
