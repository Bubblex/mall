import React from 'react'
import { connect } from 'dva'
import { createForm } from 'rc-form'

import {
    Flex,
    Button,
    Toast,
} from 'antd-mobile'

import styles from './search.less'
import commonStyles from '../../app.less'

const FlexItem = Flex.Item
class Search extends React.Component {
    handleSearch = () => {
        const {
            form,
            dispatch,
            onClick,
        } = this.props

        const keyword = form.getFieldsValue().keyword

        if (!keyword) {
            Toast.fail('未输入关键字', 1)
            return
        }

        onClick()

        dispatch({
            type: 'products/saveSearchGoodKeyword',
            keyword,
        })

        dispatch({
            type: 'products/fetchGoodsList',
            payload: {
                keyword,
            },
        })
    }

    render() {
        const {
            form: {
                getFieldProps,
            },
        } = this.props

        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <Flex>
                        <FlexItem>
                            <input
                                className={styles.input}
                                placeholder='请输入您想搜的食材或菜谱'
                                {
                                    ...getFieldProps('keyword')
                                }
                            />
                        </FlexItem>
                        <FlexItem className={commonStyles.flexAutoWidth}>
                            <Button
                                size='small'
                                type='primary'
                                onClick={this.handleSearch}
                            >
                                搜索
                            </Button>
                        </FlexItem>
                    </Flex>
                </div>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(Search))
