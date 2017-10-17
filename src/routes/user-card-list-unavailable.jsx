import React from 'react'
import { connect } from 'dva'

import {
    Tabs,
    ListView,
} from 'antd-mobile'
import Ticket from '../components/ticket'

import styles from '../components/ticket/ticket-other.less'

const TabPane = Tabs.TabPane

class UserCardListUnavailable extends React.Component {
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
                status,
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
                    status,
                    page: parseInt(page, 10) + 1,
                    pageSize: 15,
                },
            })
        }

        this.setState({ isLoading: true })
    }

    handleTabClick = (key) => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'ticket/emptyTicketList',
        })

        this.rData = []

        dispatch({
            type: 'ticket/saveTicketStatus',
            status: parseInt(key, 10) + 2,
        })

        dispatch({
            type: 'ticket/fetchTicketList',
            payload: {
                status: parseInt(key, 10) + 2,
                page: 1,
                pageSize: 15,
            },
        })
    }

    render() {
        const {
            ticket: {
                ticketsList: {
                    tickets,
                },
                status,
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            return <Ticket key={rowID} data={rowData} status={status} />
        }

        const makeTabPane = (key, tabTitle, props) => {
            return (
                <TabPane
                    tab={tabTitle}
                    key={key}
                >
                    {
                        props !== undefined
                        &&
                        <div style={{ position: 'relative' }}>
                            {
                                props.length !== 0
                                &&
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
                            }
                            {
                                this.rData.length === 0
                                &&
                                <div className={styles.null}>
                                    暂无优惠券~
                                </div>
                            }
                        </div>
                    }
                </TabPane>
            )
        }

        const makeMultiTabPane = (count, props) => {
            const result = []

            const tabTitle = [
                {
                    title: '已过期',
                },
                {
                    title: '已使用',
                },
            ]

            for (let i = 0; i < count; i += 1) {
                result.push(makeTabPane(i, tabTitle[i].title, props))
            }

            return result
        }

        return (
            <div className={styles.unContainer}>
                <Tabs
                    defaultActiveKey='0'
                    pageSize={4}
                    swipeable={false}
                    onTabClick={(key) => { this.handleTabClick(key) }}
                >
                    {makeMultiTabPane(2, tickets)}
                </Tabs>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserCardListUnavailable)
