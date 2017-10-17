import React from 'react'
import { connect } from 'dva'

import OrderStatus from './opreator-order-detail-header/orderStatus'
import Address from './opreator-order-detail-header/address'

class OperatorOrderDetails extends React.Component {
    render() {
        const {
            operator: {
                operatorOrderDetail,
            },
        } = this.props
        return (
            <div>
                <OrderStatus operatorOrderDetail={operatorOrderDetail} />
                <Address operatorOrderDetail={operatorOrderDetail} />
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(OperatorOrderDetails)
