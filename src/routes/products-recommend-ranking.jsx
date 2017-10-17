import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import classNames from 'classnames'
import DocumentTitle from 'react-document-title'

import {
    Tabs,
    Flex,
    ListView,
} from 'antd-mobile'

import commonStyle from '../app.less'
import styles from './products-recommend-ranking/products-recommend-ranking.less'
import ROUTES from '../config/routes'

import ShareBtn from '../components/share-btn'
import ShareLayer from '../components/share-layer'

import { wechatShare } from '../utils/wechat'
import SITE from '../config/site'

const TabPane = Tabs.TabPane
const FlexItem = Flex.Item

let index = 0

class ProductsRecommendRanking extends React.Component {
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
            products: {
                goodsRankType,
            },
        } = this.props

        dispatch({
            type: 'products/fetchGoodsRank',
            payload: {
                page: 1,
                type: goodsRankType,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const goods = nextProps.products.goodRankList.goods

        if (goods.length > 0) {
            this.rData = this.rData.concat(goods)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (goods.length === 0 && this.rData.length === 0) {
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
            title: '徐州人最爱吃什么菜？',
            desc: '选择速亦鲜鲜蔬配送，与三百万徐州人共同选择',
            link: SITE.DOMAIN_NAME + pathname + search,
        }

        wechatShare(data)
    }

    onEndReached = () => {
        const {
            dispatch,
            products: {
                goodsRankType,
                goodRankList: {
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

        this.setState({ isLoading: true })

        dispatch({
            type: 'products/fetchGoodsRank',
            payload: {
                page: paginate.page + 1,
                type: goodsRankType,
            },
        })
    }

    onTabClick = (key) => {
        const {
            dispatch,
        } = this.props

        this.rData = []

        dispatch({
            type: 'products/removeGoodsRank',
        })

        dispatch({
            type: 'products/saveGoodsRankType',
            goodsRankType: parseInt(key, 10),
        })

        dispatch({
            type: 'products/fetchGoodsRank',
            payload: {
                page: 1,
                type: parseInt(key, 10),
            },
        })
    }

    linkToProductDetails = (id) => {
        browserHistory.push(`${ROUTES.PRODUCTS_DETAILS}?id=${id}`)
    }

    render() {
        const {
            products: {
                goodRankList: {
                    goods,
                },
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = goods.length - 1
            }

            const {
                id,
                title,
                image,
                _sequence,
                sells_count: sellsCount,
            } = rowData

            return (
                <div
                    className={styles.item}
                    key={rowID}
                    onClick={() => { this.linkToProductDetails(id) }}
                >
                    <Flex className={styles.flex}>
                        <FlexItem className={commonStyle.flexAutoWidth}>
                            <div className={styles.imgContainer}>
                                <img src={image} alt='' />
                            </div>
                        </FlexItem>
                        <FlexItem>
                            <p className={styles.title}>{_sequence}{title}</p>
                        </FlexItem>
                        <FlexItem>
                            <p className={styles.sale}>已售 <span>{sellsCount}</span></p>
                        </FlexItem>
                    </Flex>
                    <div
                        className={classNames(styles.rankNum,
                            parseInt(rowID, 10) === 0
                            ? styles.rankNumFirst
                            : parseInt(rowID, 10) === 1
                            ? styles.rankNumSecond
                            : parseInt(rowID, 10) === 2
                            ? styles.rankNumThird
                            : '')}
                    >
                        <span>{parseInt(rowID, 10) + 1}</span>
                    </div>
                </div>
            )
        }

        // 排行第一商品的数据
        const firstData = {
            image: this.rData.length === 0 ? '' : this.rData[0].image,
            id: this.rData.length === 0 ? '' : this.rData[0].id,
            title: this.rData.length === 0 ? '加载中' : this.rData[0].title,
            sells_count: this.rData.length === 0 ? 0 : this.rData[0].sells_count,
        }

        return (
            <div className={styles.container}>
                <DocumentTitle title='购买排行' />
                <ShareBtn />
                <ShareLayer />
                <div className={styles.headerContainer}>
                    <div
                        className={styles.header}
                        style={{
                            backgroundImage: !firstData.image ? `url(${require('../assets/ranking-season.jpg')})` : `url(${firstData.image})`,
                            backgroundSize: '100% 100%',
                        }}
                        onClick={() => { browserHistory.push(`${ROUTES.PRODUCTS_DETAILS}?id=${firstData.id}`) }}
                    >
                        <div className={styles.first}>
                            <p>{firstData.title}</p>
                            <p>已售： <span>{firstData.sells_count}</span></p>
                        </div>
                    </div>
                </div>
                <Tabs
                    swipeable={false}
                    onTabClick={(key) => { this.onTabClick(key) }}
                >
                    <TabPane tab='本月' key='2'>
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
                    <TabPane tab='本周' key='1'>
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
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ProductsRecommendRanking)
