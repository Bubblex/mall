import React from 'react'
import { connect } from 'dva'
import { Link, browserHistory } from 'dva/router'
import moment from 'moment'

import {
    List,
    Picker,
    DatePicker,
} from 'antd-mobile'

import styles from './user-data/user-data.less'
import ROUTES from '../config/routes'
import { SEX } from '../config/data-item'
import GiftCardLayer from '../components/gift-card'

const ListItem = List.Item

class UserData extends React.Component {
    handleChangeBirth = (date) => {
        const {
            dispatch,
        } = this.props
        const birth = date.format('YYYY-MM-DD')

        dispatch({
            type: 'user/fetchMenberUpdateInfo',
            payload: {
                birth,
            },
            back: false,
        })
    }

    handleChangeSex = (data) => {
        const {
            dispatch,
        } = this.props
        const sex = data[0]

        dispatch({
            type: 'user/fetchMenberUpdateInfo',
            payload: {
                sex,
            },
            back: false,
        })
    }

    render() {
        const {
            user: {
                memberInfo: {
                    sex,
                    tags,
                    image,
                    title,
                    phone,
                    birth,
                    hobby,
                    address,
                },
            },
        } = this.props

        const sexData = [
            {
                label: '男',
                value: SEX.MALE,
            },
            {
                label: '女',
                value: SEX.FEMALE,
            },
            {
                label: '保密',
                value: SEX.NONE,
            },
        ]

        const tagsLabel = []
        for (const tag of tags) {
            tagsLabel.push(tag.label)
        }

        const myDate = new Date()
        const maxDate = `${myDate.getFullYear()}-${myDate.getMonth() + 1}-${myDate.getDate()}`

        return (
            <div className={styles.container}>
                <GiftCardLayer />
                <div className={styles.avatarContainer}>
                    <img alt={title} src={image} />
                    <Link to={ROUTES.USER_DATA_AVATAR}>点击修改头像</Link>
                </div>
                <List className={styles.list}>
                    <ListItem
                        wrap='true'
                        arrow='horizontal'
                        extra={<p>{title}</p>}
                        onClick={() => { browserHistory.push(ROUTES.USER_DATA_NAME) }}
                    >
                        真实姓名
                    </ListItem>
                    <Picker
                        cols={1}
                        data={sexData}
                        onChange={this.handleChangeSex}
                        extra={<p>{sex === SEX.MALE ? '男' : sex === SEX.FEMALE ? '女' : sex === SEX.NONE ? '保密' : ''}</p>}
                    >
                        <ListItem
                            wrap='true'
                            arrow='horizontal'
                            className={styles.hasChangeIcon}
                        >
                            性别
                        </ListItem>
                    </Picker>
                    <ListItem
                        wrap='true'
                        arrow='horizontal'
                        extra={<p className={!phone ? styles.noneData : ''}>
                            {!phone ? '请绑定手机号' : phone}
                        </p>}
                        onClick={() => { browserHistory.push(!phone ? ROUTES.USER_DATA_PHONE : ROUTES.USER_DATA_PHONEUPDATE) }}
                    >
                        手机号
                    </ListItem>
                    <ListItem
                        wrap='true'
                        arrow='horizontal'
                        extra={<p className={!address ? styles.noneData : ''}>
                            {!address ? '请填写详细地址' : address}
                        </p>}
                        onClick={() => { browserHistory.push(ROUTES.USER_DATA_ADDRESS) }}
                    >
                        详细地址
                    </ListItem>
                    <DatePicker
                        mode='date'
                        title='选择时间'
                        extra={<p className={!birth ? styles.noneData : ''}>
                            {!birth ? '请填写生日' : birth}
                        </p>}
                        onChange={this.handleChangeBirth}
                        maxDate={moment(maxDate, 'YYYY-MM-DD')}
                        minDate={moment('1980-1-1', 'YYYY-MM-DD')}
                    >
                        <ListItem
                            wrap='true'
                            arrow='horizontal'
                            className={styles.hasChangeIcon}
                        >
                            生日
                        </ListItem>
                    </DatePicker>
                    <ListItem
                        wrap='true'
                        arrow='horizontal'
                        extra={<p className={tags.length === 0 ? styles.noneData : ''}>
                            {tags.length === 0 ? '请选择口味' : tagsLabel.join('、')}
                        </p>}
                        onClick={() => { browserHistory.push(ROUTES.USER_DATA_TASTE) }}
                    >
                        口味
                    </ListItem>
                    <ListItem
                        wrap='true'
                        arrow='horizontal'
                        extra={<p className={!hobby ? styles.noneData : ''}>
                            {!hobby ? '请填写爱好' : hobby}
                        </p>}
                        onClick={() => { browserHistory.push(ROUTES.USER_DATA_HOBBY) }}
                    >
                        爱好
                    </ListItem>
                </List>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserData)
