import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { Popover, Input, Button, Form, Radio, Popconfirm } from 'antd'
import { Popconfirm } from 'antd'

import SearchForm from '../component/levelserach/SearchForm'
import IotTable from '../component/table/IotTable'
// import AddFormWrapper from '../component/addfrom/AddFormWrapper'

import { roleAllList, roleAdd, roleDelete } from '../../../redux/actions/roleOperationAction'

class RoleOperation extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      roleGroup: [
        { departCode: 'SZFW', departName: '市政法委' },
        { departCode: 'QXZFW', departName: '区县政法委' },
        { departCode: 'JD', departName: '街道' },
        { departCode: 'SQ', departName: '社区' }
      ]
    }
    // 初始化搜索条件
    this.pageIndex = { roleName: '' }

    // 添加项
    this.WrapperFromList = [
      { type: 'input', name: 'roleName', label: '角色名称', required: true, massage: '角色名称必须填写', initialValue: '' },
      { type: 'selectSearch', name: 'userTypeCode', label: '用户类型', required: true, massage: '用户类型必须选择', initialValue: [] }
    ]

    // 导出按钮
    this.tableTopButtons = [
      { label: '批量导出' }
    ]

    // 搜索项展示
    this.formConfig = [
      { value: 'roleName', placeholder: '角色名称', width: 200 }
    ]

    this.tableColumns = [
      { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
      { title: '角色编码', dataIndex: 'roleID', key: 'roleID' },
      { title: '用户类型名称', dataIndex: 'userTypeName', key: 'userTypeName' },
      { title: '用户类型编码', dataIndex: 'userTypeCode', key: 'userTypeCode' },
      {
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => (
          <span>
            <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          </span>
        )
      }
    ]

    this.AddFromListValue = this.AddFromListValue.bind(this)
    this.ReturnValue = this.ReturnValue.bind(this)
  }

  // 初始化数据
  componentDidMount () {
    const { roleAllList } = this.props
    // 请求权限列表
    roleAllList(this.pageIndex)
  }

  /*
    * componentWillReceiveProps(nextProps) 组件初始化时不调用，组件接受新的props时调用。
    * param Object nextProps 接受新的props
    * 备用 : 后期请求用户类型
  */
  // componentWillReceiveProps (nextProps) {
  // let newPowerGroup = [...this.state.powerGroup];
  // nextProps.privilegeGroup.map((item) =>{
  // newPowerGroup = [...newPowerGroup,{departCode:item.powerTypeGroupCode,departName:item.powerTypeGroupName}];
  // })
  // this.setState({
  // powerGroup : newPowerGroup
  // })
  // }

  // 请求回调
  ReturnValue () {
    const { roleAllList } = this.props
    roleAllList(this.pageIndex)
  }

  /*
    * 表单提交返回数据
    * param string ee 添加用户填写信息
  */
  AddFromListValue (ee, index) {
    const { roleAdd } = this.props
    // console.log(ee)
    roleAdd(ee, this.ReturnValue)
  }

  /*
    * 权限删除方法
    * params Object data 当前权限信息
  */
  handleDelete (data) {
    // console.log(data)
    const { roleDelete } = this.props
    roleDelete(data, this.ReturnValue)
  }

  /*
    * 搜索条件
    * param Object searchValues 搜索项对象
  */
  getSearchList (pageIndex, searchValues) {
    let params = {}
    params.roleName = searchValues.roleName

    // 修改初始化值
    this.pageIndex.roleName = searchValues.roleName

    this.props.roleAllList(params)
  }

  render () {
    const { roleList, totalPage } = this.props
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          AddFromListValue={this.AddFromListValue}
          WrapperFromListDepart={this.state.roleGroup}
          WrapperFromList={this.WrapperFromList}
          doSearch={(values) => { this.getSearchList(0, values) }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          dataSource={roleList}
          columns={this.tableColumns}
          totalPage={totalPage}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    roleList: state.default.roleOperationReducer.get('roleList'),
    totalPage: state.default.roleOperationReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ roleAllList, roleAdd, roleDelete }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleOperation)
