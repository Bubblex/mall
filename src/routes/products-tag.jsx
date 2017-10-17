import React from 'react'
import { connect } from 'dva'
import DocumentTitle from 'react-document-title'

import {
    ListView,
} from 'antd-mobile'

import ProductsListComponent from '../components/productsList'
import styles from './products-tag/products-tag.less'

let index = 0

class ProductsTag extends React.Component {
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
            location: {
                query: {
                    id,
                },
            },
        } = this.props

        dispatch({
            type: 'products/fetchGoodsTag',
            payload: {
                page: 1,
                tag_id: parseInt(id, 10),
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const goods = nextProps.products.goodTagList.goods
        const goodsListPaginate = nextProps.products.goodTagList.paginate

        if (goods.length > 0 && goodsListPaginate.page !== this.props.products.goodTagList.paginate.page) {
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

    onEndReached = () => {
        const {
            dispatch,
            products: {
                goodTagList: {
                    paginate,
                },
            },
            location: {
                query: {
                    id,
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
                type: 'products/fetchGoodsTag',
                payload: {
                    page: parseInt(paginate.page, 10) + 1,
                    tag_id: parseInt(id, 10),
                },
            })
        }

        this.setState({ isLoading: true })
    }

    render() {
        const {
            products: {
                goodTagList: {
                    goods,
                },
            },
            location: {
                query: {
                    label,
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
                <DocumentTitle title='商品' />
                <div className={styles.header}>
                    已选择：
                    <span>{label}</span>
                </div>
                <div className={styles.list}>
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
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ProductsTag)
