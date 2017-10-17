import React from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'

class MenuIndex extends React.Component {
    render() {
        return (
            <div>
                <DocumentTitle title='看菜谱' />
                菜谱模块敬请期待
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(MenuIndex)
