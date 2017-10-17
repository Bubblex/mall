import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import classNames from 'classnames'
import DocumentTitle from 'react-document-title'

import {
    Tabs,
    ListView,
} from 'antd-mobile'

import ROUTES from '../config/routes'

import styles from './activity-list/activity-list.less'
import ShareBtn from '../components/share-btn'
import ShareLayer from '../components/share-layer'

import { wechatShare } from '../utils/wechat'
import SITE from '../config/site'

let index = 0

const TabPane = Tabs.TabPane

class ActivityList extends React.Component {
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
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'common/changeTabberLayerDisplay',
            isTabberLayerShow: 0,
        })
    }

    componentWillReceiveProps(nextProps) {
        const actives = nextProps.activity.actives
        const activesPaginate = nextProps.activity.activesPaginate
        // 如果服务器返回了空数组，则表示接下来没有数据，即已经到最后一页了
        // 设置属性 hasMore 为 false，表示没有更多了

        if (actives.length > 0 && activesPaginate.page !== this.props.activity.activesPaginate.page) {
            this.rData = this.rData.concat(actives)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (actives.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }
    }

    componentDidUpdate() {
        const {
            location: {
                pathname,
                search,
            },
        } = this.props

        const data = {
            title: '速亦鲜又给您送福利啦！',
            desc: '选择速亦鲜鲜蔬配送，菜品新鲜又便宜，还有更多优惠福利，真是太实惠了！',
            link: SITE.DOMAIN_NAME + pathname + search,
        }

        wechatShare(data)
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'activity/emptyActivityList',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            activity: {
                activesPaginate,
                activesPaginate: {
                    page,
                },
                status,
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        if (!activesPaginate || !page) {
            return
        }

        if (!this.state.isLoading) {
            dispatch({
                type: 'activity/fetchActiveLists',
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
            type: 'activity/emptyActivityList',
        })

        this.rData = []

        dispatch({
            type: 'activity/saveActivityStatus',
            status: parseInt(key, 10) + 1,
        })

        dispatch({
            type: 'activity/fetchActiveLists',
            payload: {
                status: parseInt(key, 10) + 1,
                page: 1,
                pageSize: 15,
            },
        })
    }

    render() {
        const {
            activity: {
                actives,
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = actives.length - 1
            }

            const {
                id,
                image,
                title,
                begin_date: beginDate,
                end_date: endDate,
                status: activityStatus,
            } = rowData

            return (
                <div
                    key={rowID}
                    className={styles.list}
                    onClick={() => {
                        browserHistory.push(`${ROUTES.ACTIVITY_DATAILS}?id=${id}`)
                    }}
                >
                    <div className={styles.pos}>
                        <div className={styles.imageContainer}>
                            <img className={styles.image} src={image} alt='' />
                        </div>
                        {
                            activityStatus === 2
                            &&
                            <label className={classNames(styles.processing)}>进行中</label>
                        }
                        {
                            activityStatus === 3
                            &&
                            <label className={classNames(styles.status, styles.over)}>活动已结束</label>
                        }
                        {
                            activityStatus === 4
                            &&
                            <label className={classNames(styles.status, styles.will)}>活动即将开始</label>
                        }
                    </div>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.date}>{beginDate}—{endDate}</p>
                </div>
            )
        }

        const makeTabPane = (key, tabTitle, props) => {
            return (
                <TabPane
                    tab={tabTitle}
                    key={key}
                >
                    {
                        this.rData.length !== 0
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
                        <div className={styles.null}>暂时还没有活动哦~</div>
                    }
                </TabPane>
            )
        }

        const makeMultiTabPane = (count, props) => {
            const result = []

            const tabTitle = [
                {
                    title: '全部',
                },
                {
                    title: '正在进行',
                },
                {
                    title: '已结束',
                },
                {
                    title: '即将开始',
                },
            ]

            for (let i = 0; i < count; i += 1) {
                result.push(makeTabPane(i, tabTitle[i].title, props))
            }

            return result
        }

        return (
            <div className={styles.container}>
                <DocumentTitle title='惊喜活动' />
                <ShareBtn />
                <ShareLayer />
                <Tabs
                    defaultActiveKey='0'
                    pageSize={4}
                    swipeable={false}
                    onTabClick={(key) => { this.handleTabClick(key) }}
                >
                    {makeMultiTabPane(4, actives)}
                </Tabs>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ActivityList)
