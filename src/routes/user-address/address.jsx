import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { Link } from 'dva/router'

import {
    Flex,
    Modal,
} from 'antd-mobile'

import ROUTES from '../../config/routes'

import styles from './address.less'
import commonStyles from '../../app.less'

const FlexItem = Flex.Item
const Alert = Modal.alert

class Address extends React.Component {
    handleDeleteAddress = (id) => {
        const {
            dispatch,
        } = this.props
        Alert(
            '确定删除该地址吗',
            '',
            [
                { text: '取消' },
                { text: '删除',
                    onPress: () => {
                        dispatch({
                            type: 'user/fetchAddressDel',
                            payload: {
                                id,
                            },
                        })
                    },
                },
            ],
            'plain-text',
        )
    }

    render() {
        const {
            user: {
                addressList,
            },
        } = this.props

        return (
            <div>
                {
                    addressList.map((arr, index) => (
                        <Flex key={index} className={classNames(commonStyles.flexNoMargin, styles.container, arr.status === 2 ? styles.disabled : '')} align='stretch' alignContent='start'>
                            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.delete)}>
                                <div onClick={() => { this.handleDeleteAddress(arr.id) }} />
                            </FlexItem>
                            <FlexItem className={classNames(styles.addressItem, arr.status === 2 ? styles.disabled : '')}>
                                <p>{arr.title} <span>{arr.phone}</span></p>
                                <p className={styles.addressDetail}>
                                    {
                                        arr.is_default === 1
                                        &&
                                        <span>[默认]</span>
                                    }
                                    {arr.region.title}{arr.village.title}{arr.village.address}{arr.point.title}
                                </p>
                            </FlexItem>
                            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.change)}>
                                <Link
                                    to={{ pathname: ROUTES.USER_ADDRESS_ADD, query: { id: arr.id } }}
                                />
                            </FlexItem>
                        </Flex>
                    ))
                }
                <Link
                    className={styles.addAddress}
                    to={{ pathname: ROUTES.USER_ADDRESS_ADD, state: { type: 'address' } }}
                >新增地址</Link>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Address)
