import React from 'react'
import { connect } from 'dva'

import OperatorOrderDetailHeader from '../components/opreator-order-detail-header'
import GoodList from '../components/goodsList'

class OperatorOrderDetails extends React.Component {
    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'operator/removeOperatorOrderDetail',
        })
    }

    render() {
        const {
            operator: {
                operatorOrderDetail: {
                    details,
                },
            },
        } = this.props
        return (
            <div>
                <OperatorOrderDetailHeader />
                <GoodList goodsList={details} />
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(OperatorOrderDetails)
