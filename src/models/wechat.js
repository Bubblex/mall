import ROUTES from '../config/routes'
import { fetchMenberScancod } from '../services/user'

import { setConfig } from '../utils/wechat'

export default {
    namespace: 'wechat',
    state: {
        config: {},
    },
    reducers: {
        saveConfig(state, { config }) {
            return {
                ...state,
                config,
            }
        },
    },
    effects: {
        *fetchMenberScancod({ payload }, { call, put }) {
            const {
                response: {
                    data,
                },
            } = yield call(fetchMenberScancod, payload)

            yield put({
                type: 'saveConfig',
                config: data,
            })

            setConfig(data)
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname !== ROUTES.FORBIDDEN) {
                    dispatch({
                        type: 'fetchMenberScancod',
                        payload: {
                            url: window.location.href,
                        },
                    })
                }
            })
        },
    },
}
