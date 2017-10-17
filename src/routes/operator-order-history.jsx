import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    List,
    ListView,
} from 'antd-mobile'

import styles from './operator-order-history/operator-order-history.less'
import ROUTES from '../config/routes'

const ListItem = List.Item

let index = 0

class OperatorOrderHistory extends React.Component {
    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })

        // 当前所有元素的列表
        this.rData = []
        this.state = {
            dataSource: dataSource.cloneWithRows(this.rData),
            isLoading: true,
        }
    }

    componentDidMount() {
        // render 完成后，第一次请求获取数据
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'operator/fetchOperatorHistory',
            payload: {
                page: 1,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const operatorHistory = nextProps.operator.operatorHistory
        const operatorHistoryPaginate = nextProps.operator.operatorHistoryPaginate

        if (operatorHistory.length > 0 && operatorHistoryPaginate.page !== this.props.operator.operatorHistoryPaginate) {
            this.rData = this.rData.concat(operatorHistory)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (operatorHistory.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }
    }

    onEndReached = () => {
        const {
            dispatch,
            operator: {
                operatorHistoryPaginate,
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!operatorHistoryPaginate || !operatorHistoryPaginate.page) {
            return
        }

        if (!this.state.isLoading) {
            dispatch({
                type: 'operator/fetchOperatorHistory',
                payload: {
                    page: parseInt(operatorHistoryPaginate.page, 10) + 1,
                },
            })
        }

        this.setState({ isLoading: true })
    }

    linkToAccpetCheck = (date) => {
        browserHistory.push(`${ROUTES.OPERATOR_ORDER_LIST}?date=${date}`)
    }

    render() {
        const {
            operator: {
                operatorHistory,
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = operatorHistory.length - 1
            }
            const obj = rowData

            const {
                date,
                order_num: orderNum,
            } = obj

            return (
                <ListItem
                    key={rowID}
                    wrap='true'
                    arrow='horizontal'
                    className={styles.item}
                    onClick={() => { this.linkToAccpetCheck(date) }}
                    extra={<div>订单数： <span>{orderNum}件</span></div>}
                    thumb={require('./operator-order-history/calendar.png')}
                >{date}</ListItem>
            )
        }

        return (
            <div>
                <List>
                    <ListView
                        useBodyScroll
                        renderRow={row}
                        className='am-list'
                        scrollEventThrottle={15}
                        onEndReachedThreshold={100}
                        renderSeparator={separator}
                        scrollRenderAheadDistance={500}
                        onEndReached={this.onEndReached}
                        dataSource={this.state.dataSource}
                        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                            {!this.state.hasMore ? '没有更多了' : this.state.isLoading ? '加载中...' : '' }
                        </div>)}
                    />
                </List>
            </div>
        )
    }
}

export default connect(({ operator }) => {
    return {
        operator,
    }
})(OperatorOrderHistory)
