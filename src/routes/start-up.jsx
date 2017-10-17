import React from 'react'
import { connect } from 'dva'

class StartUp extends React.Component {
    render() {
        return (
            <div>
                <p>启动页</p>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(StartUp)
