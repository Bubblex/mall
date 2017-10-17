import React from 'react'
import { connect } from 'dva'

class MenuList extends React.Component {
    render() {
        return (
            <div>
                菜谱 列表
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(MenuList)
