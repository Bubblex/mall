/**
 * 接口统一前缀
 * @type {string}
 */
const PREFIX = '/api'

export default {
    // 1.1.1 图片上传
    UPLOAD_IMAGE: `${PREFIX}/upload/image`,

    // 1.1.2 发送验证码
    VERIFY_MESSAGE: `${PREFIX}/verify/message`,

    // 1.3.1 获取所有口味标签
    DATA_TASTE: `${PREFIX}/data/taste`,

    // 1.3.2 区/县列表
    DATA_REGION: `${PREFIX}/data/region`,

    // 1.3.3 小区列表
    DATA_VILLAGE: `${PREFIX}/data/village`,

    // 1.3.4 自提点列表
    DATA_POINT: `${PREFIX}/data/point`,

    // 2.1.1 获取授权(待定)
    MEMBER_AUTH: `${PREFIX}/member/auth`,

    // 2.1.2 获取用户基本信息
    MEMBER_BASIC_INFO: `${PREFIX}/member/basic-info`,

    // 2.1.3 获取用户详细信息
    MEMBER_INFO: `${PREFIX}/member/info`,

    // 2.1.4 保存个人信息
    MEMBER_UPDATE_INFO: `${PREFIX}/member/update-info`,

    // 2.1.5 绑定/验证手机号
    MEMBER_BIND: `${PREFIX}/member/bind`,

    // 2.1.6 获取取货码
    MEMBER_QRCODE: `${PREFIX}/member/qrcode`,

    // 2.1.7 扫一扫
    MEMBER_SCANCOD: `${PREFIX}/member/scanCod`,

    // 2.2.1 收藏/取消收藏商品
    COLLECTION_COLLECT: `${PREFIX}/collection/collect`,

    // 2.2.2 查询是否收藏商品
    COLLECTION_COLLECTED: `${PREFIX}/collection/collected`,

    // 2.2.3 我的收藏
    COLLECTED_LIST: `${PREFIX}/collection/list`,

    // 2.3.1 默认收货地址
    ADDRESS_DEFAULT: `${PREFIX}/address/default`,

    // 2.3.2 收货地址列表
    ADDRESS_LIST: `${PREFIX}/address/list`,

    // 2.3.3 收货地址详情
    ADDRESS_DETAIL: `${PREFIX}/address/detail`,

    // 2.3.4 删除收货地址
    ADDRESS_DEl: `${PREFIX}/address/del`,

    // 2.3.5 添加收货地址
    ADDRESS_ADD: `${PREFIX}/address/add`,

    // 2.3.6 修改收货地址
    ADDRESS_MODIFY: `${PREFIX}/address/modify`,

    // 2.4.1 消息列表
    NOTICE_LIST: `${PREFIX}/notice/list`,

    // 2.4.2 阅读消息
    NOTICE_READ: `${PREFIX}/notice/read`,

    // 2.4.3 未读消息数量
    NOTICE_NUM: `${PREFIX}/notice/num`,

    // 2.5.1 操作员-查询用户可取货订单
    OPERATOR_CLAIM_ORDER: `${PREFIX}/operator/claim-order`,

    // 2.5.2 操作员-确定取货
    OPERATOR_CLAIM: `${PREFIX}/operator/claim`,

    // 2.5.3 操作员-历史订单
    OPERATOR_HISTORY: `${PREFIX}/operator/history`,

    // 2.5.4 操作员-当日订单
    OPERATOR_DATE: `${PREFIX}/operator/date`,

    // 2.5.5 操作员-操作员订单详情
    OPERATOR_OEDER_DETAIL: `${PREFIX}/operator/order-detail`,

    // 2.5.6 操作员-提交售后信息
    OPERATOR_FEEDBACK: `${PREFIX}/operator/feedback`,

    // 2.6.1 卡券列表
    TICKET_LIST: `${PREFIX}/ticket/list`,

    // 2.6.2 可用卡券查询
    TICKET_USABLE: `${PREFIX}/ticket/usable`,

    // 2.7.1 账单列表
    USER_BILL: `${PREFIX}/bill/list`,

    // 2.7.2 账单详情
    USER_BILL_DETAIL: `${PREFIX}/bill/detail`,

    // 3.1.1 商品分类
    GOODS_TYPE: `${PREFIX}/goods/type`,

    // 3.1.2 商品详情
    GOODS_DETAIL: `${PREFIX}/goods/detail`,

    // 3.1.3 商品列表
    GOODS_LIST: `${PREFIX}/goods/list`,

    // 3.1.4 排行列表
    GOODS_RANK: `${PREFIX}/goods/rank`,

    // 3.1.5 当季列表(待定)
    GOODS_SEASON: `${PREFIX}/goods/season`,

    // 3.1.6 搜索商品 （废弃）
    // GOODS_SEARCH: `${PREFIX}/goods/search`,

    // 3.1.7 按标签搜索
    GOODS_TAG: `${PREFIX}/goods/tag`,

    // 3.2.1 购物车商品
    CART_GOODS: `${PREFIX}/cart/goods`,

    // 3.2.2 加入购物车
    CART_ADD_GOODS: `${PREFIX}/cart/add-goods`,

    // 3.2.3 勾选/取消购物车商品
    CART_CHECK: `${PREFIX}/cart/check`,

    // 3.2.4 从购物车中移除商品
    CART_REMOVE: `${PREFIX}/cart/remove`,

    // 3.2.5 修改购物车中的商品数量
    CART_NUM: `${PREFIX}/cart/num`,

    // 3.2.6 订单商品加入购物车
    CART_ORDER_GOODS: `${PREFIX}/cart/order-goods`,

    // 3.2.7 查询购物车数量
    CART_TOTAL: `${PREFIX}/cart/total`,

    // 5.1.1 获取订单列表
    ORDER_LIST: `${PREFIX}/order/list`,

    // 5.1.2 获取订单详情
    ORDER_DETAIL: `${PREFIX}/order/detail`,

    // 5.2.1 确认下单
    ORDER_PLACE: `${PREFIX}/order/place`,

    // 5.3.1 支付
    ORDER_PAY: `${PREFIX}/order/pay`,

    // 6.1.1 活动列表
    ACTIVE_LIST: `${PREFIX}/active/list`,

    // 6.1.2 活动详情
    ACTIVE_DETAIL: `${PREFIX}/active/detail`,

    // 6.1.3 一键领取
    ACTIVE_DRAW: `${PREFIX}/active/draw`,
}
