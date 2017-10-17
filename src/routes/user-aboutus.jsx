import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd-mobile'

import {
    CONSUMER_HOTLINE,
} from '../config/data-item'

import styles from './user-aboutus/user-aboutus.less'

import aboutusImg from './user-aboutus/aboutus.jpg'

class UserAboutus extends React.Component {
    render() {
        return (
            <div>
                <div className={styles.container}>
                    <span className={styles.title}>公司简介</span>
                    <div className={styles.info}>
                        <img src={aboutusImg} alt='' />
                        公司简介公司简介公司简介
                    </div>
                </div>
                <a
                    className={styles.contact}
                    href={`tel:${CONSUMER_HOTLINE}`}
                >
                    <Button>联系客服</Button>
                </a>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserAboutus)
