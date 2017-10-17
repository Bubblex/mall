import React from 'react'
import classNames from 'classnames'

import {
    Flex,
} from 'antd-mobile'

import commonStyles from '../../app.less'
import styles from './order.less'

const FlexItem = Flex.Item

function Order({ code, price }) {
    return (
        <Flex className={classNames(commonStyles.flexNoMargin, styles.container)}>
            <FlexItem className={styles.code}>
                订单号-{code}
            </FlexItem>
            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.price)}>
                {price.toFixed(2)}
            </FlexItem>
        </Flex>
    )
}

export default Order
