import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'dva/router'

import {
    Flex,
    NavBar,
    Progress,
    Button,
} from 'antd-mobile'

import {
    TICKET_TYPE,
    TICKET_SCENE,
} from '../config/data-item'

import { wechatShare } from '../utils/wechat'

import styles from './activity-details/activity-details.less'
import stylesCom from './activity-list/activity-list.less'
import stylesTicket from '../components/ticket/ticket.less'

import ShareBtn from '../components/share-btn'
import ShareLayer from '../components/share-layer'

import SITE from '../config/site'
import ROUTES from '../config/routes'

class ActivityDetails extends React.Component {
    componentDidUpdate() {
        const {
            activity: {
                activeDetail: {
                    surplus_num: num,
                },
            },
            location: {
                pathname,
                search,
            },
        } = this.props

        const data = {
            title: '速亦鲜又给您送福利啦！！！',
            desc: `选择速亦鲜鲜蔬配送超值优惠券，仅剩${num}份！数量有限，一般关系我都不告诉他！`,
            link: SITE.DOMAIN_NAME + pathname + search,
        }

        wechatShare(data)
    }

    render() {
        const {
            dispatch,
            activity: {
                activeDetail,
                tickets,
                draw,
            },
        } = this.props

        // 活动领取百分比 领取数量 / 总数量 * 100%
        const percentNum = ((parseFloat(activeDetail.receive_num) / parseFloat(activeDetail.all_num)) * 100).toFixed(0)

        // 分享弹层数据
        const layerData = {
            num: activeDetail.surplus_num,
        }
        return (
            <div className={styles.detailContainer}>
                <NavBar
                    mode='light'
                    className={styles.navbar}
                    onLeftClick={() => { browserHistory.push(ROUTES.ACTIVITY_LIST) }}
                >
                    活动详情
                </NavBar>
                <DocumentTitle title={activeDetail.title} />
                <ShareBtn />
                <ShareLayer data={layerData} />
                <div className={classNames(styles.container, styles.bgWhite)}>
                    <div className={stylesCom.pos}>
                        <img className={stylesCom.image} src={activeDetail.image} alt='' />
                        {
                            activeDetail.status === 2
                            &&
                            <label className={classNames(stylesCom.processing)}>进行中</label>
                        }
                        {
                            activeDetail.status === 3
                            &&
                            <label className={classNames(stylesCom.status, stylesCom.over)}>活动已结束</label>
                        }
                        {
                            activeDetail.status === 4
                            &&
                            <label className={classNames(stylesCom.status, stylesCom.will)}>活动即将开始</label>
                        }
                    </div>
                    <p className={classNames(stylesCom.title, styles.detailTitle)}>{activeDetail.title}</p>
                </div>
                <div className={classNames(styles.container, styles.bgWhite)}>
                    <div className={styles.percent}>
                        <p className={styles.surplusNum}>
                            {activeDetail.surplus_num === 0 ? '已领完' : `仅剩${activeDetail.surplus_num}张`}
                        </p>
                        <div className={styles.progressInfo}>
                            <Progress position='normal' percent={percentNum} />
                            <span>{percentNum}%</span>
                        </div>
                    </div>
                    <p className={classNames(stylesCom.date, styles.detailDate)}>{activeDetail.begin_date}—{activeDetail.end_date}</p>
                </div>
                <div className={classNames(styles.container)}>
                    <p className={styles.ticketsTips}>卡券礼包：</p>
                    <div className={styles.ticketContainer}>
                        {
                            tickets.map((item, index) => {
                                return (
                                    <div className={stylesTicket.list} key={index}>
                                        <div className={stylesTicket.ticket}>
                                            <div className={stylesTicket.ticketTitle}>
                                                <p className={stylesTicket.title}>{item.title}</p>
                                                {
                                                    item.scene === TICKET_SCENE.ALL_GOODS
                                                    &&
                                                    <p className={stylesTicket.scene}>全场通用</p>
                                                }
                                                {
                                                    item.scene === TICKET_SCENE.GOODS_TYPE
                                                    &&
                                                    <p className={stylesTicket.scene}>
                                                        {
                                                            item.one_type !== null
                                                            &&
                                                            <label>{item.one_type.title}</label>
                                                        }
                                                        {
                                                            item.goods_type !== null
                                                            &&
                                                            <label>{item.goods_type.title}</label>
                                                        }
                                                        可使用
                                                    </p>
                                                }
                                                {
                                                    item.scene === TICKET_SCENE.GOOD
                                                    &&
                                                    <p className={stylesTicket.scene}>{item.good.title}可使用</p>
                                                }
                                                <p className={stylesTicket.end_date}>
                                                    有效期至：
                                                    <span
                                                        className={item.isDispalyContent ? stylesTicket.up : stylesTicket.down}
                                                        onClick={() => {
                                                            dispatch({
                                                                type: 'activity/saveIsDispalyContent',
                                                                isDispalyContent: !item.isDispalyContent,
                                                                index,
                                                            })
                                                        }}
                                                    >
                                                        {item.end_date}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className={stylesTicket.ticketType}>
                                                <Flex align='center' style={{ height: '100%' }} direction='column'>
                                                    {
                                                        item.type === TICKET_TYPE.FULL_REDUCT_CARD
                                                        &&
                                                        <Flex.Item>满减券</Flex.Item>
                                                    }
                                                    {
                                                        item.type === TICKET_TYPE.REPLACE_CASH_CARD
                                                        &&
                                                        <Flex.Item>代金券</Flex.Item>
                                                    }
                                                    {
                                                        item.type === TICKET_TYPE.GIFT_CARD
                                                        &&
                                                        <Flex.Item>礼品券</Flex.Item>
                                                    }
                                                </Flex>
                                            </div>
                                        </div>
                                        <div
                                            className={stylesTicket.info}
                                            style={{ display: item.isDispalyContent ? 'block' : 'none' }}
                                        >
                                            {item.content}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={classNames(styles.container, styles.bgWhite)}>
                    <p className={styles.contentTitle}>活动说明：</p>
                    <div
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: activeDetail.content }}
                    />
                </div>
                {
                    draw === 2
                    &&
                    <div>
                        {
                            ((activeDetail.status === 3) || (activeDetail.status === 4))
                            &&
                            <Button
                                className={styles.btnClose}
                                type='primary'
                                disabled
                            >
                                一键领取
                            </Button>
                        }
                        {
                            (activeDetail.status === 2)
                            &&
                            <Button
                                className={styles.btn}
                                type='primary'
                                onClick={() => {
                                    dispatch({
                                        type: 'activity/fetchActiveDraw',
                                        payload: {
                                            id: activeDetail.id,
                                        },
                                        query: this.props.location.query,
                                    })
                                }}
                            >
                                一键领取
                            </Button>
                        }
                    </div>
                }
                {
                    draw === 1
                    &&
                    <Button
                        className={styles.btn}
                        type='primary'
                        disabled
                    >
                        已领取
                    </Button>
                }
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(ActivityDetails)
