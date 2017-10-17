import React from 'react'
import { connect } from 'dva'

import {
    ListView,
} from 'antd-mobile'

import styles from './user-message-list/user-message-list.less'

let index = 0

class UserMessageList extends React.Component {
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
        const notices = nextProps.user.noticeList
        const noticePaginate = nextProps.user.noticePaginate

        if (notices.length > 0 && noticePaginate.page !== this.props.user.noticePaginate.page) {
            this.rData = this.rData.concat(notices)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (notices.length === 0 && this.rData.length === 0) {
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
            type: 'user/removeNoticeList',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            user: {
                noticePaginate,
                noticePaginate: {
                    page,
                },
            },
            location: {
                query: {
                    type,
                },
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!noticePaginate || !page) {
            return
        }

        if (!this.state.isLoading) {
            dispatch({
                type: 'user/fetchNoticeList',
                payload: {
                    page: parseInt(page, 10) + 1,
                    pageSize: 15,
                    type,
                },
            })
        }

        this.setState({ isLoading: true })
    }

    render() {
        const {
            user: {
                noticeList,
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = noticeList.length - 1
            }

            const {
                code,
                title,
                content,
                created_at: createdAt,
            } = rowData

            return (
                <div className={styles.list} key={rowID}>
                    <p className={styles.createdAt}>{createdAt}</p>
                    <div className={styles.content}>
                        <p>{title}{code}</p>
                        <div className={styles.info}>{content}</div>
                    </div>
                </div>
            )
        }

        return (
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
        )
    }
}

export default connect((state) => {
    return state
})(UserMessageList)
