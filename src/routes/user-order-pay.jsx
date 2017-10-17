import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'
import classNames from 'classnames'
import { createForm } from 'rc-form'

import {
    List,
    TextareaItem,
} from 'antd-mobile'

import ROUTES from '../config/routes'
import Tab from './user-order-pay/tab'

import styles from './user-order-pay/user-order-pay.less'
import GoodsList from '../components/goodsList'

import {
    getInfo,
    setInfo,
} from '../utils/library'

const ListItem = List.Item
const Brief = ListItem.Brief

class UserOrderPay extends React.Component {

    linkToSelectAddress = () => {
        browserHistory.push(ROUTES.USER_ORDER_PAY_ADDRESS)
    }

    linkToSelectCard = () => {
        const {
            ticket: {
                ticketUsableList,
            },
        } = this.props

        if (ticketUsableList.length === 0) {
            browserHistory.push(ROUTES.USER_CARD_LIST_UNAVAILABLE)
        }
        else {
            browserHistory.push(ROUTES.USER_ORDER_PAY_CARD)
        }
    }

    handleSaveRemark = (val) => {
        setInfo('remark', val)
    }

    render() {
        const {
            user: {
                defaultAddress,
                defaultAddress: {
                    title,
                    phone,
                    region,
                    village,
                    point,
                },
            },
            form: {
                getFieldProps,
            },
            ticket: {
                ticketUsableList,
            },
        } = this.props

        const canUseCard = []

        if (ticketUsableList.length !== 0) {
            for (const arr of ticketUsableList) {
                if (arr.status === 1) {
                    canUseCard.push({
                        arr: arr.status,
                    })
                }
            }
        }

        const remark = getInfo('remark')
        const addressList = getInfo('addressList')
        const localTicketUsableList = getInfo('localTicketUsableList')
        const selectedGoods = getInfo('selectedGoods')

        const selectedCardId = !getInfo('selectedCard') ? '' : getInfo('selectedCard').id
        const selectedCardIndex = !getInfo('selectedCard') ? '' : getInfo('selectedCard').index

        const index = !getInfo('selectedAddress') ? '' : getInfo('selectedAddress').index


        // 总原价
        let oPriceTotal = 0
        // 总现价
        let pPriceTotal = 0

        for (let i = 0; i < selectedGoods.length; i += 1) {
            oPriceTotal += selectedGoods[i].o_price * selectedGoods[i].num
            pPriceTotal += selectedGoods[i].p_price * selectedGoods[i].num
        }

        let reducePrice = 0
        if (selectedCardId) {
            reducePrice = localTicketUsableList[selectedCardIndex].type === 1
            ? localTicketUsableList[selectedCardIndex].reduce_price
            : localTicketUsableList[selectedCardIndex].type === 2
            ? localTicketUsableList[selectedCardIndex].cash_price
            : 0
        }

        // 实付款
        const rightPrice = pPriceTotal - reducePrice
        // 节省
        const savePrice = oPriceTotal - rightPrice

        return (
            <div List className={styles.container}>
                <List className={styles.list}>
                    <ListItem
                        arrow='horizontal'
                        wrap='true'
                        className={styles.addressItem}
                        onClick={this.linkToSelectAddress}
                        extra={(
                            <div className={styles.extra}>
                                {
                                    index === '' && defaultAddress.status === 1
                                    &&
                                    <div>
                                        <p>{title} <span>{phone}</span></p>
                                        <p>{region.title}{village.title}{village.address}{point.title}</p>
                                    </div>
                                }
                                {
                                    index !== ''
                                    &&
                                    <div>
                                        <p>{addressList[index].title} <span>{addressList[index].phone}</span></p>
                                        <p>{addressList[index].region.title}{addressList[index].village.title}{addressList[index].village.address}{addressList[index].point.title}</p>
                                    </div>
                                }
                            </div>)}
                    >
                        <Brief>{defaultAddress.status === 2 && index === '' ? '新增地址' : '配送地址'}</Brief>
                    </ListItem>
                    <ListItem
                        wrap='true'
                        extra={(
                            <div className={styles.extra}>
                                <p>明日17:00</p>
                            </div>)}
                    >
                        <Brief>送达时间</Brief>
                    </ListItem>
                </List>
                <GoodsList goodsList={selectedGoods} />
                <List className={classNames(styles.list, styles.price)}>
                    <ListItem
                        wrap='true'
                        className={styles.allPrice}
                        extra={(
                            <div className={styles.extra}>
                                <p><s>￥{oPriceTotal.toFixed(2)}</s><span>￥{pPriceTotal.toFixed(2)}</span></p>
                            </div>)}
                    >
                        <Brief>商品总额</Brief>
                    </ListItem>
                    <ListItem
                        wrap='true'
                        arrow='horizontal'
                        className={styles.cardPrice}
                        onClick={this.linkToSelectCard}
                        extra={(
                            <div className={styles.extra}>
                                {
                                    !selectedCardId
                                    &&
                                    <p className={styles.noCanUse}>
                                        {
                                            ticketUsableList.length === 0
                                            ? <span>无可用</span>
                                            : `可用优惠券${canUseCard.length}张`
                                        }
                                    </p>
                                }
                                {
                                    selectedCardId
                                    &&
                                    <p>
                                        {
                                            localTicketUsableList[selectedCardIndex].type === 1
                                            ? `-￥${localTicketUsableList[selectedCardIndex].reduce_price.toFixed(2)}`
                                            : localTicketUsableList[selectedCardIndex].type === 2
                                            ? `-￥${localTicketUsableList[selectedCardIndex].cash_price.toFixed(2)}`
                                            : localTicketUsableList[selectedCardIndex].type === 3
                                            ? <p>{localTicketUsableList[selectedCardIndex].gift.goods_title}
                                                {localTicketUsableList[selectedCardIndex].gift.title}X
                                                {localTicketUsableList[selectedCardIndex].gift.gift_num}
                                            </p>
                                            : ''
                                        }
                                    </p>
                                }
                            </div>)}
                    >
                        <Brief>优惠券</Brief>
                    </ListItem>
                    <ListItem
                        wrap='true'
                        className={styles.rightPrice}
                        extra={(
                            <div className={styles.extra}>
                                <p>实付金额：<span>￥{rightPrice.toFixed(2)}</span></p>
                            </div>)}
                    >
                        <Brief>已节省：￥{savePrice.toFixed(2)}</Brief>
                    </ListItem>
                </List>
                <List className={classNames(styles.list, styles.remark)}>
                    <ListItem className={styles.noBorderItem}>
                        <Brief>备注</Brief>
                    </ListItem>
                    <TextareaItem
                        onFocus={() => {
                            // const scrollTop = document.getElementsByTagName('textarea')[0].scrollTop
                            // console.log(document.getElementsByTagName('textarea'))
                            // document.documentElement.scrollTop = document.body.scrollTop = scrollTop === 0 ? 200 : scrollTop - 200
                        }}
                        onBlur={(val) => { this.handleSaveRemark(val) }}
                        autoHeight
                        count={100}
                        labelNumber={5}
                        placeholder='请输入备注信息'
                        {...getFieldProps('remark', {
                            initialValue: remark === null ? '' : remark,
                        })}
                    />
                </List>
                <Tab rightPrice={rightPrice} />
            </div>
        )
    }
}

export default createForm()(connect(({ order, ticket, user, shoppingCart }) => {
    return {
        order,
        user,
        ticket,
        shoppingCart,
    }
})(UserOrderPay))
