import React from 'react'
import { browserHistory } from 'dva/router'

import ROUTES from '../config/routes'
import styles from './productsList/productsList.less'

class ProductsList extends React.Component {

    linkToProductDetail = (id) => {
        browserHistory.push(`${ROUTES.PRODUCTS_DETAILS}?id=${id}`)
    }

    render() {
        const {
            good,
        } = this.props

        const specifications = (typeof good === 'object' && good.specifications.length > 0)
            ? good.specifications[0] : {}

        return (
            <div
                className={styles.item}
                onClick={() => { this.linkToProductDetail(good.id) }}
            >
                <div className={styles.cover}>
                    <div className={styles.imageContainer}>
                        <img alt='' src={good.image} />
                    </div>
                    <p className={styles.saleNum}>已售：{good.sell_num}</p>
                    {/* <p className={styles.over}>已售罄</p> */}
                </div>
                <h1>{good.title}</h1>
                <p className={styles.price}>￥{specifications.p_price.toFixed(2)} <span>/{specifications.title}</span></p>
                <p className={styles.marketPrice}>市场价￥{specifications.o_price.toFixed(2)}</p>
            </div>
        )
    }
}

export default ProductsList
