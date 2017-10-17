/**
 * 路由
 * @type {object}
 */
export default {
    // =====================================
    //
    // 1、通用模块路由
    //
    // =====================================

    // 启动页
    START_UP: '/',

    // 禁用账号页
    FORBIDDEN: '/forbidden',

    // =====================================
    //
    // 2、商品模块路由
    //
    // =====================================

    // 全部商品页
    PRODUCTS_LIST: '/products',

    // 商品详情页
    PRODUCTS_DETAILS: '/products/details',

    // 商品不存在页面
    PRODUCTS_NONE: '/products/none',

    // 特殊推荐 当季
    PRODUCTS_RECOMMEND_SEASON: '/products/recommend/season',

    // 特殊推荐 排行
    PRODUCTS_RECOMMEND_RANKING: '/products/recommend/ranking',

    // 搜索模块
    PRODUCTS_SEARCH: '/products/search',

    // 标签列表页
    PRODUCTS_TAG: '/products/tag',


    // =====================================
    //
    // 3、购物车模块路由
    //
    // =====================================

    // 购物车模块
    SHOPPING_CART: '/shopping-cart',

    // =====================================
    //
    // 4、菜谱模块路由
    //
    // =====================================

    // 菜谱聚合页
    MENU_INDEX: '/menu',

    // 每日三餐页
    MENU_THREE_MEALS: '/menu/three/meals',

    // 场景页
    MENU_SCENES: '/menu/scenes',

    // 全部菜谱列表页
    MENU_LIST: '/menu/list',

    // 菜谱详情页
    MENU_DETAILS: '/menu/details',

    // 步骤页
    MENU_DETAILS_STEPS: '/menu/details/steps',

    // 我要买页
    MENU_BUY: '/menu/buy',

    // =====================================
    //
    // 5、会员模块路由
    //
    // =====================================

    // 个人中心页
    USER_CENTER: '/user',

    // 取货页
    USER_PICKUP: '/user/pickup',

    // 取货说明页
    USER_PICKUP_DESCRIPTION: '/user/pickup/description',

    // 个人信息页
    USER_DATA: '/user/data',

    // 输入姓名页
    USER_DATA_NAME: '/user/data/name',

    // 修改头像页
    USER_DATA_AVATAR: '/user/data/avatar',

    // 手机号绑定页
    USER_DATA_PHONE: '/user/data/phone',

    // 手机号重新绑定页
    USER_DATA_PHONEUPDATE: '/user/data/phoneupdate',

    // 输入爱好页
    USER_DATA_HOBBY: '/user/data/hobby',

    // 详细地址页
    USER_DATA_ADDRESS: '/user/data/address',

    // 选择口味页
    USER_DATA_TASTE: '/user/data/taste',

    // 订单列表页
    USER_ORDER_LIST: '/user/order',

    // 订单详情页
    USER_ORDER_DETAIL: '/user/order/detail',

    // 结算页
    USER_ORDER_PAY: '/user/order/pay',

    // 清单页
    USER_ORDER_PAY_LIST: '/user/order/pay/list',

    // 选择支付方式页
    USER_ORDER_PAY_TYPE: '/user/order/pay/type',

    // 选择优惠卡券页
    USER_ORDER_PAY_CARD: '/user/order/pay/card',

    // 选择地址页
    USER_ORDER_PAY_ADDRESS: '/user/order/pay/address',

    // 支付成功页
    USER_ORDER_PAY_SUCCESS: '/user/order/pay/success',

    // 支付失败页
    USER_ORDER_PAY_FAIL: '/user/order/pay/fail',

    // 我的地址页
    USER_ADDRESS: '/user/address',

    // 新增、编辑地址页
    USER_ADDRESS_ADD: '/user/address/add',

    // 我的卡券列表页
    USER_CARD_LIST: '/user/card',

    // 我的卡券列表页-不可用卡券
    USER_CARD_LIST_UNAVAILABLE: '/user/card/unavailable',

    // 我的收藏页
    USER_COLLECTION: '/user/collection',

    // 消息中心页
    USER_MESSAGE: '/user/message',

    // 消息列表页
    USER_MESSAGE_LIST: '/user/message/list',

    // 关于我们
    USER_ABOUTUS: '/user/aboutus',

    // 账单列表页
    USER_BILL: '/user/bill',

    // 账单详情页
    USER_BILL_DETAIL: '/user/bill/detail',

    // =====================================
    //
    // 6、操作员模块路由
    //
    // =====================================

    // 制台页
    OPERATOR_CONTROL: '/operator',

    // 取菜验收页
    OPERATOR_ACCEPT_CHECK: '/operator/accept/check',

    // 每日订单页
    OPERATOR_ORDER_LIST: '/operator/order/list',

    // 每日订单详情页
    OPERATOR_ORDER_DETAILS: '/operator/order/details',

    // 历史订单页
    OPERATOR_ORDER_HISTORY: '/operator/order/history',

    // 退货页
    OPERATOR_RETURN: '/operator/return',

    // =====================================
    //
    // 7、活动模块路由
    //
    // =====================================

    // 活动场景列表页
    ACTIVITY_LIST: '/activity',

    // 活动场景详情页
    ACTIVITY_DATAILS: '/activity/details',

    // 活动任务页
    ACTIVITY_TASK_INDEX: '/activity/task',

    // 新用户任务首次关注页
    ACTIVITY_TASK_FOLLOW: '/activity/task/follow',

    // 新用户任务完善资料页
    ACTIVITY_TASK_DATA: '/activity/task/data',

    // 新用户任务首次下单
    ACTIVITY_TASK_ORDER: '/activity/task/order',
}
