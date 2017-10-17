import React from 'react'
import { connect } from 'dva'

import {
    Button,
    Checkbox,
} from 'antd-mobile'
import DocumentTitle from 'react-document-title'

import styles from './user-data-taste/user-data-taste.less'

class UserDataTaste extends React.Component {
    handleCheckBox = (e, value) => {
        const {
            dispatch,
            user: {
                selectedTag,
            },
        } = this.props

        if (e.target.checked) {
            const addSelectedTag = selectedTag
            addSelectedTag.push(value)

            dispatch({
                type: 'user/saveSelectedTag',
                selectedTag: addSelectedTag,
            })
        }
        else {
            const cancelSelectedTag = selectedTag
            let index

            for (let i = 0; i < selectedTag.length; i += 1) {
                if (value === selectedTag[i]) {
                    index = i
                }
            }

            cancelSelectedTag.splice(index, 1)

            dispatch({
                type: 'user/saveSelectedTag',
                selectedTag: cancelSelectedTag,
            })
        }
    }

    handleChangeHobby = () => {
        const {
            user: {
                selectedTag,
                memberInfo: {
                    tags,
                },
            },
            dispatch,
        } = this.props

        const defaultTag = []
        for (const tag of tags) {
            defaultTag.push(tag.value)
        }

        const selectedTagSet = new Set(selectedTag)
        const defaultTagSet = new Set(defaultTag)
        // 交集
        const intersectionSet = new Set([...selectedTagSet].filter(x => defaultTagSet.has(x)))
        // 差集 新增的数据
        const differenceABSet = new Set([...selectedTagSet].filter(x => !defaultTagSet.has(x)))

        // 减少的数据
        const reduceTagSet = new Set([...defaultTagSet].filter(x => !intersectionSet.has(x)))

        const addTagSet = Array.from(differenceABSet)
        const reduceTag = Array.from(reduceTagSet)

        dispatch({
            type: 'user/fetchMenberUpdateInfo',
            payload: {
                delete_tags: reduceTag,
                add_tags: addTagSet,
            },
        })
    }

    render() {
        const {
            common: {
                dataTaste,
            },
            user: {
                selectedTag,
            },
        } = this.props

        return (
            <div className={styles.container}>
                <DocumentTitle title='选择口味' />
                <div className={styles.taste}>
                    {
                        dataTaste.map(({ label, value }, index) => {
                            let checked = false

                            for (const tag of selectedTag) {
                                if (value === tag) {
                                    checked = true
                                }
                            }

                            return (
                                <Button
                                    inline
                                    key={index}
                                    size='small'
                                    type={checked ? 'primary' : ''}
                                    className={styles.tags}
                                >
                                    {label}
                                    <Checkbox
                                        defaultChecked={checked}
                                        className={styles.checkbox}
                                        onChange={(e) => { this.handleCheckBox(e, value) }}
                                    />
                                </Button>
                            )
                        })
                    }
                    <p>此项为多选项</p>
                </div>
                <Button
                    type='primary'
                    className={styles.confirm}
                    onClick={this.handleChangeHobby}
                >
                    确定
                </Button>
            </div>
        )
    }
}

export default connect((state) => {
    return state
})(UserDataTaste)
