import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import classNames from 'classnames'

import {
    Button,
} from 'antd-mobile'

import styles from './forbidden/forbidden-erroe.less'
import ROUTES from '../config/routes.js'

class Error extends React.Component {
    render() {
        return (
            <div className={classNames(styles.forbidden, styles.error)}>
                <p>对不起，您访问的页面找不到了。</p>
                <Button
                    type='primary'
                    onClick={() => {
                        browserHistory.push(ROUTES.PRODUCTS_LIST)
                    }}
                >
                    逛逛菜市
                </Button>
                <Button
                    type='primary'
                    onClick={() => {
                        browserHistory.push(ROUTES.MENU_INDEX)
                    }}
                >
                    看看菜谱
                </Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Error)
