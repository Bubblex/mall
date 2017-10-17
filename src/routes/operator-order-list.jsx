import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    List,
    Flex,
    ListView,
} from 'antd-mobile'

import ROUTES from '../config/routes'
import styles from './operator-order-list/operator-order-list.less'
import Search from './operator-order-list/search'
import commonStyles from '../app.less'

const ListItem = List.Item
const FlexItem = Flex.Item

let index = 0

class OperatorOrderList extends React.Component {
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
            routing: {
                locationBeforeTransitions: {
                    query,
                },
            },
        } = this.props

        dispatch({
            type: 'operator/fetchOperatorDate',
            payload: {
                ...query,
                page: 1,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const {
            packages,
            paginate,
        } = nextProps.operator.operatorDate

        if (packages.length > 0 && paginate.page !== this.props.operator.operatorDate.paginate.page) {
            this.rData = this.rData.concat(packages)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }

        else if (packages.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        this.rData = []

        dispatch({
            type: 'operator/removeOperatorDate',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            operator: {
                operatorDate: {
                    date,
                    paginate,
                },
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!paginate || !paginate.page) {
            return
        }

        if (!this.state.isLoading) {
            dispatch({
                type: 'operator/fetchOperatorDate',
                payload: {
                    page: parseInt(paginate.page, 10) + 1,
                    date,
                },
            })
        }

        this.setState({ isLoading: true })
    }

    linkToOrderDetail = (order) => {
        browserHistory.push(`${ROUTES.OPERATOR_ORDER_DETAILS}?code=${order.code}`)
    }

    // 搜索时清除数据，传给search组件
    handleSearchRemoveData = () => {
        const {
            dispatch,
        } = this.props

        this.rData = []

        dispatch({
            type: 'operator/removeOperatorDate',
        })
    }

    render() {
        const {
            operator: {
                operatorDate: {
                    date,
                    order_count: orderCount,
                    packages,
                },
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = packages.length - 1
            }
            const arr = rowData

            return (
                <div className={styles.packages} key={rowID}>
                    <Flex className={styles.packagesTitle}>
                        <FlexItem className={commonStyles.flexAutoWidth}>
                            <div className={styles.number}>{arr.num}</div>
                        </FlexItem>
                        <FlexItem>{arr.orders[0].address_title}</FlexItem>
                        <FlexItem className={styles.right}>{arr.orders[0].address_phone}</FlexItem>
                    </Flex>
                    {
                        arr.orders.map((order, orderindex) => (
                            <List className={styles.orderItem} key={orderindex}>
                                <ListItem
                                    extra={<p className={styles.orderCount}>共{order.details_count}件</p>}
                                >
                                    <p className={styles.orderNum}>订单编号：{order.code}</p>
                                </ListItem>
                                <ListItem
                                    arrow='horizontal'
                                    onClick={() => { this.linkToOrderDetail(order) }}
                                >
                                    {
                                        order.details.map((detail, delindex) => (
                                            <img src={detail.goods_image} alt={detail.goods_title} key={delindex} />
                                        ))
                                    }
                                </ListItem>
                            </List>
                        ))
                    }
                </div>
            )
        }

        return (
            <div>
                <Search handleSearchRemoveData={this.handleSearchRemoveData} />
                <List>
                    <ListItem
                        wrap='true'
                        className={styles.date}
                        extra={<div>今日订单总数： <span>{orderCount}件</span></div>}
                        thumb={require('./operator-order-list/calendar.png')}
                    >{date}</ListItem>
                </List>
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
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(OperatorOrderList)
