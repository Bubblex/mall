import React from 'react'
import { Router, Route } from 'dva/router'

import ROUTES from './config/routes'

function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Route component={require('./routes/basic-layout')}>
                {/* <Route path={ROUTES.START_UP} component={require('./routes/start-up')} /> */}
                <Route path={ROUTES.FORBIDDEN} component={require('./routes/forbidden')} />

                <Route showMenu showCart path={ROUTES.PRODUCTS_LIST} component={require('./routes/products-list')} />
                <Route path={ROUTES.PRODUCTS_DETAILS} component={require('./routes/products-details')} />
                <Route showHome path={ROUTES.PRODUCTS_RECOMMEND_SEASON} component={require('./routes/products-recommend-season')} />
                <Route showHome path={ROUTES.PRODUCTS_RECOMMEND_RANKING} component={require('./routes/products-recommend-ranking')} />
                <Route path={ROUTES.PRODUCTS_NONE} component={require('./routes/products-none')} />
                <Route showMenu path={ROUTES.PRODUCTS_SEARCH} component={require('./routes/products-search')} />
                <Route showCart path={ROUTES.PRODUCTS_TAG} component={require('./routes/products-tag')} />

                <Route path={ROUTES.SHOPPING_CART} component={require('./routes/shopping-cart')} />

                <Route showMenu path={ROUTES.MENU_INDEX} component={require('./routes/menu-index')} />
                <Route path={ROUTES.MENU_THREE_MEALS} component={require('./routes/menu-three-meals')} />
                <Route path={ROUTES.MENU_SCENES} component={require('./routes/menu-scenes')} />
                <Route path={ROUTES.MENU_LIST} component={require('./routes/menu-list')} />
                <Route path={ROUTES.MENU_DETAILS} component={require('./routes/menu-details')} />
                <Route path={ROUTES.MENU_DETAILS_STEPS} component={require('./routes/menu-details-steps')} />
                <Route path={ROUTES.MENU_BUY} component={require('./routes/menu-buy')} />

                <Route showMenu path={ROUTES.USER_CENTER} component={require('./routes/user-center')} />
                <Route path={ROUTES.USER_PICKUP} component={require('./routes/user-pickup')} />
                <Route path={ROUTES.USER_PICKUP_DESCRIPTION} component={require('./routes/user-pickup-description')} />
                <Route path={ROUTES.USER_DATA} component={require('./routes/user-data')} />
                <Route path={ROUTES.USER_DATA_NAME} component={require('./routes/user-data-name')} />
                <Route path={ROUTES.USER_DATA_AVATAR} component={require('./routes/user-data-avatar')} />
                <Route path={ROUTES.USER_DATA_PHONE} component={require('./routes/user-data-phone')} />
                <Route path={ROUTES.USER_DATA_HOBBY} component={require('./routes/user-data-hobby')} />
                <Route path={ROUTES.USER_DATA_ADDRESS} component={require('./routes/user-data-address')} />
                <Route path={ROUTES.USER_DATA_PHONEUPDATE} component={require('./routes/user-data-phoneupdate')} />
                <Route path={ROUTES.USER_DATA_TASTE} component={require('./routes/user-data-taste')} />
                <Route path={ROUTES.USER_ORDER_LIST} component={require('./routes/user-order-list')} />
                <Route path={ROUTES.USER_ORDER_DETAIL} component={require('./routes/user-order-detail')} />
                <Route path={ROUTES.USER_ORDER_PAY} component={require('./routes/user-order-pay')} />
                <Route path={ROUTES.USER_ORDER_PAY_LIST} component={require('./routes/user-order-pay-list')} />
                <Route path={ROUTES.USER_ORDER_PAY_TYPE} component={require('./routes/user-order-pay-type')} />
                <Route path={ROUTES.USER_ORDER_PAY_CARD} component={require('./routes/user-order-pay-card')} />
                <Route path={ROUTES.USER_ORDER_PAY_ADDRESS} component={require('./routes/user-order-pay-address')} />
                <Route path={ROUTES.USER_ORDER_PAY_SUCCESS} component={require('./routes/user-order-pay-success')} />
                <Route path={ROUTES.USER_ORDER_PAY_FAIL} component={require('./routes/user-order-pay-fail')} />
                <Route path={ROUTES.USER_ADDRESS} component={require('./routes/user-address')} />
                <Route path={ROUTES.USER_ADDRESS_ADD} component={require('./routes/user-address-add')} />
                <Route path={ROUTES.USER_CARD_LIST} component={require('./routes/user-card-list')} />
                <Route path={ROUTES.USER_CARD_LIST_UNAVAILABLE} component={require('./routes/user-card-list-unavailable')} />
                <Route showCart path={ROUTES.USER_COLLECTION} component={require('./routes/user-collection')} />
                <Route path={ROUTES.USER_MESSAGE} component={require('./routes/user-message')} />
                <Route path={ROUTES.USER_MESSAGE_LIST} component={require('./routes/user-message-list')} />
                <Route path={ROUTES.USER_ABOUTUS} component={require('./routes/user-aboutus')} />
                <Route path={ROUTES.USER_BILL} component={require('./routes/user-bill')} />
                <Route path={ROUTES.USER_BILL_DETAIL} component={require('./routes/user-bill-detail')} />

                <Route path={ROUTES.OPERATOR_CONTROL} component={require('./routes/operator-control')} />
                <Route path={ROUTES.OPERATOR_ACCEPT_CHECK} component={require('./routes/operator-accept-check')} />
                <Route path={ROUTES.OPERATOR_ORDER_LIST} component={require('./routes/operator-order-list')} />
                <Route path={ROUTES.OPERATOR_ORDER_DETAILS} component={require('./routes/operator-order-details')} />
                <Route path={ROUTES.OPERATOR_ORDER_HISTORY} component={require('./routes/operator-order-history')} />
                <Route path={ROUTES.OPERATOR_RETURN} component={require('./routes/operator-return')} />

                <Route showMenu path={ROUTES.ACTIVITY_LIST} component={require('./routes/activity-list')} />
                <Route path={ROUTES.ACTIVITY_DATAILS} component={require('./routes/activity-details')} />
                <Route path={ROUTES.ACTIVITY_TASK_INDEX} component={require('./routes/activity-task-index')} />
                <Route path={ROUTES.ACTIVITY_TASK_FOLLOW} component={require('./routes/activity-task-follow')} />
                <Route path={ROUTES.ACTIVITY_TASK_DATA} component={require('./routes/activity-task-data')} />
                <Route path={ROUTES.ACTIVITY_TASK_ORDER} component={require('./routes/activity-task-order')} />

                <Route path='*' component={require('./routes/error')} />
            </Route>
        </Router>
    )
}

export default RouterConfig
