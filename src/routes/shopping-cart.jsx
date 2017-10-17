import React from 'react'
import { browserHistory } from 'dva/router'
import { connect } from 'dva'
import classNames from 'classnames'
import DocumentTitle from 'react-document-title'

import {
    Flex,
    Toast,
    Modal,
    Button,
    Stepper,
    Checkbox,
} from 'antd-mobile'

import {
    setInfo,
} from '../utils/library'

import {
    STOCK,
    SHOPPING_CART_STATUS,
} from '../config/data-item'

import styles from './shopping-cart/shopping-cart.less'
import ROUTES from '../config/routes.js'
import commonStyles from '../app.less'

const Alert = Modal.alert
const FlexItem = Flex.Item

/**
 * 根据勾选状态获取购物车状态码
 *
 * @param {boolean} checked 是否选中
 * @return {number} 状态码
 */
function shoppingCartStatus(checked) {
    return checked ? SHOPPING_CART_STATUS.CHECK : SHOPPING_CART_STATUS.UNCHECK
}

/**
 * 商品是否库存不足
 *
 * @param {object} cart 商品
 * @return {boolean} 库存状态 true: 库存不足 false: 有库存
 */
function cartUnderstock(cart) {
    const specification = cart.specification
    return specification.is_stock === STOCK.COUNT && specification.stock === 0
}

function filterUnderstock(cartList, status) {
    const cartId = []
    const cartsImmut = cartList.slice()

    const carts = cartsImmut.map((cart) => {
        const understock = cartUnderstock(cart)

        if (understock) {
            return cart
        }

        cartId.push(cart.id)

        return {
            ...cart,
            status,
        }
    })

    return {
        carts,
        id: cartId,
    }
}

class ShoppingCart extends React.Component {
    handleCartCheckAll = (e, carts) => {
        const status = shoppingCartStatus(e.target.checked)
        this.props.dispatch({
            type: 'shoppingCart/fetchCartCheckAll',
            status,
            ...filterUnderstock(carts, status),
        })
    }

