import React from 'react'
import { connect } from 'dva'
import { createForm } from 'rc-form'

import {
    List,
    Toast,
    Button,
    Switch,
    Picker,
    InputItem,
} from 'antd-mobile'
import styles from './user-address-add/user-address-add.less'
import { getInputItemError } from '../utils/library'

const LietItem = List.Item

class UserAddressAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            regionIndex: '',
            viliageIndex: '',
            pointIndex: '',
            region_id: '',
            village_id: '',
            point_id: '',
        }
    }

    componentWillUnmount() {
        const {
            dispatch,
        } = this.props

        dispatch({
            type: 'user/removeAddressDetail',
        })
    }

    selectRegion = (val) => {
        const {
            dispatch,
            common: {
                dataRegion,
            },
        } = this.props

        const arr = []
        for (const { value } of dataRegion) {
            arr.push(value)
        }

        this.setState({
            regionIndex: arr.indexOf(val[0]),
            region_id: val[0],
        })

        dispatch({
            type: 'common/fetchDataViliage',
            payload: {
                region_id: val[0],
            },
        })
    }

    selectViliage = (val) => {
        const {
            dispatch,
            common: {
                dataViliage,
            },
        } = this.props

        const arr = []
        for (const { value } of dataViliage) {
            arr.push(value)
        }

        if (dataViliage[0].value === -1) {
            return
        }

        this.setState({
            viliageIndex: arr.indexOf(val[0]),
            village_id: val[0],
        })

        dispatch({
            type: 'common/fetchDataPoint',
            payload: {
                village_id: val[0],
            },
        })
    }

    selectPoint = (val) => {
        const {
            common: {
                dataPoint,
            },
        } = this.props

        if (dataPoint[0].value === -1) {
            return
        }

        const arr = []
        for (const { value } of dataPoint) {
            arr.push(value)
        }

        this.setState({
            pointIndex: arr.indexOf(val[0]),
            point_id: val[0],
        })
    }

    submitAddressInfo = () => {
        const {
            props: {
                form,
                dispatch,
                user: {
                    addressDetail: {
                        region,
                        village,
                        point,
                        id,
                    },
                },
                location: {
                    query,
                },
            },
            state: {
                region_id: regionId,
                village_id: villageId,
                point_id: pointId,
            },
        } = this

        const {
            title,
            phone,
            address,
            is_default: Default,
        } = form.getFieldsValue()

        const isDefault = !Default ? 2 : 1

        const payload = {
            title,
            phone,
            region_id: !regionId ? region.id : regionId,
            village_id: !villageId ? village.id : villageId,
            point_id: !pointId ? point.id : pointId,
            address,
            is_default: isDefault,
        }

        if (!title) {
            Toast.fail('请输入您的姓名', 1)
            return
        }
        else if (!phone) {
            Toast.fail('请输入您的手机号码', 1)
            return
        }
        else if (!payload.region_id) {
            Toast.fail('请选择区/县', 1)
            return
        }
        else if (!payload.village_id) {
            Toast.fail('请选择小区', 1)
            return
        }
        else if (!payload.point_id) {
            Toast.fail('请选择取菜点', 1)
            return
        }

        if (query.id) {
            dispatch({
                type: 'user/fetchAddressModify',
                payload: {
                    ...payload,
                    id,
                },
            })
        } else {
            dispatch({
                type: 'user/fetchAddressAdd',
                payload: {
                    ...payload,
                },
                state: this.props.location.state,
            })
        }
    }

    render() {
        const {
            form: {
                getFieldProps,
                getFieldError,
            },
            common: {
                dataRegion,
                dataViliage,
                dataPoint,
            },
            location: {
                query,
            },
            user: {
                addressDetail: defaultAddress,
            },
        } = this.props

        const {
            pointIndex,
            regionIndex,
            viliageIndex,
        } = this.state

        return (
            <div className={styles.container}>
                <List className={styles.list}>
                    <InputItem
                        clear
                        placeholder='请填写您的姓名'
                        {...getFieldProps('title', {
                            initialValue: query.id ? defaultAddress.title : '',
                            rules: [
                                {
                                    max: 16,
                                    message: '长度不能超过16个字符',
                                },
                                {
                                    required: true,
                                    message: '请填写您的姓名',
                                },
                            ],
                        })}
                        {...getInputItemError(getFieldError('title'))}
                    >
                        姓名
                    </InputItem>
                    <InputItem
                        clear
                        placeholder='请填写您的手机号码'
                        {...getFieldProps('phone', {
                            initialValue: query.id ? defaultAddress.phone : '',
                            rules: [
                                {
                                    required: true,
                                    message: '请填写您的手机号码',
                                },
                                {
                                    pattern: /^1[0-9]{10}$/,
                                    message: '手机格式不正确',
                                },
                            ],
                        })}
                        {...getInputItemError(getFieldError('phone'))}
                    >
                        手机号码
                    </InputItem>
                </List>
                <List className={styles.list}>
                    <Picker
                        cols={1}
                        data={dataRegion}
                        extra={regionIndex === '' ? query.id ? defaultAddress.region.title : '请选择区/县' : dataRegion[regionIndex].label}
                        onChange={this.selectRegion}
                    >
                        <LietItem arrow='horizontal'>
                            区/县
                        </LietItem>
                    </Picker>
                    <Picker
                        cols={1}
                        data={dataViliage}
                        extra={viliageIndex === '' ? query.id ? defaultAddress.village.title : '请选择小区' : dataViliage[viliageIndex].label}
                        onChange={this.selectViliage}
                    >
                        <LietItem arrow='horizontal'>
                            小区
                        </LietItem>
                    </Picker>
                    <InputItem
                        clear
                        placeholder='请填写楼层、门牌号'
                        {...getFieldProps('address', {
                            initialValue: defaultAddress.member.address,
                        })}
                    >
                        <p>请输入详细地址<span>（选填）</span></p>
                    </InputItem>
                    <Picker
                        cols={1}
                        data={dataPoint}
                        onChange={this.selectPoint}
                        extra={pointIndex === '' ? query.id ? defaultAddress.point.title : '请选择取菜点' : dataPoint[pointIndex].label}
                    >
                        <LietItem arrow='horizontal'>
                            选择取菜点
                        </LietItem>
                    </Picker>
                </List>
                <List className={styles.list}>
                    <LietItem
                        extra={<Switch
                            {...getFieldProps('is_default', {
                                initialValue: defaultAddress.is_default === 1 ? 'checked' : '',
                                valuePropName: 'checked',
                            })}
                        />}
                    >
                        是否设为默认地址
                    </LietItem>
                </List>
                <Button
                    className={styles.saveBtn}
                    onClick={this.submitAddressInfo}
                >保存</Button>
            </div>
        )
    }
}

export default createForm()(connect((state) => {
    return state
})(UserAddressAdd))
