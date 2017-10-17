import React from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'

import {
    Tabs,
    ListView,
} from 'antd-mobile'

import styles from './products-search/products-search.less'
import Search from './products-search/search'

import ProductsListComponent from '../components/productsList'

const TabPane = Tabs.TabPane

let index = 0

class ProductsSearch extends React.Component {
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
                keyword,
            },
        } = this.props

        dispatch({
            type: 'products/fetchGoodsList',
            payload: {
                page: 1,
                keyword: !keyword ? null : keyword,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const {
            goods,
            paginate,
        } = nextProps.products.goodList

        if (goods.length > 0 && paginate.page !== this.props.products.goodList.paginate.page) {
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

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'products/removeGoodsList',
        })

        dispatch({
            type: 'products/saveSearchGoodKeyword',
            keyword: '',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            products: {
                goodList: {
                    paginate,
                },
                keyword,
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
                type: 'products/fetchGoodsList',
                payload: {
                    page: parseInt(paginate.page, 10) + 1,
                    keyword: !keyword ? null : keyword,
                },
            })
        }

        this.setState({ isLoading: true })
    }

    onClick = () => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'products/removeGoodsList',
        })

        this.rData = []
    }

    render() {
        const {
            products: {
                goodList: {
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

            return (
                <ProductsListComponent good={rowData} key={rowID} />
            )
        }
        return (
            <div className={styles.container}>
                <DocumentTitle title='搜索' />
                <Search onClick={this.onClick} />
                <Tabs swipeable={false}>
                    <TabPane tab='食材' key='1'>
                        <div className={styles.goodlistContainer}>
                            <ListView
                                useBodyScroll
                                renderRow={row}
                                scrollEventThrottle={15}
                                onEndReachedThreshold={100}
                                renderSeparator={separator}
                                scrollRenderAheadDistance={500}
                                onEndReached={this.onEndReached}
                                dataSource={this.state.dataSource}
                                renderFooter={() => (<div style={{ clear: 'both', padding: 30, textAlign: 'center' }}>
                                    {!this.state.hasMore ? '没有更多了' : this.state.isLoading ? '加载中...' : '' }
                                </div>)}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab='菜谱' key='2'>
                        <div className={styles.meallistContainer}>
                            敬请期待
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ProductsSearch)
