import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import AddFrom from '../component/addfrom/AddFrom'
import AddFromList from '../component/addfrom/AddFromList'

import {
  setPrivilegeGroupList, privilegeGroupAdd, privilegeGroupDelete
} from '../../../redux/actions/privilegeGroupManagementAction'

class PrivilegeGroupManagement extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      list: [],
      WrapperFromList: [
        {
          type: 'input',
          name: 'powerTypeGroupName',
          label: '权限组名称',
          required: true,
          massage: '权限组名称必须填写',
          initialValue: ''
        }
      ]
    }

    // 默认搜索条件
    this.pageIndex = { powerTypeGroupName: '' }
    this.AddFromListValue = this.AddFromListValue.bind(this)
    this.powerTypeGroupDelete = this.powerTypeGroupDelete.bind(this)
    this.ReturnValue = this.ReturnValue.bind(this)
  }

  /*
        * 添加操作
    */
  AddFromListValue (ee) {
    const { privilegeGroupAdd } = this.props

    const params = {}

    params.powerTypeGroupName = ee.powerTypeGroupName

    privilegeGroupAdd(params, this.ReturnValue)
  }

  /*
        * 初始化操作
    */
  componentDidMount () {
    const { setPrivilegeGroupList } = this.props
    setPrivilegeGroupList(this.pageIndex)
  }

  ReturnValue () {
    const { setPrivilegeGroupList } = this.props
    setPrivilegeGroupList(this.pageIndex)
  }

  /*
        * 删除操作
    */
  powerTypeGroupDelete (ee) {
    const { privilegeGroupDelete } = this.props
    privilegeGroupDelete(ee, this.ReturnValue)
  }

  render () {
    const { privilegeGroup } = this.props
    return (
      <div>
        {/* <AddFrom
          ButtonName="添加新权限组"
          AddFromListValue={this.AddFromListValue}
          AddWrapperFromList={this.state.WrapperFromList}
        /> */}

        <AddFromList
          list={privilegeGroup}
          handleDelete={this.powerTypeGroupDelete}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    privilegeGroup: state.default.privilegeGroupManagementReducer.get('privilegeGroup')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ setPrivilegeGroupList, privilegeGroupAdd, privilegeGroupDelete }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivilegeGroupManagement)
