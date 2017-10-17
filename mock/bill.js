import Mock from 'mockjs'

export default {
    'POST /api/bill/list': (req, res) => {
        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: Mock.mock({
                save: '@float(0, 10000, 2, 2)',
                expend: '@float(0, 10000, 2, 2)',
                'bills|30': [{
                    date: `${req.body.year}-${req.body.month}-01`,
                    expend: '@float(0, 10000, 2, 2)',
                    save: '@float(0, 10000, 2, 2)',
                    'orders|4': [{
                        code: /[0-9]{6}/,
                        price: '@float(1, 100, 2, 2)',
                    }],
                }],
            }),
        }))
    },


    'POST /api/bill/detail': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            order: {
                pay_date: '@datetime("yyyy-MM-dd")',
                discount_price: '@float(1, 100, 2, 2)',
                'details|5': [{
                    goods_id: '@natural(1, 10000)',
                    goods_title: '@csentence(8, 15)',
                    num: '@natural(1, 9999)',
                    specification_title: '@cname()',
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                }],
            },
        }),
    },
}
