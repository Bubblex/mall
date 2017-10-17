import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { Link } from 'dva/router'

import {
    Flex,
} from 'antd-mobile'

import Overview from './user-bill/overview'
import DayTitle from './user-bill/day-title'
import Order from './user-bill/order'

import ROUTES from '../config/routes'

import commonStyles from '../app.less'
import styles from './user-bill/user-bill.less'

const FlexItem = Flex.Item

class UserBill extends React.Component {
    componentWillUnmount() {
        this.props.dispatch({
            type: 'bill/reset',
        })
    }

    render() {
        const {
            list,
        } = this.props.bill

        return (
            <div>
                <Overview />
                <Flex className={classNames(commonStyles.flexNoMargin, styles.listTitle)} justify='center'>
                    <FlexItem className={commonStyles.flexAutoWidth}>
                        <span className={styles.listIcon} />
                    </FlexItem>
                    <FlexItem className={commonStyles.flexAutoWidth}>
                        明细
                    </FlexItem>
                </Flex>
                {
                    list.map(({ date, expend, save, orders }) => (
                        <div className={styles.item}>
                            <DayTitle
                                date={date}
                                save={save}
                                expend={expend}
                            />
                            {
                                orders.map(({ code, price }) => (
                                    <Link to={`${ROUTES.USER_BILL_DETAIL}?code=${code}`}>
                                        <Order
                                            code={code}
                                            price={price}
                                        />
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default connect(({ bill }) => {
    return {
        bill,
    }
})(UserBill)
