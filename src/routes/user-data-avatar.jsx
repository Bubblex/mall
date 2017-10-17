import React from 'react'
import { connect } from 'dva'

import {
    Button,
} from 'antd-mobile'
import DocumentTitle from 'react-document-title'

import styles from './user-data-avatar/user-data-avatar.less'

class UserDataAvatar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: '',
            imagePreviewUrl: '',
        }
    }

    handleUploadImage = (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const file = e.target.files[0]
        reader.onloadend = () => {
            this.setState({
                file,
                imagePreviewUrl: reader.result,
            })

            const {
                dispatch,
            } = this.props

            dispatch({
                type: 'user/fetchMenberUpdateInfo',
                payload: {
                    image: reader.result,
                },
            })
        }
        reader.readAsDataURL(file)
    }

    render() {
        const {
            state: {
                imagePreviewUrl,
            },
            props: {
                user: {
                    memberInfo: {
                        title,
                        image,
                    },
                },
            },
        } = this

        return (
            <div className={styles.content}>
                <DocumentTitle title='修改头像' />
                <img alt={title} src={!imagePreviewUrl ? image : imagePreviewUrl} />
                <Button className={styles.uploadImg} type='primary' size='small'>
                    上传图片
                    <input
                        type='file'
                        onChange={(e) => { this.handleUploadImage(e) }}
                        accept='image/jpg,image/jpeg,image/png,image/gif'
                    />
                </Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserDataAvatar)
