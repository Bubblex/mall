import React from 'react'
import { browserHistory } from 'dva/router'

import {
    NavBar,
} from 'antd-mobile'

import ROUTES from '../config/routes'
import styles from './user-nav-bar/user-nav-bar.less'

class userNavBar extends React.Component {
    render() {
        const {
            type,
        } = this.props

        return (
            <div className={styles.container}>
                <NavBar
                    mode='light'
                    onLeftClick={() => { browserHistory.push(ROUTES.USER_DATA) }}
                >{type}</NavBar>
            </div>
        )
    }
}

export default userNavBar
