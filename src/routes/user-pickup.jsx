import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    Button,
} from 'antd-mobile'
import ROUTES from '../config/routes'

import styles from './user-pickup/user-pickup.less'

class UserPickup extends React.Component {
    render() {
        const {
            user: {
                memberQrcode: {
                    date,
                    qrcode,
                    claim_code: claimCode,
                },
            },
        } = this.props
        return (
            <div className={styles.container}>
                {
                    qrcode !== ''
                    &&
                    <div className={styles.has}>
                        <p className={styles.date}>
                            <span>{date}17:00-19:00</span>
                        </p>
                        <div className={styles.qr}>
                            <p>您的取货二维码</p>
                            <div className={styles.qrimg}>
                                <img src={qrcode} alt='' />
                            </div>
                        </div>
                        <p className={styles.claimCode}>
                            您的取货码：
                            <span>{claimCode}</span>
                        </p>
                        <p className={styles.description}>
                            <span
                                onClick={() => {
                                    browserHistory.push(ROUTES.USER_PICKUP_DESCRIPTION)
                                }}
                            >
                                取货说明
                            </span>
                        </p>
                    </div>
                }
                {
                    qrcode === ''
                    &&
                    <div className={styles.noOrder}>
                        <p>今天您还没有下单哦，<br /> 点击下方按钮，看看明天吃什么！ </p>
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
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserPickup)
