import React from 'react'
import { connect } from 'dva'

class MenuDetailsSteps extends React.Component {
    render() {
        return (
            <div>
                菜谱 步骤页
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(MenuDetailsSteps)
