import Mock from 'mockjs'

export default {
    // 3.2.1 购物车商品
    'POST /api/cart/goods': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            'carts|10': [{
                id: '@natural(1, 99)',
                goods: {
                    id: '@natural(1, 99)',
                    title: '@csentence(8, 15)',
                    image: '@image("160x140")',
                    status: 1,
                    type: {
                        status: 1,
                        parent: {
                            status: 1,
                        },
                    },
                },
                num: '@natural(1, 99)',
                status: '@natural(1, 2)',
                menu: {
                    // id: '@natural(1, 99)',
                    // title: '@csentence(8, 15)',
                    id: 10,
                    title: '菜谱名称',
                },
                specification: {
                    id: '@natural(1, 9)',
                    title: '@cname()',
                    is_stock: 1,
                    stock: 8,
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                },
            }],
        }),
    },

    // 3.2.2 加入购物车
    'POST /api/cart/add-goods': {
        status: 1,
        message: '加入购物车成功',
        data: null,
    },

    // 3.2.3 勾选/取消购物车商品
    'POST /api/cart/check': {
        status: 1,
        message: '操作成功',
        data: null,
    },

    // 3.2.4 从购物车中移除商品
    'POST /api/cart/chremoveeck': {
        status: 1,
        message: '操作成功',
        data: null,
    },

    // 3.2.5 修改购物车中的商品数量
    'POST /api/cart/num': {
        status: 1,
        message: '查询成功',
        data: null,
    },

    // 3.2.6 订单商品加入购物车
    'POST /api/cart/order-goods': {
        status: 1,
        message: '查询成功',
        data: null,
    },

    // 3.2.7 查询购物车数量
    'POST /api/cart/total': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            num: '@natural(1, 9)',
        }),
    },
}
