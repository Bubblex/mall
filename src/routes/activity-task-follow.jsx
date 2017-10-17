import React from 'react'
import { connect } from 'dva'

import styles from './activity-task-index/activity-task.less'

import followImg from './activity-task-index/follow.jpg'
import ShareBtn from '../components/share-btn'
import ShareLayer from '../components/share-layer'

import { wechatShare } from '../utils/wechat'
import SITE from '../config/site'

class ActivityTaskFollow extends React.Component {
    componentDidUpdate() {
        const {
            location: {
                pathname,
                search,
            },
        } = this.props

        const data = {
            title: '怎样买菜便捷又省钱？',
            desc: '选择速亦鲜鲜蔬配送，菜品新鲜又便宜，关注就送买菜金！买菜，从未这么合适过！',
            link: SITE.DOMAIN_NAME + pathname + search,
        }

        wechatShare(data)
    }

    render() {
        return (
            <div className={styles.container}>
                <ShareBtn />
                <ShareLayer />
                <img
                    className={styles.activityImg}
                    src={followImg}
                    alt=''
                />
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ActivityTaskFollow)
