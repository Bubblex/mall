import React from 'react'
import { connect } from 'dva'

import {
    Button,
} from 'antd-mobile'

import {
    CONSUMER_HOTLINE,
} from '../config/data-item'

import styles from './forbidden/forbidden-erroe.less'

class Forbidden extends React.Component {
    render() {
        return (
            <div className={styles.forbidden}>
                <p>对不起，您的账号已被禁用。</p>
                <p>如有疑问，请联系客服。</p>
                <Button type='primary'>
                    <a href={`tel:${CONSUMER_HOTLINE}`}>联系客服</a>
                </Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Forbidden)
