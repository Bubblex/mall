import React from 'react'
import { connect } from 'dva'
import { createForm } from 'rc-form'

import {
    Toast,
    Button,
    TextareaItem,
} from 'antd-mobile'
import DocumentTitle from 'react-document-title'

import style from './user-data-hobby/user-data-hobby.less'

class UserDataHobby extends React.Component {
    handleChangeHobby = () => {
        const {
            dispatch,
            form,
        } = this.props

        const hobby = form.getFieldsValue().hobby

        if (!hobby) {
            Toast.fail('请填写爱好', 1)
            return
        }

        dispatch({
            type: 'user/fetchMenberUpdateInfo',
            payload: {
                hobby,
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
                    hobby,
                },
            },
        } = this.props

        return (
            <div className={style.container}>
                <DocumentTitle title='修改爱好' />
                <TextareaItem
                    rows={4}
                    placeholder='请输入您的爱好'
                    {
                        ...getFieldProps('hobby', {
                            initialValue: hobby || '',
                        })
                    }
                />
                <Button
                    type='primary'
                    className={style.confirm}
                    onClick={this.handleChangeHobby}
                >
                    确定
                </Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserDataHobby))
