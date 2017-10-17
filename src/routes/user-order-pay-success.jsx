import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'

import ROUTES from '../config/routes'
import styles from './user-order-pay-success/user-order-pay-success.less'

class UserOrderPaySuccess extends React.Component {
    render() {
        const {
            order: {
                orderListDetail: order,
            },
        } = this.props

        return (
            <div className={styles.container}>
                <h1>支付成功</h1>
                <p>订单编号：<span>{order.code}</span></p>
                <p>交易方式：<span>微信支付</span></p>
                <p>下单时间：<span>{order.order_date}</span></p>
                <p>联系人：<span>{order.address_title}</span></p>
                <p>电话：<span>{order.address_phone}</span></p>
                <p>地址：<span>{order.region_title}{order.village_title}{order.point_title}</span></p>
                <Link
                    to={{
                        pathname: ROUTES.USER_ORDER_DETAIL,
                        query: {
                            code: order.code,
                        },
                    }}
                >
                    查看订单
                </Link>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserOrderPaySuccess)
