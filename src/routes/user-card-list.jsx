import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import {
    ListView,
} from 'antd-mobile'
import Ticket from '../components/ticket'
import ROUTES from '../config/routes'

import styles from '../components/ticket/ticket-other.less'

let index = 0

class UserCardList extends React.Component {
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
            type: 'ticket/fetchTicketList',
            payload: {
                status: 1,
                page: 1,
                pageSize: 15,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const tickets = nextProps.ticket.ticketsList.tickets
        const ticketsPaginate = nextProps.ticket.ticketsList.paginate

        if (tickets.length > 0 && ticketsPaginate.page !== this.props.ticket.ticketsList.paginate.page) {
            this.rData = this.rData.concat(tickets)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (tickets.length === 0 && this.rData.length === 0) {
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
            type: 'ticket/emptyTicketList',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            ticket: {
                ticketsList: {
                    paginate,
                    paginate: {
                        page,
                    },
                },
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!paginate || !page) {
            return
        }

        if (!this.state.isLoading) {
            dispatch({
                type: 'ticket/fetchTicketList',
                payload: {
                    status: 1,
                    page: parseInt(page, 10) + 1,
                    pageSize: 15,
                },
            })
        }

        this.setState({ isLoading: true })
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            return (
                <Ticket key={rowID} data={rowData} />
            )
        }

        return (
            <div>
                {
                    this.rData.length !== 0
                    &&
                    <div className={styles.container}>
                        <ListView
                            useBodyScroll
                            renderRow={row}
                            className='am-list'
                            scrollRenderAheadDistance={500}
                            scrollEventThrottle={20}
                            onEndReachedThreshold={10}
                            renderSeparator={separator}
                            onEndReached={this.onEndReached}
                            dataSource={this.state.dataSource}
                            renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                                {!this.state.hasMore ? '没有更多了' : this.state.isLoading ? '加载中...' : '' }
                            </div>)}
                        />
                    </div>
                }
                {
                    this.rData.length === 0
                    &&
                    <div className={styles.null}>
                        暂无可用优惠券~
                    </div>
                }
                <p
                    className={styles.goin}
                    onClick={() => {
                        const {
                            dispatch,
                        } = this.props

                        dispatch({
                            type: 'ticket/emptyTicketList',
                        })
                        browserHistory.push(ROUTES.USER_CARD_LIST_UNAVAILABLE)
                    }}
                >
                    查看不可用优惠券＞
                </p>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserCardList)
