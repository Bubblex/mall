import React from 'react'
import { connect } from 'dva'
import { browserHistory, Link } from 'dva/router'
import DocumentTitle from 'react-document-title'

import { TweenLite, TweenMax } from 'gsap'

import {
    TabBar,
} from 'antd-mobile'

import ROUTES from '../config/routes'

import styles from './basic-layout/basic-layout.less'

import tbbarproductActive from './basic-layout/tabbar-product.png'
import tbbarproduct from './basic-layout/mall.png'
import tbbarmenu from './basic-layout/tabbar-menu.png'
import tbbarmenuActive from './basic-layout/menu-active.png'
import tbbarsearch from './basic-layout/tabbar-search.png'
import tbbarsearchActive from './basic-layout/search-active.png'
import tbbaruser from './basic-layout/tabbar-user.png'
import tbbaruserActive from './basic-layout/user-active.png'
import tbbarcenter from './basic-layout/tabbar-center.png'

const TabBarItem = TabBar.Item

class BasicLayout extends React.Component {
    constructor(props) {
        super(props)
        this.backTopBtn = null
        this.seasonBtn = null
        this.rankingBtn = null
        this.activityBtn = null
        this.newBtn = null
        this.closeBtn = null
    }

    componentDidMount = () => {
        window.onscroll = () => {
            const btn = this.backTopBtn
            const winHeight = document.documentElement.clientHeight
            const toTop = document.body.scrollTop || document.documentElement.scrollTop
            if (toTop >= winHeight) {
                btn.style.display = 'block'
            } else {
                btn.style.display = 'none'
            }
        }
    }

