import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { Link, browserHistory } from 'dva/router'

import {
    Flex,
    Radio,
} from 'antd-mobile'

import ROUTES from '../../config/routes'

import styles from './address.less'
import commonStyles from '../../app.less'

import {
    setInfo,
    getInfo,
} from '../../utils/library'

const FlexItem = Flex.Item

class Address extends React.Component {
    saveSelectedAddress = (id, index) => {
        const selectedAddress = {
            id,
            index,
        }

        setInfo('selectedAddress', selectedAddress)
        browserHistory.goBack()
    }

    render() {
        const {
            user: {
                addressList,
                defaultAddress,
            },
        } = this.props

        const selectedAddressId = !getInfo('selectedAddress') ? !defaultAddress ? '' : defaultAddress.status === 2 ? '' : defaultAddress.id : getInfo('selectedAddress').id

        return (
            <div>
                {
                    addressList.map((arr, index) => (
                        <Flex key={index} className={classNames(commonStyles.flexNoMargin, styles.container, arr.status === 2 ? styles.disabled : '')} align='stretch' alignContent='start'>
                            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.select)}>
                                {
                                    arr.status === 1
                                    &&
                                    <Radio
                                        className={commonStyles.radio}
                                        checked={arr.id === selectedAddressId}
                                        onChange={() => { this.saveSelectedAddress(arr.id, index) }}
                                    />
                                }
                                {
                                    arr.status === 2
                                    &&
                                    <Radio
                                        className={commonStyles.radio}
                                        disabled
                                    />
                                }
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
                        </Flex>
                    ))
                }
                <Link
                    className={styles.addAddress}
                    to={{ pathname: ROUTES.USER_ADDRESS_ADD, state: { type: 'pay' } }}
                >新增地址</Link>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Address)
