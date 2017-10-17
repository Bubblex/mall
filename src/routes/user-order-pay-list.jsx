import React from 'react'
import { connect } from 'dva'

class UserOrderPayList extends React.Component {
    render() {
        return (
            <div>
                会员模块 结算清单页
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserOrderPayList)
