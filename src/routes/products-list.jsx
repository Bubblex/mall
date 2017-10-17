import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import DocumentTitle from 'react-document-title'

import {
    Flex,
    Button,
    ListView,
} from 'antd-mobile'

import styles from './products-list/products-list.less'
import commonStyles from '../app.less'

import ProductsListComponent from '../components/productsList'

import ShareBtn from '../components/share-btn'
import ShareLayer from '../components/share-layer'

import { wechatShare } from '../utils/wechat'
import SITE from '../config/site'

const FlexItem = Flex.Item
let index = 0

class ProductsList extends React.Component {
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
                selectedGoodType: {
                    one,
                    two,
                },
            },
        } = this.props

        dispatch({
            type: 'products/fetchGoodsList',
            payload: {
                page: 1,
                one_level: one,
                two_level: two,
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

    componentDidUpdate() {
        const {
            location: {
                pathname,
                search,
            },
        } = this.props

        const data = {
            title: '速亦鲜，买菜便捷还省钱！',
            desc: '选择速亦鲜鲜疏配送，菜品新鲜又便宜，而且再也不用浪费时间去买菜了，走过路过不要错过啊！',
            link: SITE.DOMAIN_NAME + pathname + search,
        }

        wechatShare(data)
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'products/removeGoodsList',
        })
    }

    onEndReached = () => {
        const {
            dispatch,
            products: {
                goodList: {
                    paginate,
                },
                selectedGoodType: {
                    one,
                    two,
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
                type: 'products/fetchGoodsList',
                payload: {
                    one_level: one,
                    two_level: two,
                    page: parseInt(paginate.page, 10) + 1,
                },
            })
        }

        this.setState({ isLoading: true })
    }

    /**
     * 处理商品列表类型选择点击事件
     *
     * @param {number} val 选中的菜品分类id
     * @param {number} type 分类类型 1：一级分类 2：二级分类
     * @param {number} typeindex 选中的菜品分类下标index
     */

    changeSelectedGoodType = (val, type, typeindex) => {
        const {
            dispatch,
            products: {
                selectedGoodType: {
                    one,
                    oneIndex,
                },
            },
        } = this.props

        this.rData = []

        document.documentElement.scrollTop = document.body.scrollTop = 0

        dispatch({
            type: 'products/removeGoodsList',
        })

        if (type === 1) {
            dispatch({
                type: 'products/changeSelectedGoodType',
                selectedGoodType: {
                    one: val,
                    two: -1,
                    oneIndex: typeindex,
                    twoIndex: 0,
                },
            })
            dispatch({
                type: 'products/fetchGoodsList',
                payload: {
                    one_level: val,
                    two_level: -1,
                    page: 1,
                },
            })
        }
        else if (type === 2) {
            dispatch({
                type: 'products/changeSelectedGoodType',
                selectedGoodType: {
                    one,
                    two: val,
                    oneIndex,
                    twoIndex: typeindex,
                },
            })

            dispatch({
                type: 'products/fetchGoodsList',
                payload: {
                    page: 1,
                    one_level: one,
                    two_level: val,
                },
            })
        }
    }

    render() {
        const {
            products: {
                goodType,
                selectedGoodType: {
                    one,
                    two,
                    oneIndex,
                },
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
                <DocumentTitle title='逛菜市' />
                <ShareBtn />
                <ShareLayer />
                <Flex>
                    <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.oneLevelFlex, commonStyles.flexNoMargin)}>
                        <div className={styles.oneLevel}>
                            <Button
                                type='primary'
                                size='small'
                                className={
                                    parseInt(one, 10) === -1
                                    ? ''
                                    : styles.common
                                }
                                onClick={() => { this.changeSelectedGoodType(-1, 1, 0) }}
                            >全部</Button>
                            {
                                goodType.map(({ label, value }, typeindex) => (
                                    <Button
                                        key={typeindex}
                                        type='primary'
                                        size='small'
                                        className={
                                            parseInt(one, 10) === parseInt(value, 10)
                                            ? ''
                                            : styles.common
                                        }
                                        onClick={() => { this.changeSelectedGoodType(value, 1, typeindex) }}
                                    >{label}</Button>
                                ))
                            }
                        </div>
                    </FlexItem>
                    <FlexItem className={classNames(styles.listContainerFlex, commonStyles.flexNoMargin)}>
                        <div>
                            <Button
                                inline
                                size='small'
                                type='primary'
                                className={
                                    parseInt(two, 10) === -1
                                    ? ''
                                    : styles.common
                                }
                                onClick={() => { this.changeSelectedGoodType(-1, 2, 0) }}
                            >全部</Button>
                            {
                                parseInt(one, 10) !== -1
                                &&
                                goodType[oneIndex].children.map(({ label, value }, typeindex) => (
                                    <Button
                                        inline
                                        key={typeindex}
                                        size='small'
                                        type='primary'
                                        className={
                                            parseInt(two, 10) === parseInt(value, 10)
                                            ? ''
                                            : styles.common
                                        }
                                        onClick={() => { this.changeSelectedGoodType(value, 2, typeindex) }}
                                    >{label}</Button>
                                ))
                            }
                        </div>
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
                            renderFooter={() => (<div style={{ clear: 'both', padding: 30, textAlign: 'center' }}>
                                {!this.state.hasMore ? '没有更多了' : this.state.isLoading ? '加载中...' : '' }
                            </div>)}
                        />
                    </FlexItem>
                </Flex>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ProductsList)
