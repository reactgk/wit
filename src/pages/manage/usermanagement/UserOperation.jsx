import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Popconfirm } from 'antd'

import SearchForm from '../component/levelserach/SearchForm'
import IotTable from '../component/table/IotTable'
// import AddFormWrapper from '../component/addfrom/AddFormWrapper'

import {
  userInfoList, userDelete, userInfoAdd
} from '../../../redux/actions/userOperationAction'

// 添加样式
import './UserOperation.less'
// 加载表单
// const CollectionCreateForm = Form.create()(AddFormWrapper)

class UserOperation extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    // 初始化搜索条件
    // this.pageIndex = {departCode:'',departName:''} // 初始化组织机构
    this.userPageIndex = { loginName: '', userName: '', scope: '' } // 初始化用户列表

    // 添加项
    this.WrapperFromList = [
      {
        type: 'input',
        name: 'loginName',
        label: '用户名',
        required: true,
        massage: '用户名必须填写',
        initialValue: ''
      },
      {
        type: 'input',
        name: 'loginPWD',
        label: '密码',
        required: true,
        massage: '密码必须填写',
        initialValue: ''
      },
      {
        type: 'input',
        name: 'userName',
        label: '姓名',
        required: true,
        massage: '姓名必须填写',
        initialValue: []
      },
      {
        type: 'input',
        name: 'scope',
        label: '所属单位编码',
        required: true,
        massage: '所属单位编码必须填写',
        initialValue: ''
      },
      {
        type: 'radio',
        name: 'sex',
        label: '性别',
        required: true,
        massage: '性别必选',
        initialValue: [{ value: 0, label: '女' }, { value: 1, label: '男' }]
      },
      {
        type: 'input',
        name: 'telephone',
        label: '电话',
        required: false,
        massage: '填写电话',
        initialValue: ''
      }
    ]

    // 导出按钮
    this.tableTopButtons = [
      { label: '批量导出' }
    ]
    // 搜索项展示
    this.formConfig = [
      { value: 'loginName', placeholder: '用户名', width: 200 },
      { value: 'userName', placeholder: '姓名', width: 200 },
      { value: 'scope', placeholder: '所属单位', width: 200 }
      // { value: 'departLevelName', placeholder: '查询范围', width: 200, type: 'select', options: [{'value':'-1','label':'省'},{'value':'1','label':'市'},{'value':'2','label':'区县'},{'value':'3','label':'街道'},{'value':'>3','label':'社区'}] }
    ]
    // 展示列表表头
    this.tableColumns = [
      { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '用户名', dataIndex: 'loginName', key: 'loginName' },
      { title: '姓名', dataIndex: 'userName', key: 'userName' },
      { title: '用户类型', dataIndex: 'userTypeName', key: 'userTypeName' },
      { title: '用户角色', dataIndex: 'roleName', key: 'roleName' },
      { title: '所属单位', dataIndex: 'unit', key: 'unit' },
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
  AddFromListValue (ee) {
    const { userInfoAdd } = this.props
    // 暂未出现在填写表格中 默认为空
    ee.email = ''
    ee.userTypeCode = ''
    ee.roleCode = ''
    ee.address = ''
    ee.headPhoto = ''
    ee.tag = ''
    ee.firststatus = ''
    ee.extendScope = ''
    // 执行添加 回调列表
    userInfoAdd(ee, this.ReturnValue)
  }

  getSearchList (userPageIndex, searchValues) {
    let params = {}
    params.loginName = searchValues.loginName
    params.userName = searchValues.userName
    params.scope = searchValues.scope

    // 修改初始化值
    this.userPageIndex.loginName = searchValues.loginName
    this.userPageIndex.userName = searchValues.userName
    this.userPageIndex.scope = searchValues.scope

    this.props.userInfoList(params)
  }

  // 用户删除删除
  handleDelete (data) {
    const { userDelete } = this.props

    userDelete(data, this.ReturnValue)
  }

  // 初始化加载
  componentDidMount () {
    this.props.userInfoList(this.userPageIndex)
  }

  // 请求
  ReturnValue () {
    const { userInfoList } = this.props
    userInfoList(this.userPageIndex)
  }
  // 渲染页面
  render () {
    const { userList, totalPage } = this.props
    console.log(userList)
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          AddFromListValue={this.AddFromListValue}
          WrapperFromListDepart={userList}
          WrapperFromList={this.WrapperFromList}
          doSearch={(values) => {
            this.getSearchList(0, values)
          }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          dataSource={userList}
          columns={this.tableColumns}
          totalPage={totalPage}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    userList: state.default.userOperationReducer.get('userList'),
    totalPage: state.default.userOperationReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ userInfoList, userDelete, userInfoAdd }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOperation)
