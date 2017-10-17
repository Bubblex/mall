import React from 'react'
import { connect } from 'dva'
import { createForm } from 'rc-form'

import {
    List,
    Toast,
    Button,
    InputItem,
    ImagePicker,
    TextareaItem,
} from 'antd-mobile'

import styles from './operator-return/operator-return.less'
import GoodList from '../components/goodsList'
import OperatorOrderDetailHeader from '../components/opreator-order-detail-header'

const ListItem = List.Item

class OperatorReturn extends React.Component {
    submitApplyFeedbackInfo = () => {
        const {
            form,
            operator: {
                images,
                operatorOrderDetail: {
                    code,
                },
            },
            dispatch,
        } = this.props

        const title = form.getFieldsValue().title
        const content = form.getFieldsValue().content

        if (!title) {
            Toast.fail('未填写标题', 1)
        }
        else if (!content) {
            Toast.fail('未填写内容', 1)
        }
        else if (images.length === 0) {
            Toast.fail('未上传图片', 1)
        }
        else {
            dispatch({
                type: 'operator/fetchOperatorFeedback',
                payload: {
                    code,
                    title,
                    content,
                    images,
                },
            })
        }
    }

    handleUploadImage = (files, type, index) => {
        const {
            dispatch,
        } = this.props

        if (type === 'add') {
            dispatch({
                type: 'operator/saveFeedbackUploadImage',
                image: files[files.length - 1].url,
            })
        }
        else if (type === 'remove') {
            dispatch({
                type: 'operator/removeFeedbackUploadImage',
                index,
            })
        }
    }

    render() {
        const {
            operator: {
                operatorOrderDetail: {
                    details,
                },
                images,
            },
            form: {
                getFieldProps,
            },
        } = this.props


        return (
            <div className={styles.container}>
                <OperatorOrderDetailHeader />
                <GoodList goodsList={details} />
                <List className={styles.list}>
                    <InputItem
                        placeholder='请输入标题'
                        {
                            ...getFieldProps('title')
                        }
                    >标题：</InputItem>
                    <TextareaItem
                        placeholder='请输入内容'
                        title='内容：'
                        rows={3}
                        {
                            ...getFieldProps('content')
                        }
                    />
                    <ListItem>
                        上传图片：
                        <ImagePicker
                            files={images}
                            selectable={images.length < 3}
                            onChange={this.handleUploadImage}
                        />
                    </ListItem>
                </List>
                <Button
                    type='primary'
                    onClick={this.submitApplyFeedbackInfo}
                >确定</Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(OperatorReturn))
