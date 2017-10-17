import React from 'react'
import { connect } from 'dva'

import {
    Button,
} from 'antd-mobile'
import styles from './gift-card/gift-card.less'

import Ticket from '../components/ticket'

class giftCardLayer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            // 1- 展示领取礼包 2-展示卡券一键领取
            isShowGift: 1,
            closeLayer: 0,
        }
    }
    render() {
        const {
            user: {
                giftCard: {
                    is_info: isInfo,
                    tickets,
                },
            },
        } = this.props

        return (
            <div
                className={styles.container}
                style={{ display: isInfo !== 1 || this.state.closeLayer === 1 ? 'none' : 'block' }}
            >
                <div className={styles.content}>
                    <h1>新用户大礼包</h1>
                    {
                        this.state.isShowGift === 1
                        &&
                        <div>
                            <div className={styles.gift} />
                            <Button
                                type='primary'
                                onClick={() => {
                                    this.setState({
                                        isShowGift: 2,
                                    })
                                }}
                            >点击打开</Button>
                        </div>
                    }
                    {
                        this.state.isShowGift === 2
                        &&
                        <div className={styles.ticket}>
                            {
                                tickets.map((arr, index) => {
                                    return (
                                        <Ticket data={arr} key={index} gift={1} />
                                    )
                                })
                            }
                            <Button
                                type='primary'
                                onClick={() => {
                                    this.setState({
                                        closeLayer: 1,
                                    })
                                }}
                            >一键领取</Button>
                        </div>
                    }
                    <div
                        onClick={() => {
                            this.setState({
                                closeLayer: 1,
                            })
                        }}
                        className={styles.close}
                    />
                </div>
            </div>
        )
    }
}


export default connect((state) => {
    return state
})(giftCardLayer)
