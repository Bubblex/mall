import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import moment from 'moment'

import {
    Flex,
    DatePicker,
} from 'antd-mobile'

import commonStyles from '../../app.less'
import styles from './overview.less'

const FlexItem = Flex.Item

class Overview extends React.Component {
    openDatePicker = () => {
        this.props.dispatch({
            type: 'bill/openDatePicker',
        })
    }

    closeDatePicker = () => {
        this.props.dispatch({
            type: 'bill/closeDatePicker',
        })
    }

    handleDatePickerChange = (value) => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'bill/chooseDate',
            date: value,
        })

        dispatch({
            type: 'bill/closeDatePicker',
        })

        dispatch({
            type: 'bill/fetchUserBillList',
            payload: {
                year: value.format('YYYY'),
                month: value.format('MM'),
            },
        })
    }

    render() {
        const {
            bill: {
                save,
                date,
                expend,
                visible,
            },
        } = this.props

        return (
            <div>
                <Flex className={classNames(commonStyles.flexNoMargin, styles.container)}>
                    <FlexItem className={styles.item}>
                        <div className={styles.content} onClick={this.openDatePicker}>
                            <p className={styles.title}>{date.format('YYYY')}年</p>
                            <p className={styles.month}><span className={styles.markedness}>{date.format('MM')}</span>月</p>
                        </div>
                    </FlexItem>
                    <FlexItem className={styles.item}>
                        <div className={styles.content}>
                            <p className={styles.title}>支出（元）</p>
                            <p className={styles.markedness}>{expend.toFixed(2)}</p>
                        </div>
                    </FlexItem>
                    <FlexItem className={styles.item}>
                        <div className={styles.content}>
                            <p className={styles.title}>节省（元）</p>
                            <p className={styles.markedness}>{save.toFixed(2)}</p>
                        </div>
                    </FlexItem>
                </Flex>
                <DatePicker
                    mode='month'
                    title='请选择'
                    value={date}
                    visible={visible}
                    maxDate={moment()}
                    onChange={this.handleDatePickerChange}
                    onDismiss={this.closeDatePicker}
                />
            </div>
        )
    }
}

export default connect(({ bill }) => {
    return {
        bill,
    }
})(Overview)
