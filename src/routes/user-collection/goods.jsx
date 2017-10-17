import React from 'react'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'

import {
    Flex,
    Checkbox,
} from 'antd-mobile'

import ROUTES from '../../config/routes'
import { STOCK } from '../../config/data-item'

import styles from '../shopping-cart/shopping-cart.less'
import commonStyles from '../../app.less'

const FlexItem = Flex.Item

class Goods extends React.Component {
    handleCheck = (e) => {
        this.props.dispatch({
            type: 'user/goodsCollectedCheck',
            id: this.props.rowData.id,
            status: e.target.checked,
        })
    }

    render() {
        const {
            rowData: {
                id,
                title,
                image,
                specifications: specificationList,
            },
            user: {
                goodsCollectedEdit,
                goodsCollectedChecked,
                goodsCollectedDeleted,
            },
        } = this.props

        const specifications =
            (typeof specificationList === 'object' && specificationList.length > 0)
            ? specificationList[0]
            : {}

        const understock = specifications.is_stock === STOCK.COUNT && specifications.stock === 0

        return (
            <div style={{ display: goodsCollectedDeleted.indexOf(id) > -1 ? 'none' : 'block' }} className={classNames(styles.goods, understock && styles.understock)}>
                <Flex className={commonStyles.flexNoMargin} align='stretch' alignContent='start'>
                    {
                        goodsCollectedEdit
                        &&
                        <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.select)}>
                            <Checkbox
                                checked={goodsCollectedChecked.indexOf(id) > -1}
                                className={commonStyles.fillCheckbox}
                                onChange={this.handleCheck}
                            />
                        </FlexItem>
                    }
                    <FlexItem className={commonStyles.flexAutoWidth}>
                        <Link to={`${ROUTES.PRODUCTS_DETAILS}?id=${id}`}>
                            <img className={styles.image} src={image} alt='' />
                        </Link>
                    </FlexItem>
                    <FlexItem className={styles.detail}>
                        <p className={styles.title}>{title}</p>
                        <p className={styles.price}>
                            <span className={classNames(commonStyles.highLightText, styles.current)}>￥{specifications.p_price.toFixed(2)}</span>
                            <span className={styles.original}>￥{specifications.o_price.toFixed(2)}</span>
                        </p>
                        <p className={styles.size}>{specifications.title}</p>
                        {
                            understock
                            &&
                            <span className={styles.understockTag}>库存不足</span>
                        }
                    </FlexItem>
                </Flex>
            </div>
        )
    }
}

export default connect(({ user }) => {
    return {
        user,
    }
})(Goods)
