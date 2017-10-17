export const CHOOSE_SIZE_TYPE = {
    // 购买
    BUY: 1,
    // 添加购物车
    ADD_CART: 2,
    // 选择
    CHOOSE: 3,
}

// 客服电话
export const CONSUMER_HOTLINE = '12345678'

// 短信验证码倒计时长
export const PHONE_CODE_SECOND = 60

// 订单状态
export const ORDER_STATUS = {
    // 待支付
    TO_BE_PAG: 1,
    // 已付款
    ALREADY_PAY: 2,
    // 发货中
    IN_DELIVERY: 3,
    // 待取货
    TO_BE_PICK_UP: 4,
    // 已完成
    FINISHED: 5,
    // 已取消
    CANCEL: 6,
    // 售后申请中
    APPLT_FOR_SALE: 7,
    // 售后处理中
    PROCESS_FOR_SALE: 8,
    // 售后已完成
    FINISHED_FOR_SALE: 9,
}

// 订单状态
export const ORDER_STATUS_MAP = {
    1: '待支付',
    2: '已付款',
    3: '发货中',
    4: '待取货',
    5: '已完成',
    6: '已取消',
    7: '售后申请中',
    8: '售后处理中',
    9: '售后已完成',
}

// 卡券类型
export const TICKET_TYPE = {
    // 满减券
    FULL_REDUCT_CARD: 1,
    // 代金券
    REPLACE_CASH_CARD: 2,
    // 礼品券
    GIFT_CARD: 3,
}

/**
 * 购物车勾选状态
 *
 * @property {number} CHECK 勾选
 * @property {number} UNCHECK 未勾选
 */
export const SHOPPING_CART_STATUS = {
    CHECK: 1,
    UNCHECK: 2,
}

/**
 * 库存数量计算方式
 *
 * @property {number} COUNT 计数
 * @property {number} INFINITE 无限
 */
export const STOCK = {
    COUNT: 1,
    INFINITE: 2,
}
// 卡券类型
export const TICKET_TYPE_MAP = {
    1: '满减券',
    2: '代金券',
    3: '礼品券',
}

// 卡券状态
export const TICKET_STATUS = {
    // 可用
    AVAILABLE: 1,
    // 已过期
    EXPIRED: 2,
    // 已使用
    USED: 3,
}

// 卡券使用场景
export const TICKET_SCENE = {
    // 所有商品
    ALL_GOODS: 1,
    // 商品分类
    GOODS_TYPE: 2,
    // 单个商品
    GOOD: 3,
}

// 卡券在结算页是否可用
export const TICKET_USE_STATUS = {
    // 可用
    CAN_USE: 1,
    // 不可用
    CANNOT_USE: 2,
}

// 性别
export const SEX = {
    // 男
    MALE: 1,
    // 女
    FEMALE: 2,
    // 保密
    NONE: 3,
}

// 星期
export const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
