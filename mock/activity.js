import Mock from 'mockjs'

export default {
    // 6.1.1 活动列表
    'POST /api/active/list': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            // actives: [],
            'actives|4': [{
                id: '@natural(1, 99)',
                title: '@csentence(8, 15)',
                image: '@image()',
                begin_date: '@datetime("yyyy.MM.dd")',
                end_date: '@datetime("yyyy.MM.dd")',
                status: '@natural(1, 4)',
            }],
            paginate: {
                page: 2,
                pageSize: 15,
                total: 100,
            },
        }),
    },

    // 6.1.2 活动详情
    'POST /api/active/detail': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            id: '@natural(1, 99)',
            title: '@csentence(8, 15)',
            image: '@image()',
            begin_date: '@datetime("yyyy.MM.dd")',
            end_date: '@datetime("yyyy.MM.dd")',
            // status: '@natural(1, 4)',
            status: 3,
            type: '@natural(1, 1)',
            all_num: 100,
            surplus_num: 70,
            receive_num: 30,
            content: '@csentence(50, 350)',
            draw: 2,
            'tickets|4': [{
                title: '@csentence(8, 15)',
                type: '@natural(1, 3)',
                begin_date: '@datetime("yyyy.MM.dd")',
                end_date: '@datetime("yyyy.MM.dd")',
                achieve_price: '@natural(1, 100)',
                reduce_price: '@natural(1, 100)',
                cash_price: '@natural(1, 100)',
                scene: '@natural(1, 3)',
                content: '@csentence(10, 50)',
                one_type: {
                    title: '@csentence(2, 5)',
                },
                // one_type: null,
                goods_type: {
                    title: '@csentence(2, 5)',
                },
                good: {
                    title: '@csentence(2, 5)',
                },
                gift: {
                    title: '@csentence(8, 15)',
                    goods_title: '@csentence(8, 15)',
                    gift_num: '@natural(1, 100)',
                },
            }],
        }),
    },

    // 6.1.3 一键领取
    'POST /api/active/draw': {
        status: 305,
        message: '查询成功',
        data: null,
    },
}
