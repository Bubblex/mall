import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    Flex,
} from 'antd-mobile'
import ROUTES from '../config/routes'

import styles from './user-message/user-message.less'

import card from './user-message/card.png'
import system from './user-message/system.png'
import logistics from './user-message/logistics.png'

class UserMessage extends React.Component {
    render() {
        const {
            user: {
                noticeNum: {
                    ticket_num: ticketNum,
                    system_num: systemNum,
                    flow_num: flowNum,
                },
            },
        } = this.props

        return (
            <div className={styles.container}>
                <Flex
                    direction='row'
                    className={styles.line}
                    onClick={() => {
                        browserHistory.push(`${ROUTES.USER_MESSAGE_LIST}?page=1&pageSize=15&type=1`)
                    }}
                >
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        <img className={styles.img} src={card} alt='' />
                    </Flex.Item>
                    <Flex.Item>卡券通知</Flex.Item>
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        {
                            ticketNum > 0
                            &&
                            <span className={styles.num}>{ticketNum > 999 ? '999+' : ticketNum}</span>
                        }
                        {
                            ticketNum <= 0
                            &&
                            <span>{null}</span>
                        }
                    </Flex.Item>
                </Flex>
                <Flex
                    direction='row'
                    className={styles.line}
                    onClick={() => {
                        browserHistory.push(`${ROUTES.USER_MESSAGE_LIST}?page=1&pageSize=15&type=2`)
                    }}
                >
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        <img className={styles.img} src={system} alt='' />
                    </Flex.Item>
                    <Flex.Item>系统通知</Flex.Item>
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        {
                            systemNum > 0
                            &&
                            <span className={styles.num}>{systemNum > 999 ? '999+' : systemNum}</span>
                        }
                        {
                            systemNum <= 0
                            &&
                            <span>{null}</span>
                        }
                    </Flex.Item>
                </Flex>
                <Flex
                    direction='row'
                    className={styles.line}
                    onClick={() => {
                        browserHistory.push(`${ROUTES.USER_MESSAGE_LIST}?page=1&pageSize=15&type=3`)
                    }}
                >
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        <img className={styles.img} src={logistics} alt='' />
                    </Flex.Item>
                    <Flex.Item>物流通知</Flex.Item>
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        {
                            flowNum > 0
                            &&
                            <span className={styles.num}>{flowNum > 999 ? '999+' : flowNum}</span>
                        }
                        {
                            flowNum <= 0
                            &&
                            <span>{null}</span>
                        }
                    </Flex.Item>
                </Flex>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserMessage)
