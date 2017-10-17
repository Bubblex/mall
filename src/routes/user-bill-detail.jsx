import React from 'react'
import classNames from 'classnames'
import moment from 'moment'
import { connect } from 'dva'

import {
    Flex,
} from 'antd-mobile'
import DocumentTitle from 'react-document-title'

import { weekdays } from '../config/data-item'

import styles from './user-bill-detail/user-bill-detail.less'
import commonStyles from '../app.less'
import dayTitleStyles from './user-bill/day-title.less'
import orderStyles from './user-bill/order.less'

const FlexItem = Flex.Item

class UserBill extends React.Component {
    componentWillUnmount() {
        this.props.dispatch({
            type: 'bill/reset',
        })
    }

    render() {
        const {
            bill: {
                detail: {
                    pay_date: date,
                    discount_price: discountPrice,
                    details = [],
                },
            },
        } = this.props

        return (
            <div>
                <DocumentTitle title='账单详情' />
                <div className={styles.content}>
                    <Flex className={classNames(commonStyles.flexNoMargin, dayTitleStyles.container)}>
                        <FlexItem className={classNames(commonStyles.flexAutoWidth, dayTitleStyles.calendar)}>
                            <div className={dayTitleStyles.calendarIcon} />
                        </FlexItem>
                        <FlexItem className={dayTitleStyles.date}>
                            <div className={dayTitleStyles.text}>{moment(date).format('DD')}日-{weekdays[moment(date).format('e')]}</div>
                        </FlexItem>
                        <FlexItem className={classNames(commonStyles.flexAutoWidth, dayTitleStyles.save)}>
                            <div className={dayTitleStyles.text}>优惠券抵扣{discountPrice && discountPrice.toFixed(2)}元</div>
                        </FlexItem>
                    </Flex>
                    {
                        details.map(item => (
                            <Flex className={classNames(commonStyles.flexNoMargin, orderStyles.container)}>
                                <FlexItem className={orderStyles.code}>
                                    {item.goods_title}{item.specification_title} X {item.num}
                                </FlexItem>
                                <FlexItem className={classNames(commonStyles.flexAutoWidth, orderStyles.price)}>
                                    <span className={classNames(dayTitleStyles.text, styles.samllText)}>已节省</span>
                                    <span className={styles.money}>{(item.o_price - item.p_price).toFixed(2)}</span>
                                </FlexItem>
                            </Flex>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default connect(({ bill }) => {
    return {
        bill,
    }
})(UserBill)
