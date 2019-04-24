import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Popconfirm } from 'antd'

import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'

import {
  powerAllList, powerAdd, powerDelete
} from '../../../redux/actions/powerOperationAction'

import {
  setPrivilegeGroupList
} from '../../../redux/actions/privilegeGroupManagementAction'

class PowerOperation extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      userList: [],
      powerGroup: []
    }
    // 初始化搜索条件
    this.pageIndex = { powerName: '' }

    // 添加项
    this.WrapperFromList = [
      {
        type: 'input',
        name: 'powerCode',
        label: '权限编码',
        required: true,
        massage: '权限编码必须填写',
        initialValue: ''
      },
      {
        type: 'input',
        name: 'powerName',
        label: '权限名称',
        required: true,
        massage: '权限名称必须填写',
        initialValue: ''
      },
      {
        type: 'input',
        name: 'url',
        label: '权限地址',
        required: true,
        massage: '权限地址必须填写',
        initialValue: []
      },
      {
        type: 'selectSearch',
        name: 'powerTypeGroupCode',
        label: '权限分组',
        required: true,
        massage: '权限分组必须选择',
        initialValue: []
      }
    ]

    // 导出按钮
    this.tableTopButtons = [
      { label: '批量导出' }
    ]

    // 搜索项展示
    this.formConfig = [
      { value: 'powerName', placeholder: '权限名称', width: 200 }
    ]

    this.tableColumns = [
      { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '权限名称', dataIndex: 'powerName', key: 'powerName' },
      { title: '权限编码', dataIndex: 'powerCode', key: 'powerCode' },
      { title: '权限组名称', dataIndex: 'powerTypeGroupCode', key: 'powerTypeGroupCode' },
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

    this.powerGroupList = []
    this.power = []

    this.AddFromListValue = this.AddFromListValue.bind(this)
    this.ReturnValue = this.ReturnValue.bind(this)
  }

  // 初始化数据
  componentDidMount () {
    const { powerAllList, setPrivilegeGroupList } = this.props
    // 请求权限列表
    powerAllList(this.pageIndex)
    // 请求权限组列表
    setPrivilegeGroupList({ powerTypeGroupName: '' })
  }

  /*
    * componentWillReceiveProps(nextProps) 组件初始化时不调用，组件接受新的props时调用。
    * param Object nextProps 接受新的props
  */
  // componentwillreceiveprops (nextProps) {
  shouldComponentUpdate (nextProps) {
    nextProps.privilegeGroup.map((item, index) => {
      this.powerGroupList[index] = { departCode: item.powerTypeGroupCode, departName: item.powerTypeGroupName }
    })
    return true
  }

  ReturnValue () {
    const { powerAllList } = this.props
    powerAllList(this.pageIndex)
  }

  handleDelete (data) {
    const { powerDelete } = this.props
    powerDelete(data, this.ReturnValue)
  }

  AddFromListValue (ee, index) {
    const { powerAdd } = this.props
    ee.tag = ''
    powerAdd(ee, this.ReturnValue)
  }
  getSearchList (pageIndex, searchValues) {
    let params = {}
    params.powerName = searchValues.powerName

    // 修改初始化值
    this.pageIndex.powerName = searchValues.powerName

    this.props.powerAllList(params)
  }

  render () {
    const { powerList, totalPage } = this.props
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          AddFromListValue = {this.AddFromListValue}
          // WrapperFromListDepart = {this.state.powerGroup}
          WrapperFromListDepart = {this.powerGroupList}
          WrapperFromList = {this.WrapperFromList}
          doSearch = {(values) => { this.getSearchList(0, values) }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          dataSource={powerList}
          columns={this.tableColumns}
          totalPage= {totalPage}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    powerList: state.default.powerOperationReducer.get('powerList'),
    totalPage: state.default.powerOperationReducer.get('totalPage'),
    privilegeGroup: state.default.privilegeGroupManagementReducer.get('privilegeGroup')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ powerAllList, powerAdd, powerDelete, setPrivilegeGroupList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PowerOperation)
