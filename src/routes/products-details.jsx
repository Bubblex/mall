import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { browserHistory, Link } from 'dva/router'
import DocumentTitle from 'react-document-title'

import {
    Tabs,
    Flex,
    List,
    Popup,
    NavBar,
    TabBar,
    Carousel,
} from 'antd-mobile'

import ChooseSize from './products-details/choose-size'
import ShareLayer from '../components/share-layer'

import styles from './products-details/products-details.less'
import commonStyle from '../app.less'

import ROUTES from '../config/routes'
import {
    CHOOSE_SIZE_TYPE,
    CONSUMER_HOTLINE,
} from '../config/data-item'

import { wechatShare } from '../utils/wechat'
import SITE from '../config/site'

const ListItem = List.Item
const FlexItem = Flex.Item
const TabPane = Tabs.TabPane
const TabBarItem = TabBar.Item

class ProductsDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeCarousel: 1,

            // tab菜单key值
            key: '1',
        }
    }

    componentDidUpdate() {
        const {
            products: {
                goodsDetail: {
                    title: name,
                    specifications,
                },
            },
            location: {
                pathname,
                search,
            },
        } = this.props

        // 分享弹层展示数据
        const size = specifications[0].label
        const save = parseFloat(specifications[0].o_price - specifications[0].p_price).toFixed(2)

        const data = {
            title: `${name}居然这么便宜！`,
            desc: `选择速亦鲜，买${size}${name}可省${save}元！而且不用去超市，还不试试？`,
            link: SITE.DOMAIN_NAME + pathname + search,
        }

        wechatShare(data)
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'products/removeGoodsDetail',
        })

        Popup.hide()
    }

    /**
     *
     * tab 被点击的回调
     * @param {string} key tab菜单key值 1：菜品 2：详情 3：菜谱
     *
     */

    onTabClick = (key) => {
        this.setState({
            key,
        })
    }

    // 处理返回
    onLeftClick = () => {
        if (this.state.key === '1') {
            browserHistory.goBack()
        }
        else {
            this.setState({
                key: '1',
            })
        }
    }

    openChooseSizeLayer = (index) => {
        const {
            products: {
                goodsDetail: {
                    id,
                    image,
                    title,
                    specifications,
                },
                selectedNum,
                goodSizeIndex,
            },
            dispatch,
        } = this.props

        Popup.show(
            <ChooseSize
                id={id}
                type={index}
                image={image}
                title={title}
                dispatch={dispatch}
                selectedNum={selectedNum}
                goodSizeIndex={goodSizeIndex}
                specifications={specifications}
            />, { animationType: 'slide-up' })
    }

    openImagesLayer = (index) => {
        const {
            dispatch,
        } = this.props

        this.setState({
            activeCarousel: index,
        })

        dispatch({
            type: 'products/changeImagesLayerDisplay',
            isImageLayerShow: 1,
        })
    }

    closeImagesLayer = () => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'products/changeImagesLayerDisplay',
            isImageLayerShow: 0,
        })
    }

    handleCollect = () => {
        const {
            dispatch,
            products: {
                goodsDetail: {
                    id,
                },
                collected,
            },
        } = this.props

        dispatch({
            type: 'products/fetchCollectionCollect',
            payload: {
                goods_id: id,
                type: collected === 1 ? 2 : 1,
            },
        })
    }

    openShareLayer = () => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'common/changeShareLayerDisplay',
            isShareLayerShow: 1,
        })
    }

    render() {
        const {
            products: {
                goodsDetail: {
                    images,
                    title: name,
                    tags,
                    sell_num: sellNum,
                    specifications,
                    content,
                },
                collected,
                goodSizeIndex,
                isImageLayerShow,
            },
            shoppingCart: {
                cartTotal,
            },
        } = this.props

        const {
            key,
            activeCarousel,
        } = this.state

        // 分享弹层展示数据
        const layerData = {
            name,
            size: specifications[0].label,
            save: specifications[0].o_price - specifications[0].p_price,
        }

        return (
            <div className={styles.container}>
                <DocumentTitle title={name} />
                <ShareLayer data={layerData} />
                <div className={styles.header}>
                    <NavBar
                        mode='light'
                        onLeftClick={this.onLeftClick}
                        rightContent={<div className={styles.sharebtn} onClick={this.openShareLayer} />}
                    />
                </div>
                <div
                    onClick={this.closeImagesLayer}
                    className={isImageLayerShow === 1 ? styles.imageslayer : styles.none}
                >
                    <Carousel
                        dots={images.length !== 1}
                        speed={500}
                        className={styles.carousel}
                        selectedIndex={activeCarousel}
                    >
                        {
                            images.map(({ title, image }, index) => (
                                <div
                                    key={index}
                                    className={styles.carouselitem}
                                >
                                    <img src={image} alt='' />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
                <Tabs swipeable={false} className={styles.tabs} onTabClick={this.onTabClick} activeKey={key}>
                    <TabPane tab='菜品' key='1'>
                        <div
                            className={classNames(styles.tabpane, styles.products)}
                        >
                            <Carousel
                                autoplay
                                speed={500}
                                dots={images.length !== 1}
                                autoplayInterval={2500}
                                className={styles.carousel}
                            >
                                {
                                    images.map(({ title, image }, index) => (
                                        <div
                                            key={index}
                                            onClick={() => { this.openImagesLayer(index) }}
                                            className={styles.carouselitem}
                                        >
                                            <img src={image} alt={title} />
                                        </div>
                                    ))
                                }
                            </Carousel>
                            <div className={styles.goodinfo}>
                                <p className={styles.goodsname}>{name}</p>
                                <div className={styles.tagcontainer}>
                                    {
                                        tags.map(({ value, label }, index) => (
                                            <div
                                                className={styles.tags}
                                                key={index}
                                            >
                                                <Link
                                                    to={{
                                                        pathname: ROUTES.PRODUCTS_TAG,
                                                        query: {
                                                            id: value,
                                                            label,
                                                        },
                                                    }}
                                                >{label}</Link>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles.goodprice}>
                                    <Flex align='baseline'>
                                        <FlexItem
                                            className={classNames(styles.price, commonStyle.flexAutoWidth)}

                                        >
                                            <span>￥</span>
                                            {specifications[goodSizeIndex].p_price.toFixed(2)}
                                        </FlexItem>
                                        <FlexItem
                                            className={classNames(styles.oprice)}
                                        >
                                            市场价：￥{specifications[goodSizeIndex].o_price.toFixed(2)}
                                        </FlexItem>
                                        <FlexItem
                                            className={styles.sellnum}
                                        >
                                            已售{sellNum}
                                        </FlexItem>
                                    </Flex>
                                </div>
                            </div>
                            <List>
                                <ListItem
                                    arrow='horizontal'
                                    extra={<span className={styles.selectsize}>{specifications[goodSizeIndex].label}</span>}
                                    onClick={() => { this.openChooseSizeLayer(CHOOSE_SIZE_TYPE.CHOOSE) }}
                                >
                                    <p className={styles.choosesize}>选择：规格</p>
                                </ListItem>
                            </List>
                        </div>
                    </TabPane>
                    <TabPane tab='详情' key='2'>
                        <div
                            dangerouslySetInnerHTML={{ __html: content }}
                            className={classNames(styles.tabpane, styles.details)}
                        />
                    </TabPane>
                    <TabPane tab='菜谱' key='3'>
                        <div className={classNames(styles.tabpane, styles.menu)}>
                            <p>敬请期待</p>
                        </div>
                    </TabPane>
                </Tabs>
                <div className={styles.tabbarcontainer}>
                    <TabBar>
                        <TabBarItem
                            title='客服'
                            key='1'
                            icon={
                                <a
                                    className={classNames(styles.service, styles.tabicon)}
                                    href={`tel:${CONSUMER_HOTLINE}`}
                                />
                            }
                        />
                        <TabBarItem
                            title='购物车'
                            key='2'
                            badge={cartTotal}
                            icon={
                                <div className={classNames(styles.shoppingCart, styles.tabicon)} />
                            }
                            onPress={() => { browserHistory.push(ROUTES.SHOPPING_CART) }}
                        />
                        <TabBarItem
                            title='收藏'
                            key='3'
                            icon={
                                <div
                                    className={collected === 1
                                    ? classNames(styles.liked, styles.tabicon)
                                    : classNames(styles.like, styles.tabicon)}
                                />
                            }
                            onPress={this.handleCollect}
                        />
                    </TabBar>
                </div>
                <div className={styles.righttabbarcontainer}>
                    <TabBar
                        tintColor='#fff'
                        unselectedTintColor='#fff'
                    >
                        <TabBarItem
                            key='1'
                            icon={<div />}
                            title='加入购物车'
                            onPress={() => { this.openChooseSizeLayer(CHOOSE_SIZE_TYPE.ADD_CART) }}
                        />
                        <TabBarItem
                            key='2'
                            icon={<div />}
                            title='立即购买'
                            onPress={() => { this.openChooseSizeLayer(CHOOSE_SIZE_TYPE.BUY) }}
                        />
                    </TabBar>
                </div>
            </div>
        )
    }
}

export default connect(({ order, common, products, shoppingCart }) => {
    return {
        order,
        common,
        products,
        shoppingCart,
    }
})(ProductsDetails)