    openTabberLayer = () => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'common/changeTabberLayerDisplay',
            isTabberLayerShow: 1,
        })

        const seasonBtn = this.seasonBtn
        const rankingBtn = this.rankingBtn
        const activityBtn = this.activityBtn
        const newBtn = this.newBtn
        const closeBtn = this.closeBtn

        TweenLite.set(seasonBtn, {
            bottom: '-100px',
        })
        TweenLite.set(rankingBtn, {
            bottom: '-100px',
        })
        TweenLite.set(activityBtn, {
            bottom: '-100px',
        })
        TweenLite.set(newBtn, {
            bottom: '-100px',
        })

        TweenLite.to(seasonBtn, 0.2, {
            bottom: '40px',
        })
        TweenLite.to(rankingBtn, 0.25, {
            bottom: '130px',
        })
        TweenLite.to(activityBtn, 0.3, {
            bottom: '130px',
        })
        TweenLite.to(newBtn, 0.35, {
            bottom: '40px',
        })

        TweenMax.set(closeBtn, {
            rotation: '0',
        })
        TweenMax.to(closeBtn, 0.35, {
            rotation: '180',
        })
    }

    closeTabberLayer = () => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'common/changeTabberLayerDisplay',
            isTabberLayerShow: 0,
        })
    }

    backTop = () => {
        const timer = setInterval(() => {
            const toTop = document.body.scrollTop || document.documentElement.scrollTop
            const speed = Math.ceil(toTop / 1.5)
            document.documentElement.scrollTop = document.body.scrollTop = toTop - speed
            if (toTop === 0) {
                clearInterval(timer)
            }
        }, 50)
    }

    render() {
        const {
            children,
            children: {
                props: {
                    route: {
                        showCart,
                        showMenu,
                        showHome,
                    },
                },
            },
            common: {
                isTabberLayerShow,
            },
            shoppingCart: {
                cartTotal,
            },
            routing: {
                locationBeforeTransitions: {
                    pathname,
                },
            },
        } = this.props

        // 底部菜单icon图片
        const mallIcon = pathname === ROUTES.PRODUCTS_LIST ? tbbarproductActive : tbbarproduct
        const menuIcon = pathname === ROUTES.MENU_INDEX ? tbbarmenuActive : tbbarmenu
        const searchIcon = pathname === ROUTES.PRODUCTS_SEARCH ? tbbarsearchActive : tbbarsearch
        const userIcon = pathname === ROUTES.USER_CENTER ? tbbaruserActive : tbbaruser

        return (
            <div>
                <DocumentTitle title='速亦鲜' />
                {children}
                <div className={styles.sidebar}>
                    {
                        showCart
                        &&
                        <Link
                            to={ROUTES.SHOPPING_CART}
                            className={styles.shoppingcart}
                        >
                            <span>{cartTotal > 99 ? '99+' : cartTotal}</span>
                        </Link>
                    }
                    {
                        showHome
                        &&
                        <Link
                            to={ROUTES.PRODUCTS_LIST}
                            className={styles.toHome}
                        />
                    }
                    <div
                        className={styles.backtop}
                        onClick={this.backTop}
                        ref={(backTopBtn) => { this.backTopBtn = backTopBtn }}
                    />
                </div>
                {
                    showMenu
                    &&
                    <div>
                        <TabBar
                            unselectedTintColor='#e94140'
                        >
                            <TabBarItem
                                title='逛菜市'
                                key='1'
                                icon={<div
                                    style={{
                                        width: '0.44rem',
                                        height: '0.44rem',
                                        background: `url(${mallIcon}) center center /  0.42rem 0.42rem no-repeat` }}
                                />}
                                onPress={() => { browserHistory.push(ROUTES.PRODUCTS_LIST) }}
                            />
                            <TabBarItem
                                title='看菜谱'
                                key='2'
                                icon={<div
                                    style={{
                                        width: '0.44rem',
                                        height: '0.44rem',
                                        background: `url(${menuIcon}) center center /  0.42rem 0.42rem no-repeat` }}
                                />}
                                onPress={() => { browserHistory.push(ROUTES.MENU_INDEX) }}
                            />
                            <TabBarItem
                                key='3'
                                icon={<div
                                    style={{
                                        width: '1rem',
                                        height: '1rem',
                                        position: 'relative',
                                        bottom: '0.15rem',
                                        background: `url(${tbbarcenter}) center center / 100% 100% no-repeat` }}
                                />}
                                onPress={this.openTabberLayer}
                            />
                            <TabBarItem
                                title='搜索'
                                key='4'
                                icon={<div
                                    style={{
                                        width: '0.44rem',
                                        height: '0.44rem',
                                        background: `url(${searchIcon}) center center /  0.42rem 0.42rem no-repeat` }}
                                />}
                                onPress={() => { browserHistory.push(ROUTES.PRODUCTS_SEARCH) }}
                            />
                            <TabBarItem
                                title='我的'
                                key='5'
                                icon={<div
                                    style={{
                                        width: '0.44rem',
                                        height: '0.44rem',
                                        background: `url(${userIcon}) center center /  0.42rem 0.42rem no-repeat` }}
                                />}
                                onPress={() => { browserHistory.push(ROUTES.USER_CENTER) }}
                            />
                        </TabBar>
                        <div className={isTabberLayerShow === 1 ? styles.tabbarlink : styles.tabbarlinkhide}>
                            <a
                                ref={(seasonBtn) => { this.seasonBtn = seasonBtn }}
                                onClick={() => { browserHistory.push(ROUTES.PRODUCTS_RECOMMEND_SEASON) }}
                                className={styles.season}
                            >
                                当季菜品
                            </a>
                            <a
                                onClick={() => { browserHistory.push(ROUTES.PRODUCTS_RECOMMEND_RANKING) }}
                                className={styles.ranking}
                                ref={(rankingBtn) => { this.rankingBtn = rankingBtn }}
                            >
                                购买排行
                            </a>
                            <a
                                onClick={() => { browserHistory.push(ROUTES.ACTIVITY_LIST) }}
                                className={styles.activity}
                                ref={(activityBtn) => { this.activityBtn = activityBtn }}
                            >
                                惊喜活动
                            </a>
                            <a
                                onClick={() => { browserHistory.push(ROUTES.ACTIVITY_TASK_INDEX) }}
                                className={styles.new}
                                ref={(newBtn) => { this.newBtn = newBtn }}
                            >
                                新人礼包
                            </a>
                            <div
                                className={styles.close}
                                ref={(closeBtn) => { this.closeBtn = closeBtn }}
                                onClick={this.closeTabberLayer}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(BasicLayout)
