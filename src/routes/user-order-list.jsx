import React from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { browserHistory } from 'dva/router'

import {
    Tabs,
    List,
    Button,
    ListView,
} from 'antd-mobile'

import styles from './user-order-list/user-order-list.less'
import {
    ORDER_STATUS,
    ORDER_STATUS_MAP,
    CONSUMER_HOTLINE,
} from '../config/data-item'

import ROUTES from '../config/routes.js'

const TabPane = Tabs.TabPane
const ListItem = List.Item

let index = 0

class UserOrderList extends React.Component {
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
            order: {
                orderListType,
            },
        } = this.props

        dispatch({
            type: 'order/fetchOrderList',
            payload: {
                page: 1,
                type: orderListType,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const orderList = nextProps.order.orderList
        const orderListPaginate = nextProps.order.orderListPaginate

        if (orderList.length > 0 && orderListPaginate.page !== this.props.order.orderListPaginate.page) {
            this.rData = this.rData.concat(orderList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (orderList.length === 0 && this.rData.length === 0) {
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

        dispatch({
            type: 'order/removeOrderList',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            order: {
                orderListType,
                orderListPaginate,
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!orderListPaginate || !orderListPaginate.page) {
            return
        }

        this.setState({ isLoading: true })

        dispatch({
            type: 'order/fetchOrderList',
            payload: {
                page: orderListPaginate.page + 1,
                type: orderListType,
            },
        })
    }

    onTabClick = (key) => {
        const {
            dispatch,
        } = this.props

        this.rData = []

        dispatch({
            type: 'order/removeOrderList',
        })

        dispatch({
            type: 'order/saveOrderListType',
            orderListType: parseInt(key, 10),
        })

        dispatch({
            type: 'order/fetchOrderList',
            payload: {
                page: 1,
                type: parseInt(key, 10),
            },
        })
    }

    // 再次购买
    buyAgain = (code) => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'shoppingCart/fetchCartOrderGoods',
            payload: {
                code,
            },
        })
    }

    linkToOrderDetail = (code) => {
        browserHistory.push(`${ROUTES.USER_ORDER_DETAIL}?code=${code}`)
    }

    handlePay = (code) => {
        this.props.dispatch({
            type: 'order/fetchOrderPay',
            payload: {
                code,
            },
        })
    }

    render() {
        const {
            order: {
                orderList,
            },
        } = this.props

        let orderTime = ''

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = orderList.length - 1
            }
            const obj = rowData

            let calendar = null

            const {
                code,
                status,
                details,
                price,
                goods_num: goodNum,
                order_date,
            } = obj

            const orderDate = moment(order_date).format('YYYY-MM-DD')

            if (orderTime !== orderDate) {
                orderTime = orderDate
                calendar = (
                    <div className={styles.calendar}>
                        <p>{orderDate}</p>
                    </div>
                )
            }

            return (
                <div
                    wrap='true'
                    key={rowID}
                >
                    {calendar}
                    <List key={index} className={styles.orderItem}>
                        <ListItem
                            extra={<p className={styles.status}>{ORDER_STATUS_MAP[status]}</p>}
                        >
                            <p className={styles.orderId}>订单编号 {code}</p>
                        </ListItem>
                        <ListItem
                            arrow='horizontal'
                            onClick={() => { this.linkToOrderDetail(code) }}
                        >
                            {
                                details.map(({ goods }, indexs) => (
                                    <img src={goods.image} alt='' key={indexs} />
                                ))
                            }
                        </ListItem>
                        <ListItem
                            extra={
                                <div>
                                    {
                                        status === ORDER_STATUS.TO_BE_PAG
                                        &&
                                        <Button
                                            type='primary'
                                            onClick={() => { this.handlePay(code) }}
                                        >去支付</Button>
                                    }
                                    {
                                        status === ORDER_STATUS.FINISHED
                                        &&
                                        <Button
                                            type='primary'
                                            onClick={() => { this.buyAgain(code) }}
                                        >再次购买</Button>
                                    }
                                    {
                                        status === ORDER_STATUS.CANCEL
                                        &&
                                        <Button
                                            type='primary'
                                            onClick={() => { this.buyAgain(code) }}
                                        >再次购买</Button>
                                    }
                                    {
                                        status === ORDER_STATUS.APPLT_FOR_SALE
                                        &&
                                        <Button type='primary'>
                                            <a href={`tel:${CONSUMER_HOTLINE}`}>联系客服</a>
                                        </Button>
                                    }
                                    {
                                        status === ORDER_STATUS.PROCESS_FOR_SALE
                                        &&
                                        <Button type='primary'>
                                            <a href={`tel:${CONSUMER_HOTLINE}`}>联系客服</a>
                                        </Button>
                                    }
                                </div>
                            }
                        >
                            <p className={styles.allPrice}>共{goodNum}件 {status > ORDER_STATUS.TO_BE_PAG ? '实付款：' : '需付款：'}<span className={styles.price}>¥{price.toFixed(2)}</span></p>
                        </ListItem>
                    </List>
                </div>
            )
        }

        return (
            <div>
                <Tabs
                    pageSize={4}
                    swipeable={false}
                    className={styles.tabs}
                    onTabClick={(key) => { this.onTabClick(key) }}
                >
                    <TabPane tab='全部' key='5'>
                        <div className={styles.tabPane} >
                            {
                                this.rData.length === 0
                                &&
                                <div className={styles.noOrder}>
                                    <p>还没有相关订单，您可以</p>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.PRODUCTS_LIST)
                                        }}
                                    >
                                        逛逛菜市
                                    </Button>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.MENU_INDEX)
                                        }}
                                    >
                                        看看菜谱
                                    </Button>
                                </div>
                            }
                            {
                                this.rData.length !== 0
                                &&
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
                            }
                        </div>
                    </TabPane>
                    <TabPane tab='待支付' key='1'>
                        <div className={styles.tabPane} >
                            {
                                this.rData.length === 0
                                &&
                                <div className={styles.noOrder}>
                                    <p>还没有相关订单，您可以</p>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.PRODUCTS_LIST)
                                        }}
                                    >
                                        逛逛菜市
                                    </Button>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.MENU_INDEX)
                                        }}
                                    >
                                        看看菜谱
                                    </Button>
                                </div>
                            }
                            {
                                this.rData.length !== 0
                                &&
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
                            }
                        </div>
                    </TabPane>
                    <TabPane tab='待收货' key='2'>
                        <div className={styles.tabPane} >
                            {
                                this.rData.length === 0
                                &&
                                <div className={styles.noOrder}>
                                    <p>还没有相关订单，您可以</p>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.PRODUCTS_LIST)
                                        }}
                                    >
                                        逛逛菜市
                                    </Button>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.MENU_INDEX)
                                        }}
                                    >
                                        看看菜谱
                                    </Button>
                                </div>
                            }
                            {
                                this.rData.length !== 0
                                &&
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
                            }
                        </div>
                    </TabPane>
                    <TabPane tab='已完成' key='3'>
                        <div className={styles.tabPane} >
                            {
                                this.rData.length === 0
                                &&
                                <div className={styles.noOrder}>
                                    <p>还没有相关订单，您可以</p>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.PRODUCTS_LIST)
                                        }}
                                    >
                                        逛逛菜市
                                    </Button>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.MENU_INDEX)
                                        }}
                                    >
                                        看看菜谱
                                    </Button>
                                </div>
                            }
                            {
                                this.rData.length !== 0
                                &&
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
                            }
                        </div>
                    </TabPane>
                    <TabPane tab='客服' key='4'>
                        <div className={styles.tabPane} >
                            {
                                this.rData.length === 0
                                &&
                                <div className={styles.noOrder}>
                                    <p>还没有相关订单，您可以</p>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.PRODUCTS_LIST)
                                        }}
                                    >
                                        逛逛菜市
                                    </Button>
                                    <Button
                                        type='primary'
                                        onClick={() => {
                                            browserHistory.push(ROUTES.MENU_INDEX)
                                        }}
                                    >
                                        看看菜谱
                                    </Button>
                                </div>
                            }
                            {
                                this.rData.length !== 0
                                &&
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
                            }
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserOrderList)
