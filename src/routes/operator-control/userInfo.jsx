import React from 'react'
import { connect } from 'dva'

import {
    Flex,
} from 'antd-mobile'

import styles from './userInfo.less'
import commonStyles from '../../app.less'

const FlexItem = Flex.Item
class UserInfo extends React.Component {
    render() {
        const {
            user: {
                memberInfo: {
                    image,
                    title,
                    phone,
                    region,
                    village,
                    point,
                },
            },
        } = this.props

        return (
            <div>
                <Flex className={styles.headerContainer}>
                    <FlexItem className={commonStyles.flexAutoWidth}>
                        <img src={image} alt={title} />
                    </FlexItem>
                    <FlexItem>
                        <p>{title}</p>
                        <p className={styles.littleText}>{phone}</p>
                        <p className={styles.littleText}>
                            取菜点：{region.title}{village.title}{point.title}
                        </p>
                    </FlexItem>
                </Flex>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserInfo)
