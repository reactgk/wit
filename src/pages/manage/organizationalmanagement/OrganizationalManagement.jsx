import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SearchForm from '../component/levelserach/SearchForm'
import IotTable from '../component/table/IotTable'

import {
  departMentInfoList, departMentAdd, departDelete
} from '../../../redux/actions/organizationalManagementAction'

class OrganizationalManagement extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }

    this.WrapperFromList = [
      {
        type: 'input',
        name: 'departName',
        label: '机构名称',
        required: true,
        massage: '机构名称必须填写',
        initialValue: ''
      },
      {
        type: 'input',
        name: 'departCode',
        label: '机构编码',
        required: true,
        massage: '机构编码必须填写',
        initialValue: ''
      },
      {
        type: 'selectSearch',
        name: 'departPCode',
        label: '上级机构',
        required: true,
        massage: '上级机构必须选择',
        initialValue: []
      }
    ]

    this.pageIndex = { departCode: '', departName: '' }
    this.searchValues = {}
    this.tableTopButtons = [
      { label: '批量导出' }
    ]
    this.formConfig = [
      // { value: 'name', placeholder: '机构层级', width: 200 },
      { value: 'DepartCode', placeholder: '机构编码', width: 200 },
      { value: 'DepartName', placeholder: '机构名称', width: 200 }
    ]
    this.tableTopButtons = [
      { label: '批量导出' }
    ]
    this.tableColumns = [
      { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '机构名称', dataIndex: 'departName', key: 'departName' },
      { title: '机构编码', dataIndex: 'departCode', key: 'departCode' },
      { title: '机构层级', dataIndex: 'departLevelName', key: 'departLevelName' },
      {
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => (
          <span>
            <a
              style={{ margin: '0 10px' }}
              onClick={() => { this.onDepartDelete(record) }} href="javascript:">
              删除
            </a>
          </span>
        )
      }
    ]

    this.AddFromListValue = this.AddFromListValue.bind(this)
    this.ReturnValue = this.ReturnValue.bind(this)
  }

  // 组织机构删除
  onDepartDelete (data) {
    const { departDelete } = this.props
    departDelete(data, this.ReturnValue)
  }

  // 初始化
  componentDidMount () {
    this.props.departMentInfoList(this.pageIndex)
  }
  AddFromListValue (ee) {
    const { departMentAdd } = this.props
    departMentAdd(ee, this.ReturnValue)
  }

  getSearchList (pageIndex, searchValues) {
    let params = {}
    params.departCode = searchValues.DepartCode
    params.departName = searchValues.DepartName

    // 修改初始化值
    this.pageIndex.departCode = searchValues.DepartCode
    this.pageIndex.departName = searchValues.DepartName

    this.props.departMentInfoList(params)
  }

  // 请求
  ReturnValue () {
    const { departMentInfoList } = this.props
    departMentInfoList(this.pageIndex)
  }

  render () {
    const { departList, totalPage } = this.props
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          AddFromListValue={this.AddFromListValue}
          WrapperFromListDepart={departList}
          WrapperFromList={this.WrapperFromList}
          doSearch={(values) => {
            this.getSearchList(0, values)
          }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          dataSource={departList}
          columns={this.tableColumns}
          totalPage={totalPage}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    departList: state.default.organizationalManagementReducer.get('departList'),
    totalPage: state.default.organizationalManagementReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ departMentInfoList, departMentAdd, departDelete }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationalManagement)
