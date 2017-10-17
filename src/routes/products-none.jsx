import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    Button,
} from 'antd-mobile'

import ROUTES from '../config/routes.js'

import styles from './products-none/products-none.less'

class ProductsNone extends React.Component {
    render() {
        return (
            <div className={styles.noGood}>
                <p>该商品已下架/不存在</p>
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
})(ProductsNone)
