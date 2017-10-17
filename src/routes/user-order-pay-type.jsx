import React from 'react'
import { connect } from 'dva'

class UserOrderPayType extends React.Component {
    render() {
        return (
            <div>
                会员模块 选择支付方式页
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserOrderPayType)
