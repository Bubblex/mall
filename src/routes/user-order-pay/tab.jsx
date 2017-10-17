import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'

import {
    Flex,
    Toast,
} from 'antd-mobile'

import styles from './tab.less'
import commonStyles from '../../app.less'

import { getInfo } from '../../utils/library'

const FlexItem = Flex.Item

class Tab extends React.Component {
    submitOrderInfo = () => {
        const {
            dispatch,
            user: {
                defaultAddress,
            },
        } = this.props

        const selectedAddressId = !getInfo('selectedAddress') ? '' : getInfo('selectedAddress').id
        const selectedCardId = !getInfo('selectedCard') ? '' : getInfo('selectedCard').id

        const selectedGoods = getInfo('selectedGoods')
        const remark = getInfo('remark')

        const goods = []
        for (const arr of selectedGoods) {
            goods.push({
                cart_id: !arr.cart_id ? undefined : arr.cart_id,
                goods_id: arr.goods_id,
                specification_id: arr.specification_id,
                num: arr.num,
            })
        }

        if (!(defaultAddress.id || selectedAddressId)) {
            Toast.fail('请选择地址', 1)
            return
        }
        else if (!selectedAddressId && defaultAddress.id && defaultAddress.status === 2) {
            Toast.fail('请选择地址', 1)
            return
        }

        dispatch({
            type: 'order/fetchOrderPlace',
            payload: {
                goods,
                address_id: !selectedAddressId ? defaultAddress.id : selectedAddressId,
                ticket_id: selectedCardId,
                remark,
            },
        })
    }

    render() {
        const {
            rightPrice,
        } = this.props
        return (
            <div className={styles.container}>
                <Flex className={classNames(commonStyles.flexNoMargin, styles.flexbox)} alignContent='center'>
                    <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.selectAll)}>
                        实付金额：
                    </FlexItem>
                    <FlexItem className={styles.total}>
                        <span className={classNames(commonStyles.highLightText, styles.price)}>￥{rightPrice.toFixed(2)}</span>
                    </FlexItem>
                    <FlexItem className={commonStyles.flexAutoWidth}>
                        <a href='javascript:' onClick={this.submitOrderInfo} className={styles.settle}>提交订单</a>
                    </FlexItem>
                </Flex>
            </div>
        )
    }
}

export default connect(({ user, order, products, shoppingCart }) => {
    return {
        user,
        order,
        products,
        shoppingCart,
    }
})(Tab)
