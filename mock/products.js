import Mock from 'mockjs'
import { generatePaginateData } from './lib'

export default {
    // 3.1.1 商品分类
    'POST /api/goods/type': {
        status: 1,
        message: '查询成功',
        data: Mock.mock({
            'goods_type|18': [{
                label: '@cname()',
                value: '@natural(1, 999)',
                'children|6': [{
                    label: '@cname()',
                    value: '@natural(1, 999)',
                }],
            }],
        }),
    },

    // 3.1.2 商品详情
    'POST /api/goods/detail': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            id: '@natural(1, 99)',
            'images|4': [{
                title: '@csentence(8, 15)',
                image: '@image()',
            }],
            title: '@csentence(8, 15)',
            sell_num: '@natural(1, 9999)',
            content: '@cparagraph',
            image: '@image(200x180)',
            'tags|8': [{
                value: '@natural(1, 9)',
                label: '@cname()',
            }],
            'specifications|3': [
                {
                    value: '@natural(1, 9)',
                    label: '@cname()',
                    is_stock: 2,
                    stock: 99,
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                },
                {
                    value: '@natural(1, 9)',
                    label: '@cname()',
                    is_stock: 1,
                    stock: 2,
                    o_price: '@float(60, 1000, 2, 2)',
                    p_price: '@float(60, 1000, 2, 2)',
                },
            ],
        }),
    },

    // 3.1.3 商品列表
    'POST /api/goods/list': (req, res) => {
        const mock = Mock.mock({
            id: '@natural(1, 99)',
            title: '@csentence(8, 15)',
            image: '@image(140X140)',
            sell_num: '@natural(1, 9999)',
            specifications: [{
                id: '@natural(1, 9)',
                title: '@cname()',
                is_stock: 1,
                stock: '@natural(1, 9999)',
                o_price: '@float(60, 1000, 2, 2)',
                p_price: '@float(60, 1000, 2, 2)',
            }],
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body, { dataName: 'goods' }),
        }))
    },

    // 3.1.4 排行列表
    'POST /api/goods/rank': (req, res) => {
        const mock = Mock.mock({
            id: '@natural(1, 99)',
            title: '@csentence(8, 15)',
            image: '@image(300X300)',
            sells_count: '@natural(1, 9999)',
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body, { dataName: 'goods' }),
        }))
    },

    // 3.1.5 当季列表
    'POST /api/goods/season': (req, res) => {
        const mock = Mock.mock({
            image: '@image(586X290)',
            goods: {
                id: '@natural(1, 99)',
                title: '@csentence(8, 15)',
                sell_num: '@natural(1, 999)',
            },
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body, { dataName: 'seasons' }),
        }))
    },

    // 3.1.6 搜索商品  (废弃)
    // 'POST /api/goods/search': (req, res) => {
    //     const mock = Mock.mock({
    //         id: '@natural(1, 99)',
    //         title: '@csentence(8, 15)',
    //         image: '@image()',
    //         sell_num: '@natural(1, 9999)',
    //         'specifications|6': [{
    //             id: '@natural(1, 9)',
    //             title: '@cname()',
    //             is_stock: 1,
    //             stock: '@natural(1, 9999)',
    //             o_price: '@float(60, 1000, 2, 2)',
    //             p_price: '@float(60, 1000, 2, 2)',
    //         }],
    //     })

    //     res.end(JSON.stringify({
    //         status: 1,
    //         message: '查询成功',
    //         data: generatePaginateData(mock, req.body, { dataName: 'goods' }),
    //     }))
    // },

    // 3.1.7 按标签搜索
    'POST /api/goods/tag': (req, res) => {
        const mock = Mock.mock({
            id: '@natural(1, 99)',
            title: '@csentence(8, 15)',
            image: '@image(140X140)',
            sell_num: '@natural(1, 9999)',
            specifications: [{
                id: '@natural(1, 9)',
                title: '@cname()',
                is_stock: 1,
                stock: '@natural(1, 9999)',
                o_price: '@float(60, 1000, 2, 2)',
                p_price: '@float(60, 1000, 2, 2)',
            }],
        })

        res.end(JSON.stringify({
            status: 1,
            message: '查询成功',
            data: generatePaginateData(mock, req.body, { dataName: 'goods' }),
        }))
    },
}
