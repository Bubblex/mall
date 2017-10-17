import Mock from 'mockjs'

export default {
    // 1.1.1 图片上传
    'POST /api/upload/image': {
        status: 1,
        message: '上传成功',
        data: Mock.mock({
            url: '@image',
        }),
    },

    // 1.1.2 发送验证码
    'POST /api/verify/message': {
        status: 1,
        message: '发送成功',
        data: null,
    },

    // 1.3.1 获取所有口味标签
    'POST /api/data/taste': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            tags: [
                {
                    value: 1,
                    label: '酸',
                },
                {
                    value: 2,
                    label: '甜',
                },
                {
                    value: 3,
                    label: '苦',
                },
                {
                    value: 4,
                    label: '辣',
                },
                {
                    value: 5,
                    label: 'BT辣',
                },
            ],
        }),
    },

    // 1.3.2 区/县列表
    'POST /api/data/region': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            'regions|4': [{
                value: '@natural(1, 9999)',
                label: '@cname()',
            }],
        }),
    },

    // 1.3.3 小区列表
    'POST /api/data/village': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            'villages|4': [{
                value: '@natural(1, 9999)',
                label: '@cname()',
            }],
            // villages: [],
        }),
    },

    // 1.3.4 自提点列表
    'POST /api/data/point': {
        status: 1,
        message: '获取成功',
        data: Mock.mock({
            'points|4': [{
                value: '@natural(1, 9999)',
                label: '@cname()',
            }],
        }),
    },
}
