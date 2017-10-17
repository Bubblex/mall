import React from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import { createForm } from 'rc-form'
import { Link } from 'dva/router'

import {
    Steps,
    Toast,
    Button,
} from 'antd-mobile'

import styles from './user-data-phone-update/user-data-phone-update.less'
import ROUTES from '../config/routes'
import { PHONE_CODE_SECOND } from '../config/data-item'

const Step = Steps.Step

class UserDataPhoneUpdate extends React.Component {
    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'user/changeBindPhoneStepCurrent',
            bindPhoneStepCurrent: 0,
        })
    }

    handleGetCode = (step) => {
        const {
            dispatch,
            user: {
                memberInfo: {
                    phone,
                },
            },
            form,
        } = this.props

        if (step === 1) {
            dispatch({
                type: 'common/fetchVerifyMessage',
                payload: {
                    phone,
                    type: 1,
                },
            })
        }
        else if (step === 2) {
            const newphone = form.getFieldsValue().phone

            if (!newphone) {
                Toast.fail('请输入手机号', 1)
                return
            }
            else if (!(/^1[0-9]{10}$/.test(newphone))) {
                Toast.fail('手机格式不正确', 1)
                return
            }
            dispatch({
                type: 'common/fetchVerifyMessage',
                payload: {
                    phone: newphone,
                    type: 2,
                },
            })
        }

        this.timer = setInterval(() => {
            const {
                common: {
                    second,
                },
            } = this.props

            dispatch({
                type: 'common/changeSecond',
                second: second - 1,
            })
            if (second <= 1) {
                dispatch({
                    type: 'common/changeSecond',
                    second: PHONE_CODE_SECOND,
                })
                clearInterval(this.timer)
                dispatch({
                    type: 'common/saveIsGetingCode',
                    isGetingCode: 0,
                })
            }
        }, 1000)
    }

    handleCheckOldPhone = (type) => {
        const {
            form,
            user: {
                memberInfo: {
                    phone,
                },
            },
            common: {
                isGetCode,
            },
            dispatch,
        } = this.props

        if (type === 1) {
            const code = form.getFieldsValue().code

            if (!isGetCode) {
                Toast.fail('请获取验证码', 1)
                return
            }
            else if (!code) {
                Toast.fail('请输入验证码', 1)
                return
            }

            dispatch({
                type: 'user/fetchMenberBind',
                payload: {
                    type: 1,
                    phone,
                    code,
                },
            })
        }
        else if (type === 2) {
            const newphone = form.getFieldsValue().phone
            const code = form.getFieldsValue().newcode

            if (!newphone) {
                Toast.fail('请输入手机号', 1)
                return
            }
            else if (!(/^1[0-9]{10}$/.test(newphone))) {
                Toast.fail('手机格式不正确', 1)
                return
            }
            else if (!isGetCode) {
                Toast.fail('请获取验证码', 1)
                return
            }
            else if (!code) {
                Toast.fail('请输入验证码', 1)
                return
            }

            dispatch({
                type: 'user/fetchMenberBind',
                payload: {
                    type: 2,
                    phone: newphone,
                    code,
                },
            })
        }

        // 清空计时器
        dispatch({
            type: 'common/changeSecond',
            second: PHONE_CODE_SECOND,
        })
        clearInterval(this.timer)
        dispatch({
            type: 'common/saveIsGetingCode',
            isGetingCode: 0,
        })
    }

    render() {
        const {
            form: {
                getFieldProps,
            },
            common: {
                isGetingCode,
                second,
            },
            user: {
                bindPhoneStepCurrent,
                memberInfo: {
                    phone,
                },
            },
        } = this.props

        return (
            <div className={styles.containerUpdate}>
                <Steps direction='horizontal' current={bindPhoneStepCurrent}>
                    <Step title='验证旧手机' />
                    <Step title='验证新手机' />
                    <Step title='完成' />
                </Steps>
                {
                    bindPhoneStepCurrent === 0
                    &&
                    <div>
                        <p className={styles.smallTittle}>已绑定手机号：{phone}</p>
                        <div className={classNames(styles.inputContainer, styles.shortInput)}>
                            <input
                                placeholder='请输入验证码'
                                {...getFieldProps('code')}
                            />
                            {
                            isGetingCode === 0
                                &&
                                <a href='javascript:' onClick={() => { this.handleGetCode(1) }}>获取验证码</a>
                            }
                            {
                                isGetingCode === 1
                                &&
                                <p className={styles.disabled}>{second}s后重新获取</p>
                            }
                        </div>
                        <Button
                            type='primary'
                            className={styles.confirm}
                            onClick={() => { this.handleCheckOldPhone(1) }}
                        >确定</Button>
                    </div>
                }
                {
                    bindPhoneStepCurrent === 1
                    &&
                    <div>
                        <p className={styles.smallTittle}>验证新手机</p>
                        <div className={styles.inputContainer}>
                            <input
                                placeholder='请输入手机号'
                                {...getFieldProps('phone')}
                            />
                        </div>
                        <div className={classNames(styles.inputContainer, styles.shortInput)}>
                            <input
                                placeholder='请输入验证码'
                                {...getFieldProps('newcode')}
                            />
                            {
                                isGetingCode === 0
                                &&
                                <a href='javascript:' onClick={() => { this.handleGetCode(2) }}>获取验证码</a>
                            }
                            {
                                isGetingCode === 1
                                &&
                                <p className={styles.disabled}>{second}s后重新获取</p>
                            }
                        </div>
                        <Button
                            type='primary'
                            className={styles.confirm}
                            onClick={() => { this.handleCheckOldPhone(2) }}
                        >确定</Button>
                    </div>
                }
                {
                    bindPhoneStepCurrent === 2
                    &&
                    <div className={styles.finish}>
                        <p>绑定信息</p>
                        <Link to={ROUTES.USER_DATA}>返回我的信息</Link>
                    </div>
                }
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserDataPhoneUpdate))
