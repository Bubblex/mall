import Mock from 'mockjs'

export default {
    // 2.6.1 卡券列表
    'POST /api/ticket/list': {
        status: 1,
        message: '操作成功',
        data: Mock.mock({
            // tickets: [],
            'tickets|15': [{
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
                    // one_type: null,
                    // goods_type: null,
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
            paginate: {
                page: 2,
                pageSize: 15,
                total: 100,
            },
        }),
    },

    // 2.6.2 可用卡券查询
    'POST /api/ticket/usable': {
        status: 1,
        message: '操作成功',
        data: Mock.mock({
            // tickets: [],
            'tickets|10': [{
                id: '@natural(1, 9999)',
                account_ticket_id: '@natural(1, 9999)',
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
}
