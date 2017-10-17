import React from 'react'
import { connect } from 'dva'

class MenuBuy extends React.Component {
    render() {
        return (
            <div>
                菜谱 我要买
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(MenuBuy)
