import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    Flex,
    List,
} from 'antd-mobile'
import ROUTES from '../config/routes'

import styles from './user-center/user-center.less'
import DocumentTitle from 'react-document-title'

class UserCenter extends React.Component {
    render() {
        const {
            basicInfo: {
                title,
                image,
                is_admin: isAdmin,
                unread_num: unreadNum,
                order_num: orderNum,
                ticket_num: ticketNum,
                collection_num: collectionNum,
                discount_num: discountNum,
            },
        } = this.props.user

        return (
            <div className={styles.basicContainer}>
                <DocumentTitle title='我的' />
                <Flex
                    style={{ height: '100%' }}
                    direction='row'
                    className={isAdmin === 1 ? styles.operatorTop : styles.userTop}
                >
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        <img className={styles.photo} src={image} alt='' />
                    </Flex.Item>
                    <Flex.Item
                        className={styles.code}
                        onClick={() => { browserHistory.push(ROUTES.USER_DATA) }}
                    >
                        <p>{title}</p>
                        <span className={styles.edit}>编辑个人资料</span>
                    </Flex.Item>
                    <Flex.Item style={{ flex: '0 0 auto' }}>
                        <span
                            className={styles.click}
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_PICKUP)
                            }}
                        >
                            点我取菜
                        </span>
                    </Flex.Item>
                </Flex>
                <div className={styles.grid}>
                    <Flex>
                        <Flex.Item
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_ORDER_LIST)
                            }}
                        >
                            <p>{orderNum}</p>
                            <p>订单数</p>
                        </Flex.Item>
                        <Flex.Item
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_CARD_LIST)
                            }}
                        >
                            <p>{ticketNum}<span>张</span></p>
                            <p>优惠券</p>
                        </Flex.Item>
                        <Flex.Item
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_COLLECTION)
                            }}
                        >
                            <p>{collectionNum}</p>
                            <p>收藏数</p>
                        </Flex.Item>
                        <Flex.Item
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_BILL)
                            }}
                        >
                            <p><span>￥</span>{discountNum}</p>
                            <p>已节省</p>
                        </Flex.Item>
                    </Flex>
                </div>
                <div className={styles.list}>
                    {
                        isAdmin === 1
                        &&
                        <List className={styles.console}>
                            <List.Item
                                arrow='horizontal'
                                onClick={() => { browserHistory.push(ROUTES.OPERATOR_CONTROL) }}
                            >控制台</List.Item>
                        </List>
                    }
                    <List>
                        <List.Item
                            arrow='horizontal'
                            onClick={() => {
                                window.location.href = ROUTES.USER_ORDER_LIST
                            }}
                        >我的订单</List.Item>
                        <List.Item
                            arrow='horizontal'
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_CARD_LIST)
                            }}
                        >
                            我的优惠券
                        </List.Item>
                        <List.Item
                            arrow='horizontal'
                            onClick={() => { browserHistory.push(ROUTES.USER_COLLECTION) }}
                        >我的收藏</List.Item>
                        <List.Item
                            arrow='horizontal'
                            onClick={() => { browserHistory.push(ROUTES.USER_BILL) }}
                        >我的账单</List.Item>
                        <List.Item
                            arrow='horizontal'
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_MESSAGE)
                            }}
                        >
                            我的消息
                            {
                                unreadNum > 0
                                &&
                                <span className={styles.unreadNum}>
                                    { unreadNum > 999 ? '999+' : unreadNum }
                                </span>
                            }
                            {
                                unreadNum <= 0
                                &&
                                <span>{null}</span>
                            }
                        </List.Item>
                        <List.Item
                            arrow='horizontal'
                            onClick={() => { browserHistory.push(ROUTES.USER_ADDRESS) }}
                        >我的地址</List.Item>
                        <List.Item
                            arrow='horizontal'
                            onClick={() => {
                                browserHistory.push(ROUTES.USER_ABOUTUS)
                            }}
                        >
                            关于速亦鲜
                        </List.Item>
                    </List>
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserCenter)
