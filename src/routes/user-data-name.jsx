import React from 'react'
import { connect } from 'dva'
import { createForm } from 'rc-form'

import {
    Toast,
    Button,
    InputItem,
} from 'antd-mobile'
import DocumentTitle from 'react-document-title'

import style from './user-data-name/user-data-name.less'

class UserDataName extends React.Component {
    handleChangeName = () => {
        const {
            dispatch,
            form,
        } = this.props

        const title = form.getFieldsValue().name

        if (!title) {
            Toast.fail('请填写姓名', 1)
            return
        }

        dispatch({
            type: 'user/fetchMenberUpdateInfo',
            payload: {
                title,
            },
        })
    }

    render() {
        const {
            form: {
                getFieldProps,
            },
        } = this.props

        const {
            user: {
                memberInfo: {
                    title,
                },
            },
        } = this.props

        return (
            <div className={style.container}>
                <DocumentTitle title='修改姓名' />
                <InputItem
                    maxLength='16'
                    clear='true'
                    {
                        ...getFieldProps('name', {
                            initialValue: title,
                        })
                    }
                />
                <Button
                    type='primary'
                    className={style.confirm}
                    onClick={this.handleChangeName}
                >
                    确定
                </Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserDataName))
