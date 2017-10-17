import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { browserHistory } from 'dva/router'

import {
    Steps,
    NavBar,
    SegmentedControl,
} from 'antd-mobile'

import GoodsList from '../components/goodsList'
import styles from './user-order-detail/user-order-detail.less'

import {
    TICKET_TYPE,
    ORDER_STATUS,
    ORDER_STATUS_MAP,
    CONSUMER_HOTLINE,
} from '../config/data-item'

import { wechatShare } from '../utils/wechat'

import ROUTES from '../config/routes'

import ShareBtn from '../components/share-btn'
import ShareLayer from '../components/share-layer'

import SITE from '../config/site'

const Step = Steps.Step

class UserOrderDetail extends React.Component {
    componentDidUpdate() {
        const {
            order: {
                orderListDetail,
                orderListDetail: {
                    d_price: shareDPrice,
                },
            },
        } = this.props

        const data = {
            title: `看看我的买菜清单，共省了${shareDPrice && shareDPrice.toFixed(2)}元！`,
            desc: `选择速亦鲜鲜蔬配送，菜品新鲜又便宜，今天一共省了${shareDPrice && shareDPrice.toFixed(2)}元，真是太实惠了！`,
            link: `${SITE.DOMAIN_NAME}${ROUTES.PRODUCTS_DETAILS}?id=${orderListDetail.details[0].goods_id}`,
        }

        wechatShare(data)
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'order/removeOrderDetail',
        })
    }

    handleChangeTabs = (val) => {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'order/saveShowTabsIndex',
            showTabsIndex: val,
        })
    }

    handleMap = () => {
        const {
            lat,
            lng,
            region_title: regionTitle,
            village_title: villageTitle,
            village_address: villageAddress,
            point_title: pointTitle,
        } = this.props.order.orderListDetail
        // 跳转微信地图
        // openLocation(data)

        // 跳转百度地图
        window.location.href = `http://api.map.baidu.com/marker?location=${parseFloat(lat)},${parseFloat(lng)}&title=${regionTitle}${villageTitle}${pointTitle}&content=${regionTitle}${villageTitle}${villageAddress}${pointTitle}&output=html&src=速亦鲜`
    }

    render() {
        const {
            order: {
                orderListDetail: {
                    code,
                    status,
                    address_title: addressTitle,
                    address_phone: addressPhone,
                    region_title: regionTitle,
                    village_title: villageTitle,
                    village_address: villageAddress,
                    point_title: pointTitle,
                    point_image: pointImage,
                    info,
                    o_price: oPrice,
                    p_price: PPrice,
                    d_price: DPrice,
                    price,
                    ticket,
                    order_date: orderDate,
                    pay_date: payDate,
                    delivery_date: deliveryDate,
                    deal_date: dealDate,
                    arrival_date: arrivalDate,
                    cancel_date: cancelDate,
                    apply_date: applyDate,
                    finish_date: finishDate,
                    account,
                    details,
                },
                showTabsIndex,
            },
        } = this.props

        // 分享弹层数据
        const layerData = {
            DPrice,
        }

        return (
            <div className={styles.bigContainer}>
                <ShareBtn />
                <NavBar
                    mode='light'
                    className={styles.navbar}
                    onLeftClick={() => { browserHistory.push(ROUTES.USER_ORDER_LIST) }}
                />
                <ShareLayer data={layerData} />
                <div className={styles.tabBtnContainer}>
                    <SegmentedControl
                        values={['订单详情', '订单状态']}
                        onValueChange={(val) => { this.handleChangeTabs(val) }}
                    />
                </div>
                {
                    showTabsIndex === '订单详情'
                    &&
                    <div className={styles.detailsContainer}>
                        <div className={classNames(styles.codeInfoContainer, styles.container)}>
                            <p className={styles.leftTitle}>
                                订单编号：
                                <span>{code}</span>
                            </p>
                            <p className={styles.leftTitle}>
                                下单时间：
                                <span>{orderDate}</span>
                            </p>
                            <p className={styles.leftTitle}>
                                订单状态：
                                <span className={status === 1 ? styles.fail : status === 6 ? styles.fail : ''}>{ORDER_STATUS_MAP[status]}</span>
                            </p>
                        </div>
                        <GoodsList goodsList={details} />
                        <div className={classNames(styles.addressContainer, styles.container)}>
                            <p className={styles.leftTitle}>收件人：</p>
                            <p>{addressTitle} <span className={styles.phone}>{addressPhone}</span></p>
                            <p>{regionTitle}{villageTitle}{villageAddress}</p>
                            <p>{pointTitle}</p>
                            <p className={classNames(styles.leftTitle, styles.split)}>备注：</p>
                            <p>{info}</p>
                        </div>

                        <div className={classNames(styles.priceContainer, styles.container)}>
                            <p className={styles.leftTitle}>
                                商品总额
                                <span className={classNames(styles.right, styles.allPrice)}>
                                    ￥{PPrice && PPrice.toFixed(2)}
                                </span>
                                <s>￥{oPrice && oPrice.toFixed(2)}</s>
                            </p>
                            {
                                ticket
                                &&
                                <div>
                                    <p className={styles.leftTitle}>
                                        优惠券
                                        <span className={classNames(styles.right, styles.cardPrice)}>
                                            {ticket.ticket_info.type === TICKET_TYPE.FULL_REDUCT_CARD
                                            ? `-￥${ticket.ticket_info.reduce_price && ticket.ticket_info.reduce_price.toFixed(2)}`
                                            : ticket.ticket_info.type === TICKET_TYPE.REPLACE_CASH_CARD
                                            ? `-￥${ticket.ticket_info.cash_price && ticket.ticket_info.cash_price.toFixed(2)}`
                                            : ticket.ticket_info.title}
                                        </span>
                                    </p>
                                </div>
                            }
                            <p className={classNames(styles.leftTitle, styles.split)}>
                                已节省：<span>￥{DPrice && DPrice.toFixed(2)}</span>
                                <span className={classNames(styles.right, styles.rightPrice)}>
                                    实付金额：
                                    <label>￥{price && price.toFixed(2)}</label>
                                </span>
                            </p>
                        </div>
                    </div>
                }
                {
                    showTabsIndex === '订单状态'
                    &&
                    <div className={styles.orderStatus}>
                        <div className={styles.stepsContainer}>
                            <Steps current={0}>
                                {
                                    finishDate && status === ORDER_STATUS.FINISHED_FOR_SALE
                                    &&
                                    <Step
                                        title={<p>售后已完成<span>{finishDate}</span></p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.FINISHED_FOR_SALE
                                                ? styles.iconGreen
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                {
                                    dealDate
                                    &&
                                    <Step
                                        title={<p>售后处理中<span>{dealDate}</span></p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.PROCESS_FOR_SALE
                                                ? styles.iconRed
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                {
                                    applyDate
                                    &&
                                    <Step
                                        title={<p>正在申请退货<span>{applyDate}</span></p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.APPLT_FOR_SALE
                                                ? styles.iconRed
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                {
                                    finishDate && status === ORDER_STATUS.FINISHED
                                    &&
                                    <Step
                                        title={<p>已完成<span>{finishDate}</span></p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.FINISHED
                                                ? styles.iconGreen
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                {
                                    arrivalDate
                                    &&
                                    <Step
                                        title={<p>已到自提点<span>{arrivalDate}</span></p>}
                                        description={(
                                            <div>
                                                <div className={styles.pointInfo}>
                                                    <p>{pointTitle}，五点配送</p>
                                                    <p>取菜点管理员：</p>
                                                    {
                                                        account.map(({ title, phone }, index) => (
                                                            <p key={index} className={styles.accounts}>
                                                                <span>{title}</span>
                                                                <a href={`tel:${phone}`}>{phone}</a>
                                                            </p>
                                                        ))
                                                    }
                                                    <a
                                                        href='javascript:'
                                                        className={styles.mapBtn}
                                                        onClick={this.handleMap}
                                                    >地址导航</a>
                                                </div>
                                                <img alt='' src={pointImage} className={styles.pointImage} />
                                            </div>
                                        )}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.TO_BE_PICK_UP
                                                ? styles.iconRed
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                {
                                    deliveryDate
                                    &&
                                    <Step
                                        title={<p>发货中<span>{deliveryDate}</span></p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.IN_DELIVERY
                                                ? styles.iconRed
                                                : '')
                                            }
                                        />}
                                        description={(
                                            <div>
                                                <p>{pointTitle}，五点配送</p>
                                                <p>取菜点管理员：</p>
                                                {
                                                    account.map(({ title, phone }, index) => (
                                                        <p key={index} className={styles.accounts}>
                                                            <span>{title}</span>
                                                            <a href={`tel:${phone}`}>{phone}</a>
                                                        </p>
                                                    ))
                                                }
                                            </div>
                                        )}
                                    />
                                }
                                {
                                    payDate
                                    &&
                                    <Step
                                        title={<p>已付款<span>{payDate}</span></p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.ALREADY_PAY
                                                ? styles.iconRed
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                {
                                    cancelDate
                                    &&
                                    <Step
                                        title={<p>已取消<span>{cancelDate}</span></p>}
                                        description={<p>取消原因（12点之前未付款，订单12点之后已自动取消）</p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.CANCEL
                                                ? styles.iconRed
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                {
                                    status === ORDER_STATUS.TO_BE_PAG
                                    &&
                                    <Step
                                        title={<p>付款中</p>}
                                        description={<p>请在12点之前付款，否则订单12点之后会自动取消</p>}
                                        icon={<div
                                            className={classNames(styles.icon,
                                                status === ORDER_STATUS.TO_BE_PAG
                                                ? styles.iconRed
                                                : '')
                                            }
                                        />}
                                    />
                                }
                                <Step
                                    title={<p>已下单<span>{orderDate}</span></p>}
                                    description={<p>订单编号：{code}</p>}
                                    icon={<div className={styles.icon} />}
                                />
                            </Steps>
                        </div>
                        <a className={styles.hotLink} href={`tel:${CONSUMER_HOTLINE}`}>联系客服</a>
                    </div>
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserOrderDetail)
