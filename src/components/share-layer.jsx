import React from 'react'
import { connect } from 'dva'

import ROUTES from '../config/routes.js'

import styles from './share-layer/share-layer.less'

class shareLayer extends React.Component {
    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'common/changeShareLayerDisplay',
            isShareLayerShow: 0,
        })
    }

    closeShareLayer = () => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'common/changeShareLayerDisplay',
            isShareLayerShow: 0,
        })
    }

    render() {
        const {
            // data,
            common: {
                isShareLayerShow,
            },
        } = this.props
        // const pathname = this.props.routing.locationBeforeTransitions.pathname

        return (
            <div>
                {
                    isShareLayerShow === 1
                    &&
                    <div
                        className={styles.layer}
                        onClick={this.closeShareLayer}
                    >
                        {/* {
                            ROUTES.PRODUCTS_LIST === pathname
                            &&
                            <div>
                                <p>速亦鲜，买菜便捷还省钱！</p>
                                <p>选择速亦鲜鲜疏配送，菜品新鲜又便宜，而</p>
                                <p>且再也不用浪费时间去买菜了，走过路过不</p>
                                <p>要错过啊！</p>
                            </div>
                        }
                        {
                            ROUTES.PRODUCTS_DETAILS === pathname
                            &&
                            <div>
                                <p>{data.name}居然这么便宜！</p>
                                <p>选择速亦鲜，买{data.size}{name}可省{data.save}元！</p>
                                <p>而且不用去超市，还不试试？</p>
                            </div>
                        }
                        {
                            ROUTES.PRODUCTS_RECOMMEND_SEASON === pathname
                            &&
                            <div>
                                <p>徐州当季蔬菜大排行！</p>
                                <p>选择速亦鲜鲜蔬配送，菜品新鲜又便宜，而</p>
                                <p>且再也不用浪费时间去买菜了，走过路过不</p>
                                <p>要错过啊！</p>
                            </div>
                        }
                        {
                            ROUTES.PRODUCTS_RECOMMEND_RANKING === pathname
                            &&
                            <div>
                                <p>徐州人最爱吃什么菜？</p>
                                <p>选择速亦鲜鲜蔬配送，与三百万徐州人共同</p>
                                <p>选择</p>
                            </div>
                        }
                        {
                            ROUTES.USER_ORDER_DETAIL === pathname
                            &&
                            <div>
                                <p>看看我的买菜清单，共省了{data.DPrice}元！</p>
                                <p>选择速亦鲜鲜蔬配送，菜品新鲜又便宜，今</p>
                                <p>天一共省了{data.DPrice}元，真是太实惠了！</p>
                            </div>
                        }
                        {
                            ROUTES.ACTIVITY_LIST === pathname
                            &&
                            <div>
                                <p>速亦鲜又给您送福利啦！</p>
                                <p>选择速亦鲜鲜蔬配送，菜品新鲜又便宜，还</p>
                                <p>有更多优惠福利，真是太实惠了！</p>
                            </div>
                        }
                        {
                            ROUTES.ACTIVITY_DATAILS === pathname
                            &&
                            <div>
                                <p>速亦鲜又给您送福利啦！！！</p>
                                <p>选择速亦鲜鲜蔬配送超值优惠券，仅剩{data.num}</p>
                                <p>份！数量有限，一般关系我都不告诉他！</p>
                            </div>
                        }
                        {
                            (ROUTES.ACTIVITY_TASK_FOLLOW === pathname ||
                            ROUTES.ACTIVITY_TASK_DATA === pathname ||
                            ROUTES.ACTIVITY_TASK_ORDER === pathname)
                            &&
                            <div>
                                <p>怎样买菜便捷又省钱？</p>
                                <p>选择速亦鲜鲜蔬配送，菜品新鲜又便宜，关</p>
                                <p>注就送买菜金！买菜，从未这么合适过！</p>
                            </div>
                        } */}
                    </div>
                }
            </div>
        )
    }
}


export default connect((state) => {
    return state
})(shareLayer)
