import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import DocumentTitle from 'react-document-title'

import ROUTES from '../config/routes'
import styles from './activity-task-index/activity-task.less'

import task from './activity-task-index/task.jpg'
// 未完成的图片
import undone1 from './activity-task-index/undone1.jpg'
import undone2 from './activity-task-index/undone2.jpg'
import undone3 from './activity-task-index/undone3.jpg'
// 已完成的图片
import done1 from './activity-task-index/done1.jpg'
import done2 from './activity-task-index/done2.jpg'
import done3 from './activity-task-index/done3.jpg'

class ActivityTaskIndex extends React.Component {
    render() {
        const {
            activity: {
                task: {
                    is_follow: isFollow,
                    is_info: isInfo,
                    is_order: isOrder,
                },
            },
        } = this.props

        return (
            <div className={styles.container}>
                <DocumentTitle title='新人礼包' />
                <img className={styles.task} src={task} alt='' />
                <img
                    className={styles.step}
                    src={isInfo === 1 ? done1 : undone1} alt=''
                    onClick={() => {
                        browserHistory.push(ROUTES.ACTIVITY_TASK_DATA)
                    }}
                />
                <img
                    className={styles.step}
                    src={isFollow === 1 ? done2 : undone2} alt=''
                    onClick={() => {
                        browserHistory.push(ROUTES.ACTIVITY_TASK_FOLLOW)
                    }}
                />
                <img
                    className={styles.step}
                    src={isOrder === 1 ? done3 : undone3} alt=''
                    onClick={() => {
                        browserHistory.push(ROUTES.ACTIVITY_TASK_ORDER)
                    }}
                />
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ActivityTaskIndex)
