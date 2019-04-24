import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import { Popover } from 'antd'
import { inOrOutOptions } from '../../../data/selectOptions.js'

class NonMotorInOutManage extends PureComponent {
  constructor (props) {
    super(props)
    this.formConfig = [
      { value: 'name', placeholder: '请输入标签编号', width: 145 },
      { value: 'carOwner', placeholder: '请输入户主', width: 100 },
      { value: 'carType', placeholder: '请选择通行场所', width: 145, type: 'select', options: [], defaultValue: 'all' },
      { value: 'carIdColor', placeholder: '请选择车辆类型', width: 145, type: 'select', options: [], defaultValue: 'all' },
      { value: 'inOrOut', placeholder: '请选择出入类型', width: 140, type: 'select', options: inOrOutOptions, defaultValue: 'all' },
      { value: 'lastTime', type: 'rangeDate', placeholder1: '通行开始时间', placeholder2: '通行结束时间' }
    ]
    this.tableTopButtons = [
      { label: '批量导出' }
    ]
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '标签编号', dataIndex: 'name' },
      { title: '通行时间', dataIndex: 'name' },
      { title: '车辆类型', dataIndex: 'name' },
      { title: '出入类型', dataIndex: 'name' },
      { title: '通行场所', dataIndex: 'name' },
      { title: '通行点位', dataIndex: 'name' },
      { title: '设备名称', dataIndex: 'name' },
      {
        title: '全车照片', dataIndex: 'name',
        render: (data) =>
          <Popover title="全车照片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      { title: '车主', dataIndex: 'name' }
    ]
  }

  componentDidMount () {
  }

  render () {
    const { isRequestPlaceTypesEnd, placeTypes, nonMotorInOutManageList, nonMotorTotalPage } = this.props
    if (!isRequestPlaceTypesEnd) {
      return null
    }
    this.formConfig[2].options = placeTypes
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { console.log(values) }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={nonMotorInOutManageList}
          totalPage={nonMotorTotalPage}
          onChange={() => {}}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    isRequestPlaceTypesEnd: state.default.manageReducer.get('isRequestPlaceTypesEnd'),
    placeTypes: state.default.manageReducer.get('placeTypes'),
    nonMotorInOutManageList: state.default.carInOutManageReducer.get('nonMotorInOutManageList'),
    nonMotorTotalPage: state.default.carInOutManageReducer.get('nonMotorTotalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NonMotorInOutManage)
