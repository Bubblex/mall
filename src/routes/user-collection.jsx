import React from 'react'
import classNames from 'classnames'
import { connect } from 'dva'

import {
    Tabs,
    Modal,
    ListView,
} from 'antd-mobile'

import Goods from './user-collection/goods'

import collectStyles from './user-collection/user-collection.less'
import commonStyles from '../app.less'

const TabPane = Tabs.TabPane
const Alert = Modal.alert

class UserCollection extends React.Component {
    constructor(props) {
        super(props)

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })

        this.rData = []
        this.state = {
            dataSource: dataSource.cloneWithRows(this.rData),
            isLoading: true,
        }
    }

    componentDidMount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'user/fetchCollectedList',
            payload: {
                page: 1,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const {
            goodsCollectedList,
            goodsCollectedPaginate,
        } = nextProps.user

        if (goodsCollectedList.length > 0 && goodsCollectedPaginate.page !== this.props.user.goodsCollectedPaginate.page) {
            this.rData = this.rData.concat(goodsCollectedList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }

        else if (goodsCollectedList.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'user/resetGoodsCollected',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            user: {
                goodsCollectedPaginate,
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!goodsCollectedPaginate || !goodsCollectedPaginate.page) {
            return
        }

        this.setState({ isLoading: true })

        dispatch({
            type: 'user/fetchCollectedList',
            payload: {
                page: goodsCollectedPaginate.page + 1,
            },
        })
    }

    handleEditClick = () => {
        const {
            dispatch,
            user: {
                goodsCollectedEdit,
                goodsCollectedChecked,
            },
        } = this.props

        if (goodsCollectedEdit && goodsCollectedChecked.length > 0) {
            Alert(
                '确定取消收藏吗',
                '',
                [
                    { text: '取消' },
                    { text: '确定',
                        onPress: () => {
                            dispatch({
                                type: 'user/fetchCollectionCollect',
                                payload: {
                                    goods_id: goodsCollectedChecked,
                                    type: 2,
                                },
                            })
                        },
                    },
                ],
                'plain-text',
            )
        }

        dispatch({
            type: 'user/changeGoodsCollectedEditStatus',
            status: !goodsCollectedEdit,
        })
    }

    render() {
        const {
            user: {
                goodsCollectedEdit,
            },
            form,
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            return (
                <Goods key={rowID} form={form} rowData={rowData} rowID={rowID} />
            )
        }

        return (
            <div className={collectStyles.container}>
                <Tabs
                    pageSize={1}
                    swipeable={false}
                    className={classNames(commonStyles.tabsFixedTop, commonStyles.tabsTabAutoWidth)}
                >
                    <TabPane tab='商品' key='1' className={commonStyles}>
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
                    </TabPane>
                </Tabs>
                <div className={collectStyles.editButton} onClick={this.handleEditClick}>{goodsCollectedEdit ? '取消收藏' : '编辑'}</div>
            </div>
        )
    }
}

export default connect(({ user }) => {
    return {
        user,
    }
})(UserCollection)
