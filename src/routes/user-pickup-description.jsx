import React from 'react'
import { connect } from 'dva'

import styles from './user-pickup/user-pickup.less'

class UserPickup extends React.Component {
    render() {
        return (
            <div className={styles.descriptionContainer}>
                向取菜点管理员出示二维码或告知取货码，确认订单后即可取货。
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserPickup)
