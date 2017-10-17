import React from 'react'
import classNames from 'classnames'
import { browserHistory } from 'dva/router'

import {
    Flex,
} from 'antd-mobile'

import styles from './goodsList/goodsList.less'
import commonStyles from '../app.less'
import ROUTES from '../config/routes'

const FlexItem = Flex.Item

class GoodsList extends React.Component {
    linkToProductsDetails = (id) => {
        browserHistory.push(`${ROUTES.PRODUCTS_DETAILS}?id=${id}`)
    }

    render() {
        const {
            goodsList,
        } = this.props

        let groupTitle = ''

        return (
            <div>
                {
                    goodsList.map((arr, index) => {
                        let goodsGroupTitle = null
                        if (groupTitle !== '菜市' && arr.gift === 2 && !arr.menu_id) {
                            groupTitle = '菜市'
                            goodsGroupTitle = <p className={styles.classic}>菜市</p>
                        }
                        else if (groupTitle !== arr.menu_title && arr.menu_id) {
                            groupTitle = arr.menu_title
                            goodsGroupTitle = <p className={styles.classic}>{arr.menu_title}</p>
                        }
                        else if (groupTitle !== '礼品' && arr.gift === 1) {
                            groupTitle = '礼品'
                            goodsGroupTitle = <p className={styles.classic}>礼品</p>
                        }

                        return (
                            <div className={styles.container} key={index}>
                                {goodsGroupTitle}
                                <Flex
                                    className={styles.detailContainer}
                                    align='stretch'
                                    alignContent='start'
                                    onClick={() => { this.linkToProductsDetails(arr.goods_id) }}
                                >
                                    <FlexItem className={commonStyles.flexAutoWidth}>
                                        <img className={styles.image} src={arr.goods_image} alt={arr.goods_title} />
                                    </FlexItem>
                                    <FlexItem className={styles.detail}>
                                        <p className={styles.title}>{arr.goods_title}</p>
                                        <div>
                                            <p className={styles.size}>{arr.specification_title}<span>X{arr.num}</span></p>
                                            <p className={styles.price}>
                                                <span className={styles.original}>￥{arr.o_price}</span>
                                                <span className={classNames(commonStyles.highLightText, styles.current)}>￥{(!arr.p_price ? 0 : arr.p_price).toFixed(2)}</span>
                                            </p>
                                        </div>
                                    </FlexItem>
                                </Flex>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default GoodsList
