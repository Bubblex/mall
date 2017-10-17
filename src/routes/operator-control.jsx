import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import { scanQRCode } from '../utils/wechat'

import {
    Flex,
    Modal,
    Toast,
} from 'antd-mobile'

import ROUTES from '../config/routes'
import UserInfo from './operator-control/userInfo'
import styles from './operator-control/operator-control.less'

const FlexItem = Flex.Item
const Prompt = Modal.prompt

class OperatorControl extends React.Component {
    showModalPrompt = () => {
        Prompt(
            '请输入取货码',
            '',
            [
                { text: '取消' },
                { text: '提交',
                    onPress: (password) => {
                        if (!password) {
                            Toast.info('请输入取货码', 1)
                        }
                        else {
                            browserHistory.push(`${ROUTES.OPERATOR_ACCEPT_CHECK}?code=${password}&type=2`)
                        }
                    },
                },
            ],
            'plain-text',
        )
    }

    render() {
        return (
            <div className={styles.container}>
                <UserInfo />
                <div className={styles.orderBtnContainer}>
                    <Flex className={styles.orderBtn}>
                        <FlexItem className={styles.today}>
                            <a
                                href='javascript:'
                                onClick={() => { browserHistory.push(`${ROUTES.OPERATOR_ORDER_LIST}?date=current`) }}
                            >
                                今日订单
                            </a>
                        </FlexItem>
                        <FlexItem>
                            <a
                                href='javascript:'
                                onClick={() => { browserHistory.push(ROUTES.OPERATOR_ORDER_HISTORY) }}
                            >
                                历史订单
                            </a>
                        </FlexItem>
                    </Flex>
                </div>
                <Flex className={styles.pickUp}>
                    <FlexItem>
                        <a
                            href='javascript:'
                            className={styles.qrcode}
                            onClick={() => { scanQRCode() }}
                        >
                            二维码取菜
                        </a>
                    </FlexItem>
                    <FlexItem>
                        <a
                            href='javascript:'
                            className={styles.sn}
                            onClick={this.showModalPrompt}
                        >
                            取货码取菜
                        </a>
                    </FlexItem>
                </Flex>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(OperatorControl)
