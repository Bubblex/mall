import React from 'react'
import { connect } from 'dva'

import styles from './share-btn/share-btn.less'

class shareLayer extends React.Component {
    openShareLayer = () => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'common/changeShareLayerDisplay',
            isShareLayerShow: 1,
        })
    }

    render() {
        return (
            <div
                className={styles.shareBtn}
                onClick={this.openShareLayer}
            />
        )
    }
}


export default connect((state) => {
    return state
})(shareLayer)
