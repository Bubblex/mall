import React from 'react'
import { connect } from 'dva'
import { createForm } from 'rc-form'
import classNames from 'classnames'

import {
    Toast,
    Button,
} from 'antd-mobile'

import styles from './user-data-phone-update/user-data-phone-update.less'
import { PHONE_CODE_SECOND } from '../config/data-item'

class UserDataPhone extends React.Component {
    handleGetCode = () => {
        const {
            dispatch,
            form,
        } = this.props

        const phone = form.getFieldsValue().phone

        if (!phone) {
            Toast.fail('请输入手机号', 1)
            return
        }
        else if (!(/^1[0-9]{10}$/.test(phone))) {
            Toast.fail('手机格式不正确', 1)
            return
        }

        dispatch({
            type: 'common/fetchVerifyMessage',
            payload: {
                phone,
                type: 2,
            },
        })

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

    handleBindPhone = () => {
        const {
            dispatch,
            form,
            common: {
                isGetCode,
            },
        } = this.props
        const phone = form.getFieldsValue().phone
        const code = form.getFieldsValue().code

        if (!phone) {
            Toast.fail('请输入手机号', 1)
            return
        }
        else if (!(/^1[0-9]{10}$/.test(phone))) {
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
                code,
                phone,
                type: 2,
            },
        })

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
        } = this.props


        return (
            <div className={styles.container}>
                <p className={styles.title}>您的手机号码是？</p>
                <div className={styles.inputContainer}>
                    <input
                        placeholder='请输入手机号'
                        {...getFieldProps('phone')}
                    />
                </div>
                <p className={styles.title}>验证码</p>
                <div className={classNames(styles.inputContainer, styles.shortInput)}>
                    <input
                        placeholder='请输入验证码'
                        {...getFieldProps('code')}
                    />
                    {
                        isGetingCode === 0
                        &&
                        <a href='javascript:' onClick={this.handleGetCode}>获取验证码</a>
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
                    onClick={this.handleBindPhone}
                >确定</Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserDataPhone))
