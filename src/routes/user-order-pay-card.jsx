import React from 'react'
import { connect } from 'dva'
import { browserHistory } from 'dva/router'

import Ticket from '../components/ticket'
import ROUTES from '../config/routes'

import {
    getInfo,
    setInfo,
} from '../utils/library'

import styles from './user-order-pay-card/user-order-pay-card.less'

class UserOrderPayCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedCardId: !getInfo('selectedCard') ? '' : getInfo('selectedCard').id,
            selectedCardIndex: !getInfo('selectedCard') ? '' : getInfo('selectedCard').index,
        }
    }

    render() {
        const {
            dispatch,
            ticket: {
                ticketUsableList,
            },
        } = this.props

        return (
            <div className={styles.container}>
                {
                    ticketUsableList.map((arr, index) => {
                        const data = {
                            date_status: ticketUsableList[index].date_status,
                            end_date: ticketUsableList[index].end_date,
                            ticket: ticketUsableList[index],
                        }

                        return (
                            <Ticket
                                data={data}
                                key={index}
                                index={index}
                                dispatch={dispatch}
                                selectedCardId={this.state.selectedCardId}
                                selectedCardIndex={this.state.selectedCardIndex}
                            />
                        )
                    })
                }
                <a
                    className={styles.cancelSelected}
                    onClick={() => {
                        setInfo('selectedCard', '')
                        this.setState({
                            selectedCardId: '',
                            selectedCardIndex: '',
                        })
                        browserHistory.goBack()
                    }}
                >不使用优惠券</a>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserOrderPayCard)
