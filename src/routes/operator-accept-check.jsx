import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    List,
    Toast,
    Button,
    Checkbox,
} from 'antd-mobile'

import styles from './operator-accept-check/operator-accept-check.less'
import commonStyles from '../app.less'

import GoodList from '../components/goodsList'
import ROUTES from '../config/routes'

const ListItem = List.Item

class OperatorAcceptCheck extends React.Component {
    linkToApplyFeedback = (code) => {
        browserHistory.push(`${ROUTES.OPERATOR_RETURN}?code=${code}`)
    }

    handleConfirmReceipt = () => {
        const {
            dispatch,
            routing: {
                locationBeforeTransitions: {
                    query: {
                        type,
                    },
                },
            },
            operator: {
                checkedOrder,
            },
        } = this.props

        if (checkedOrder.length === 0) {
            Toast.fail('请选择订单', 1)
        }
        else {
            dispatch({
                type: 'operator/fetchOperatorClaim',
                payload: {
                    type: parseInt(type, 10) === 2 ? 2 : 1,
                    code: checkedOrder,
                },
                Toast,
            })
        }
    }

    handleCheckBox = (e, index) => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'operator/saveCheckBoxStatus',
            status: e.target.checked === true ? 1 : 2,
            index,
        })

        dispatch({
            type: 'operator/saveCheckedOrder',
        })
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'operator/removeOperatorClaimOrder',
        })
    }

    render() {
        const {
            operator: {
                operatorClaimOrder: {
                    num,
                    date,
                    orders,
                },
            },
        } = this.props

        return (
            <div className={styles.container}>
                {
                    orders.length !== 0
                    &&
                    <div>
                        <List className={styles.headerContainer}>
                            <ListItem
                                className={styles.date}
                                thumb={require('./operator-order-history/calendar.png')}
                            >{date}</ListItem>
                            <ListItem
                                className={styles.name}
                                extra={
                                    <a href={`tel:${orders[0].address_phone}`}>
                                        {orders[0].address_phone}
                                    </a>
                                }
                                thumb={<div>{num}</div>}
                            >{orders[0].address_title}</ListItem>
                        </List>
                        {
                            orders.map(({ code, details }, index) => (
                                <List className={styles.listContainer} key={index}>
                                    <ListItem
                                        arrow='horizontal'
                                        thumb={
                                            <Checkbox
                                                className={commonStyles.fillCheckbox}
                                                defaultChecked
                                                onChange={(e) => { this.handleCheckBox(e, index) }}
                                            />}
                                        extra={
                                            <a
                                                href='javascript:'
                                                onClick={() => { this.linkToApplyFeedback(code) }}
                                            >
                                                申请售后
                                            </a>
                                        }
                                    >
                                        订单编号：{code}
                                    </ListItem>
                                    <GoodList goodsList={details} />
                                </List>
                            ))
                        }
                        <Button type='primary' onClick={this.handleConfirmReceipt}>确认</Button>
                    </div>
                }
                {
                    orders.length === 0
                    &&
                    <div className={styles.tips}>该订单不在本取菜点，请提醒客户核对订单信息，引导至正确的取菜点。辛苦了！</div>
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(OperatorAcceptCheck)
