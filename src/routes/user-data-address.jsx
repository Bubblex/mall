import React from 'react'
import { connect } from 'dva'
import { createForm } from 'rc-form'

import {
    Toast,
    Button,
    TextareaItem,
} from 'antd-mobile'
import DocumentTitle from 'react-document-title'

import style from './user-data-address/user-data-address.less'

class UserDataAddress extends React.Component {
    handleChangeAddress = () => {
        const {
            dispatch,
            form,
        } = this.props

        const address = form.getFieldsValue().address

        if (!address) {
            Toast.fail('请填写地址', 1)
            return
        }

        dispatch({
            type: 'user/fetchMenberUpdateInfo',
            payload: {
                address,
            },
        })
    }
    render() {
        const {
            form: {
                getFieldProps,
            },
            user: {
                memberInfo: {
                    address,
                },
            },
        } = this.props

        return (
            <div className={style.container}>
                <DocumentTitle title='修改详细地址' />
                <TextareaItem
                    rows={4}
                    placeholder='请输入您的详细地址'
                    {
                        ...getFieldProps('address', {
                            initialValue: address || '',
                        })
                    }
                />
                <Button
                    type='primary'
                    className={style.confirm}
                    onClick={this.handleChangeAddress}
                >
                    确定
                </Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserDataAddress))
