import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    Button,
} from 'antd-mobile'


import styles from './user-address/user-address.less'
import ROUTES from '../config/routes'
import Address from './user-address/address'

class UserAddress extends React.Component {
    render() {
        const {
            user: {
                addressList,
            },
        } = this.props
        return (
            <div>
                {
                    addressList.length !== 0
                    &&
                    <Address />
                }
                {
                    addressList.length === 0
                    &&
                    <div className={styles.noAddress}>
                        <p>您还没有添加地址哦~~~</p>
                        <Button
                            size='small'
                            type='primary'
                            className={styles.addAddress}
                            onClick={() => { browserHistory.push(ROUTES.USER_ADDRESS_ADD) }}
                        >添加收货地址</Button>
                    </div>
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserAddress)
