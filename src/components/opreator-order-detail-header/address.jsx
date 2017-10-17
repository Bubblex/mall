import React from 'react'

import {
    Flex,
} from 'antd-mobile'

import styles from './address.less'
import commonStyles from '../../app.less'

const FlexItem = Flex.Item
class Address extends React.Component {
    render() {
        const {
            operatorOrderDetail: {
                num,
                address_title: addressTitle,
                address_phone: addressPhone,
                region_title: regionTitle,
                village_title: villageTitle,
                village_address: villageAddress,
                point_title: pointTitle,
            },
        } = this.props

        return (
            <div>
                <Flex className={styles.container} align='start'>
                    <FlexItem className={commonStyles.flexAutoWidth}>
                        <div className={styles.number}>{num}</div>
                    </FlexItem>
                    <FlexItem>
                        <p className={styles.name}>{addressTitle} <a href={`tel:${addressPhone}`}>{addressPhone}</a></p>
                        <p className={styles.address}>收货地址：{regionTitle}{villageTitle}{villageAddress}{pointTitle}</p>
                    </FlexItem>
                </Flex>
            </div>
        )
    }
}

export default Address
