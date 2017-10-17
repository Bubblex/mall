import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import DocumentTitle from 'react-document-title'

import {
    ListView,
} from 'antd-mobile'

import styles from './products-recommend-season/products-recommend-season.less'
import ROUTES from '../config/routes'

import ShareBtn from '../components/share-btn'
import ShareLayer from '../components/share-layer'

import { wechatShare } from '../utils/wechat'
import SITE from '../config/site'

let index = 0

class ProductsRecommendSeason extends React.Component {
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
            type: 'products/fetchGoodsSeason',
            payload: {
                page: 1,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const {
            seasons,
            paginate,
        } = nextProps.products.goodSeasonList

        if (seasons.length > 0 && paginate.page !== this.props.products.goodSeasonList.paginate.page) {
            this.rData = this.rData.concat(seasons)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (seasons.length === 0 && this.rData.length === 0) {
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
            title: '徐州当季蔬菜大排行！',
            desc: '选择速亦鲜鲜蔬配送，菜品新鲜又便宜，而且再也不用浪费时间去买菜了，走过路过不要错过啊！',
            link: SITE.DOMAIN_NAME + pathname + search,
        }

        wechatShare(data)
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'products/removeSeasonList',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            products: {
                goodSeasonList: {
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
            type: 'products/fetchGoodsSeason',
            payload: {
                page: paginate.page + 1,
            },
        })
    }

    linkToProductDetails = (id) => {
        browserHistory.push(`${ROUTES.PRODUCTS_DETAILS}?id=${id}`)
    }

    render() {
        const {
            products: {
                goodSeasonList: {
                    seasons,
                },
            },
        } = this.props

        const separator = (sectionID, rowID) => (
            <div key={`${sectionID}-${rowID}`} />
        )

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = seasons.length - 1
            }

            const {
                goods,
                image,
            } = rowData

            return (
                <div
                    key={rowID}
                    className={styles.item}
                    style={{
                        backgroundImage: !image ? `url(${require('../assets/ranking-season.jpg')})` : `url(${image})`,
                        backgroundSize: '100% 100%',
                    }}
                    onClick={() => { this.linkToProductDetails(goods.id) }}
                >
                    <h1>{goods.title}</h1>
                    <p>已售 <span>{goods.sell_num}</span></p>
                </div>
            )
        }

        return (
            <div className={styles.container}>
                <DocumentTitle title='当季菜品' />
                <ShareBtn />
                <ShareLayer />
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
})(ProductsRecommendSeason)
