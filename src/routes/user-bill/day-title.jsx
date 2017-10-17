import React from 'react'
import classNames from 'classnames'
import moment from 'moment'

import {
    Flex,
} from 'antd-mobile'

import { weekdays } from '../../config/data-item'

import commonStyles from '../../app.less'
import styles from './day-title.less'

const FlexItem = Flex.Item

function DayTitle(props) {
    const {
        date,
        save,
        expend,
    } = props

    return (
        <Flex className={classNames(commonStyles.flexNoMargin, styles.container)}>
            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.calendar)}>
                <div className={styles.calendarIcon} />
            </FlexItem>
            <FlexItem className={styles.date}>
                <div className={styles.text}>{moment(date).format('DD')}日-{weekdays[moment(date).format('e')]}</div>
            </FlexItem>
            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.expend)}>
                <div className={styles.text}>买菜支出: {expend.toFixed(2)}</div>
            </FlexItem>
            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.save)}>
                <div className={styles.text}>节省: {save.toFixed(2)}</div>
            </FlexItem>
        </Flex>
    )
}

export default DayTitle
