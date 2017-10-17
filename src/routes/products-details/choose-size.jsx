import React from 'react'
import { createForm } from 'rc-form'
import classNames from 'classnames'

import {
    Flex,
    Popup,
    Toast,
    Stepper,
} from 'antd-mobile'

import styles from './choose-size.less'
import ROUTES from '../../config/routes'

import {
    setInfo,
    getRadioProps,
} from '../../utils/library'

const FlexItem = Flex.Item

class ChooseSize extends React.Component {
    constructor(props) {
        super(props)

        const {
            selectedNum,
            goodSizeIndex,
        } = this.props

        this.state = {
            // 默认选中的规格下标
            active: goodSizeIndex,
            // 默认选中的数量
            selectedNumState: selectedNum,
        }
    }

    changeGoodSizeIndex = (index) => {
        const {
            dispatch,
        } = this.props

        this.setState({
            active: index,
            selectedNumState: 1,
        })

        dispatch({
            type: 'products/changeGoodSizeIndex',
            goodSizeIndex: index,
        })
    }

    handleAddCart = () => {
        const {
            form,
            id,
            dispatch,
            specifications,
        } = this.props

        const {
            active,
            selectedNumState,
        } = this.state

        const goods = []
        goods.push({
            goods_id: id,
            specification_id: form.getFieldsValue().specification_id === undefined
            ? specifications[active].value
            : form.getFieldsValue().specification_id,
            num: selectedNumState,
        })

        if (parseInt(specifications[active].stock, 10) === 0) {
            Toast.fail('请选择规格', 1)
            return false
        }
        else if (!selectedNumState) {
            Toast.fail('请选择数量', 1)
            return false
        }

        dispatch({
            type: 'shoppingCart/fetchCartAddGoods',
            payload: {
                goods,
            },
            id,
        })
    }

    handleBuyRightNow = () => {
        const {
            id,
            form,
            title,
            image,
            dispatch,
            specifications,
        } = this.props

        const {
            active,
            selectedNumState,
        } = this.state

        const goods = []
        goods.push({
            gift: 2,
            goods_id: id,
            goods_title: title,
            goods_image: image,
            num: selectedNumState,
            o_price: specifications[active].o_price,
            p_price: specifications[active].p_price,
            specification_id: form.getFieldsValue().specification_id === undefined
            ? specifications[active].value
            : form.getFieldsValue().specification_id,
            specification_title: specifications[active].label,
        })

        if (parseInt(specifications[active].stock, 10) === 0) {
            Toast.fail('请选择规格', 1)
            return false
        }
        else if (!selectedNumState) {
            Toast.fail('请选择数量', 1)
            return false
        }

        dispatch({
            type: 'shoppingCart/saveSelectedafaoods',
            selectedGoods: goods,
        })

        setInfo('selectedGoods', goods)

        window.location.href = ROUTES.USER_ORDER_PAY
    }

    render() {
        const {
            image,
            title,
            type,
            dispatch,
            specifications,
            form: {
                getFieldProps,
            },
        } = this.props

        const {
            active,
            selectedNumState,
        } = this.state

        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <Flex align='start'>
                        <FlexItem className={styles.cover}>
                            <img src={image} alt={title} />
                        </FlexItem>
                        <FlexItem className={styles.title}>
                            <p>{title}</p>
                            <p>￥{specifications[active].p_price.toFixed(2)}
                                <s>￥{specifications[active].o_price.toFixed(2)}</s>
                                {
                                    specifications[active].is_stock === 1
                                    &&
                                    <span>
                                        库存：{specifications[active].is_stock === 1
                                            ? specifications[active].stock
                                            : ''
                                        }
                                    </span>
                                }
                            </p>
                            <p>{specifications[active].label}</p>
                        </FlexItem>
                    </Flex>
                    <div
                        className={styles.close}
                        onClick={() => {
                            Popup.hide()
                        }}
                    />
                    <div className={styles.goodsize}>
                        <p className={styles.smalltitle}>商品规格</p>
                        {
                            specifications.map(({ value, label }, index) => (
                                <div
                                    key={index}
                                    onClick={() => { this.changeGoodSizeIndex(index) }}
                                    className={
                                        specifications[index].is_stock === 2 ?
                                        classNames(styles.radiocontainer,
                                        active === index
                                        ? styles.active : '')
                                        : specifications[index].stock === 0 ?
                                        classNames(styles.radiocontainer, styles.disabled)
                                        : classNames(styles.radiocontainer,
                                        active === index
                                        ? styles.active
                                        : '')}
                                >
                                    <input
                                        type='radio'
                                        disabled={
                                            specifications[index].is_stock === 2 ? false :
                                            specifications[index].stock === 0 ? 'disabled' : false}
                                        {
                                            ...getFieldProps(`specification_id.${index}`, {
                                                ...getRadioProps(value, active),
                                            })
                                        }
                                    />
                                    <label>{`${label}`}</label>
                                </div>
                            ))
                        }
                    </div>
                    <Flex>
                        <FlexItem>
                            <p className={styles.smalltitle}>购买数量</p>
                        </FlexItem>
                        <FlexItem
                            className={styles.stepper}
                        >
                            <Stepper
                                min={1}
                                max={specifications[active].is_stock === 1 ? specifications[active].stock : Infinity}
                                step={1}
                                showNumber
                                value={selectedNumState}
                                style={{ width: '100%' }}
                                onChange={(val) => {
                                    this.setState({
                                        selectedNumState: val,
                                    })
                                    dispatch({
                                        type: 'products/saveSelectedNum',
                                        selectedNum: val,
                                    })
                                }}
                            />
                        </FlexItem>
                    </Flex>
                </div>
                {
                    type === 3
                    &&
                    <Flex className={styles.nextButton}>
                        <FlexItem>
                            <a
                                href='javascript:'
                                onClick={this.handleAddCart}
                                className={styles.addCartButton}
                            >
                                加入购物车
                            </a>
                        </FlexItem>
                        <FlexItem>
                            <a
                                href='javascript:'
                                onClick={this.handleBuyRightNow}
                                className={styles.buyButton}
                            >
                                立即购买
                            </a>
                        </FlexItem>
                    </Flex>
                }
                {
                    type !== 3
                    &&
                    <Flex className={styles.nextButton}>
                        <FlexItem>
                            <a
                                href='javascript:'
                                className={styles.buyButton}
                                onClick={() => {
                                    if (type === 1) {
                                        this.handleBuyRightNow()
                                    }
                                    else if (type === 2) {
                                        this.handleAddCart()
                                    }
                                }}
                            >
                                确定
                            </a>
                        </FlexItem>
                    </Flex>
                }
            </div>
        )
    }
}

export default createForm()(ChooseSize)
