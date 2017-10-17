import React from 'react'
import { connect } from 'dva'

class MenuScenes extends React.Component {
    render() {
        return (
            <div>
                菜谱 场景页
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(MenuScenes)
