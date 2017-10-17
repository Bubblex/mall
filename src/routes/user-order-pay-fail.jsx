import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import className from 'classnames'

import ROUTES from '../config/routes'
import styles from './user-order-pay-success/user-order-pay-success.less'

class UserOrderPayFail extends React.Component {
    render() {
        const {
            order: {
                orderListDetail: order,
            },
        } = this.props

        return (
            <div className={className(styles.container, styles.containeraFail)}>
                <h1>支付失败</h1>
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
})(UserOrderPayFail)
