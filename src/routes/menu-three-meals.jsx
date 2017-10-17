import React from 'react'
import { connect } from 'dva'

class MenuThreeMeals extends React.Component {
    render() {
        return (
            <div>
                菜谱 每日三餐
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(MenuThreeMeals)
