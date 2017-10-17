import React from 'react'
import { connect } from 'dva'

import { Flex } from 'antd-mobile'
import SITE from '../config/site'

import styles from './home/home.less'

class Home extends React.Component {
    render() {
        return (
            <Flex direction='column' justify='center' align='center' className={styles.layout}>
                <img src={SITE.LOGO} alt={SITE.TITLE} className={styles.logo} />
                <p>{SITE.TITLE}</p>
            </Flex>
        )
    }
}

export default connect((state) => {
    return state
})(Home)
