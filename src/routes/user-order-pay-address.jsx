import React from 'react'
import { connect } from 'dva'

import Address from './user-order-pay-address/address'

class UserOrderPayAddress extends React.Component {
    render() {
        return (
            <div>
                <Address />
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserOrderPayAddress)
