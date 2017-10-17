import React from 'react'
import { connect } from 'dva'

class MenuDetails extends React.Component {
    render() {
        return (
            <div>
                菜谱 详情页
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(MenuDetails)
