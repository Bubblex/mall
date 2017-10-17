import React from 'react'
import classNames from 'classnames'

import {
    Flex,
} from 'antd-mobile'

import styles from './orderStatus.less'
import commonStyles from '../../app.less'

import { ORDER_STATUS_MAP } from '../../config/data-item'

const FlexItem = Flex.Item
class OrderStatus extends React.Component {
    render() {
        const {
            operatorOrderDetail: {
                code,
                status,
            },
        } = this.props

        return (
            <div>
                <Flex className={styles.headerContainer}>
                    <FlexItem className={commonStyles.flexAutoWidth}>
                        <div
                            className={
                                classNames(styles.status,
                                    status === 7
                                    ? styles.success
                                    : status === 9 ? styles.success : '')}
                        />
                    </FlexItem>
                    <FlexItem>
                        <p className={styles.statusCode}>{ORDER_STATUS_MAP[parseInt(status, 10)]}</p>
                        <p className={styles.code}>订单编号：{code}</p>
                    </FlexItem>
                </Flex>
            </div>
        )
    }
}

export default OrderStatus
