import React from 'react'
import { browserHistory } from 'dva/router'
import { connect } from 'dva'

import {
    Flex,
    Radio,
} from 'antd-mobile'
import ROUTES from '../config/routes'

import {
    TICKET_SCENE,
    TICKET_STATUS,
    TICKET_TYPE_MAP,
    TICKET_USE_STATUS,
} from '../config/data-item'

import styles from './ticket/ticket.less'
import commonStyles from '../app.less'

import {
    setInfo,
} from '../utils/library'

class Ticket extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayContent: false,
        }
    }

    saveSelectedCard = (id, index) => {
        const selectedCard = {
            id,
            index,
        }

        setInfo('selectedCard', selectedCard)

        browserHistory.goBack()
    }

    handleUseRightNow = (scene) => {
        const data = this.props.data || {
            ticket: {
                one_type: {},
                goods_type: {},
                good: {},
            },
        }
        const {
            ticket: {
                one_type: oneType,
                goods_type: goodsType,
                good,
            },
        } = data

        const {
            products: {
                goodType,
            },
            dispatch,
        } = this.props

        // 商品分类券
        if (scene === TICKET_SCENE.GOODS_TYPE) {
            const oneTypeArr = []
            const twoTypeArr = []

            for (const item of goodType) {
                oneTypeArr.push(item.value)
            }

            if (goodsType) {
                for (const item of goodType[oneTypeArr.indexOf(oneType.id)].children) {
                    twoTypeArr.push(item.value)
                }
            }

            dispatch({
                type: 'products/changeSelectedGoodType',
                selectedGoodType: {
                    one: oneType.id,
                    two: goodsType ? goodsType.id : -1,
                    oneIndex: oneTypeArr.indexOf(oneType.id),
                    twoIndex: 0,
                },
            })
        }

        browserHistory.push(scene === TICKET_SCENE.ALL_GOODS
        ? ROUTES.PRODUCTS_LIST
        : scene === TICKET_SCENE.GOODS_TYPE
        ? `${ROUTES.PRODUCTS_LIST}`
        : scene === TICKET_SCENE.GOOD
        ? `${ROUTES.PRODUCTS_DETAILS}?id=${good.id}`
        : '')
    }

    render() {
        const data = this.props.data || {
            ticket: {
                one_type: {},
                goods_type: {},
                good: {},
            },
        }

        const {
            date_status: dateStatus,
            end_date: endDate,
            ticket: {
                id,
                account_ticket_id: accountTicketId,
                title,
                type,
                scene,
                not_applicable: notSpplicable,
                status: useStatus,
                one_type: oneType,
                goods_type: goodsType,
                good,
                content,
            },
        } = data

        const {
            status,

            // 结算页选择卡券-选中index
            index,

            // 结算页选择卡券-选中id
            selectedCardId,

            // gift === 1 是礼包卡券
            gift,
        } = this.props

        return (
            <div className={styles.list}>
                <div className={styles.ticket}>
                    <div
                        className={
                            !status
                            ? useStatus === TICKET_USE_STATUS.CANNOT_USE
                            ? styles.unticketTitle
                            : styles.ticketTitle
                            : styles.unticketTitle
                        }
                    >
                        <p
                            className={styles.title}
                        >
                            {title}
                            {
                                !status
                                &&
                                <span> {dateStatus === 2 ? '（即将过期）' : null}</span>
                            }
                        </p>

                        <p className={styles.scene}>
                            {
                                scene === TICKET_SCENE.ALL_GOODS
                                ? '全场通用'
                                : scene === TICKET_SCENE.GOODS_TYPE
                                ? oneType === null
                                ? `${goodsType.title}可使用`
                                : goodsType === null
                                ? `${oneType.title}可使用`
                                : `${oneType.title}${goodsType.title}可使用`
                                : scene === TICKET_SCENE.GOOD
                                ? `${good.title}可使用`
                                : ''
                            }
                        </p>

                        <p className={styles.end_date}>
                            有效期至：
                            <span
                                className={this.state.displayContent ? styles.up : styles.down}
                                onClick={() => {
                                    this.setState({
                                        displayContent: !this.state.displayContent,
                                    })
                                }}
                            >
                                {endDate}
                            </span>
                        </p>
                    </div>
                    <div
                        className={
                            !status
                            ? useStatus === TICKET_USE_STATUS.CANNOT_USE
                            ? styles.unticketType
                            : styles.ticketType
                            : styles.unticketType
                        }
                    >
                        <Flex align='center' style={{ height: '100%' }} direction='column'>
                            <Flex.Item>{TICKET_TYPE_MAP[type]}</Flex.Item>
                            <div>
                                {
                                    !status && !useStatus && gift !== 1
                                    &&
                                    <Flex.Item
                                        className={styles.btn}
                                        onClick={() => {
                                            this.handleUseRightNow(scene)
                                        }}
                                    >
                                        立即使用
                                    </Flex.Item>
                                }
                                {
                                    status && gift !== 1
                                    &&
                                    <Flex.Item
                                        className={styles.btn}
                                    >
                                        {
                                            status === TICKET_STATUS.EXPIRED
                                            ? '已过期'
                                            : status === TICKET_STATUS.USED
                                            ? '已使用'
                                            : ''
                                        }
                                    </Flex.Item>
                                }
                                {
                                    useStatus === TICKET_USE_STATUS.CAN_USE && gift !== 1
                                    &&
                                    <Radio
                                        className={commonStyles.radio}
                                        checked={accountTicketId === selectedCardId}
                                        onChange={() => { this.saveSelectedCard(accountTicketId, index) }}
                                    />
                                }
                                {
                                    useStatus === TICKET_USE_STATUS.CANNOT_USE && gift !== 1
                                    &&
                                    <Radio
                                        className={commonStyles.radio}
                                        disabled
                                    />
                                }
                            </div>
                        </Flex>
                    </div>
                </div>
                <div
                    className={styles.info}
                    style={{ display: this.state.displayContent ? 'block' : 'none' }}
                >
                    {
                        useStatus === TICKET_USE_STATUS.CANNOT_USE
                        ? notSpplicable
                        : content
                    }
                </div>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(Ticket)