    handleCartCheck = (e, cart, index) => {
        if (cartUnderstock(cart)) { return }

        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'shoppingCart/fetchCartCheck',
            id: cart.id,
            index,
            status: shoppingCartStatus(e.target.checked),
        })
    }

    handleCartCheckMenu = (e, cartList, menuId) => {
        const {
            dispatch,
        } = this.props

        const cartId = []
        const status = shoppingCartStatus(e.target.checked)
        const carts = cartList.slice().map((cart) => {
            const understock = cartUnderstock(cart)

            if (menuId !== cart.menu.id || understock) {
                return cart
            }

            cartId.push(cart.id)
            return {
                ...cart,
                status,
            }
        })

        if (cartId.length === 0) { return }

        dispatch({
            type: 'shoppingCart/fetchCartCheckMenu',
            carts,
            status,
            id: cartId,
        })
    }

    handleCartRemove = (id, index) => {
        const {
            dispatch,
        } = this.props

        Alert(
            '确定删除该商品吗',
            '',
            [
                { text: '取消' },
                { text: '删除',
                    onPress: () => {
                        dispatch({
                            type: 'shoppingCart/fetchCartRemove',
                            id,
                            index,
                        })
                    },
                },
            ],
            'plain-text',
        )
    }

    handleCartRemoveMenu = (carts, menuId) => {
        const {
            dispatch,
        } = this.props

        const cartId = []
        const removeCarts = carts.filter((cart) => {
            return cart.menu.id !== menuId && cartId.push(cart.id)
        })

        Alert(
            '确定删除该菜谱吗',
            '',
            [
                { text: '取消' },
                { text: '删除',
                    onPress: () => {
                        dispatch({
                            type: 'shoppingCart/fetchCartRemoveMenu',
                            id: cartId,
                            carts: removeCarts,
                        })
                    },
                },
            ],
            'plain-text',
        )
    }

    handleCartNum = (cart, index, value) => {
        if (cartUnderstock(cart)) { return }

        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'shoppingCart/fetchCartNum',
            id: cart.id,
            num: value,
            index,
        })
    }

    handleSettle = (checkCarts) => {
        const carts = checkCarts.map((cart) => {
            const {
                id,
                num,
                menu,
                goods,
                specification,
            } = cart

            const settleMenu = {}

            if (menu) {
                settleMenu.menu_id = menu.id
                settleMenu.menu_title = menu.title
            }

            return {
                num,
                gift: 2,
                cart_id: id,
                o_price: specification.o_price,
                p_price: specification.p_price,
                goods_id: goods.id,
                goods_title: goods.title,
                goods_image: goods.image,
                specification_id: specification.id,
                specification_title: specification.title,
                ...settleMenu,
            }
        })

        if (carts.length === 0) {
            Toast.fail('请选择结算商品', 1)
            return
        }

        setInfo('selectedGoods', carts)

        this.props.dispatch({
            type: 'shoppingCart/saveSelectedafaoods',
            selectedGoods: carts,
        })

        window.location.href = ROUTES.USER_ORDER_PAY
    }


    linkToProducts = (forbiddenStatus, id) => {
        if (forbiddenStatus) {
            browserHistory.push(`${ROUTES.PRODUCTS_DETAILS}?id=${id}`)
        }
    }

    render() {
        const {
            shoppingCart: {
                carts,
                menuGroup,
                totalMoney,
                checkCarts,
                uncheckCarts,
            },
        } = this.props

        let currentMenuId = -1
        const checkAllStatus = carts.length > 0 && uncheckCarts.length === 0

        return (
            <div className={styles.container}>
                <DocumentTitle title='购物车' />
                {
                    carts.length === 0
                    &&
                    <div className={styles.noCart}>
                        <p>购物车是空的，您可以</p>
                        <Button
                            type='primary'
                            onClick={() => {
                                browserHistory.push(ROUTES.PRODUCTS_LIST)
                            }}
                        >
                            逛逛菜市
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => {
                                browserHistory.push(ROUTES.MENU_INDEX)
                            }}
                        >
                            看看菜谱
                        </Button>
                    </div>
                }
                {
                    carts.length !== 0
                    &&
                    carts.map((cart, index) => {
                        const {
                            id,
                            num,
                            menu,
                            goods,
                            status,
                            specification,
                        } = cart

                        // 购物车商品展示状态
                        const forbiddenStatus = goods.status === 1 && goods.type.status === 1 && goods.type.parent.status === 1

                        let hasMenu = false

                        if (menu && menu.id !== currentMenuId) {
                            currentMenuId = menu.id
                            hasMenu = true
                        }

                        const understock = specification.is_stock === STOCK.COUNT && specification.stock === 0

                        return (
                            <div key={index} className={styles.goodsContainer}>
                                {
                                    hasMenu
                                    &&
                                    <div className={styles.menuTitle}>
                                        <Flex className={commonStyles.flexNoMargin} align='stretch' alignContent='center'>
                                            <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.select)}>
                                                <Checkbox
                                                    checked={menuGroup[menu.id].total === menuGroup[menu.id].checkNum}
                                                    onChange={(e) => { this.handleCartCheckMenu(e, carts, menu.id) }}
                                                    className={commonStyles.fillCheckbox}
                                                />
                                            </FlexItem>
                                            <FlexItem>
                                                <p className={styles.title}>{menu.title}</p>
                                            </FlexItem>
                                            <FlexItem className={commonStyles.flexAutoWidth}>
                                                <a href='javascript:' onClick={() => { this.handleCartRemoveMenu(carts, menu.id) }}>删除菜谱</a>
                                            </FlexItem>
                                        </Flex>
                                    </div>
                                }
                                <div className={classNames(styles.goods, understock && styles.understock, !forbiddenStatus && styles.forbiddenStatus)}>
                                    <Flex className={commonStyles.flexNoMargin} align='stretch' alignContent='start'>
                                        <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.select)}>
                                            <Checkbox
                                                disabled={!forbiddenStatus}
                                                checked={status === 1 && !understock && forbiddenStatus}
                                                onChange={(e) => { this.handleCartCheck(e, cart, index) }}
                                                className={commonStyles.fillCheckbox}
                                            />
                                        </FlexItem>
                                        <FlexItem
                                            className={commonStyles.flexAutoWidth}
                                            onClick={() => { this.linkToProducts(forbiddenStatus, goods.id) }}
                                        >
                                            <img className={styles.image} src={goods.image} alt='' />
                                        </FlexItem>
                                        <FlexItem className={styles.detail}>
                                            <p
                                                className={styles.title}
                                                onClick={() => { this.linkToProducts(forbiddenStatus, goods.id) }}
                                            >{goods.title}</p>
                                            <p className={styles.price}>
                                                <span className={classNames(commonStyles.highLightText, styles.current)}>￥{specification.p_price.toFixed(2)}</span>
                                                <span className={styles.original}>￥{specification.o_price.toFixed(2)}</span>
                                            </p>
                                            <p className={styles.size}>{specification.title}</p>
                                            {
                                                understock
                                                &&
                                                <span className={styles.understockTag}>库存不足</span>
                                            }
                                            <div className={classNames(commonStyles.smStepper, styles.stepperContainer)}>
                                                <Stepper
                                                    min={1}
                                                    showNumber
                                                    value={num}
                                                    disabled={!forbiddenStatus}
                                                    onChange={(value) => { this.handleCartNum(cart, index, value) }}
                                                />
                                            </div>
                                            <a href='javascript:' className={styles.delete} onClick={() => { this.handleCartRemove(id, index) }} />
                                        </FlexItem>
                                    </Flex>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={styles.tabContainer}>
                    <Flex className={classNames(commonStyles.flexNoMargin, styles.flexbox)} alignContent='center'>
                        <FlexItem className={classNames(commonStyles.flexAutoWidth, styles.selectAll)}>
                            <Checkbox
                                className={commonStyles.fillCheckbox}
                                onChange={(e) => { this.handleCartCheckAll(e, carts) }}
                                checked={checkAllStatus}
                            />
                        </FlexItem>
                        <FlexItem className={styles.total}>
                            <span className={styles.label}>合计：</span>
                            <span className={classNames(commonStyles.highLightText, styles.price)}>￥{totalMoney.toFixed(2)}</span>
                        </FlexItem>
                        <FlexItem className={commonStyles.flexAutoWidth}>
                            <a href='javascript:' onClick={() => { this.handleSettle(checkCarts) }} className={styles.settle}>去结算({checkCarts.length})</a>
                        </FlexItem>
                    </Flex>
                </div>
            </div>
        )
    }
}

export default connect(({ shoppingCart }) => {
    return {
        shoppingCart,
    }
})(ShoppingCart)
