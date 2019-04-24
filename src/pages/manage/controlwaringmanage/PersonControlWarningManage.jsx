import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPersonList, setPersonTagStatus, setPersonWarningStatus
} from '../../../redux/actions/personControlWarningManageAction'
import { Popover, message } from 'antd'
import IotTable from '../component/table/IotTable'

import { PAGE_SIZE } from '../../../redux/actions/constant.js'

class PersonControlWarningManage extends PureComponent {
  constructor (props) {
    super(props)
    this.pageIndex = 0
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '身份证号', dataIndex: 'idNumber', key: 'idNumber' },
      { title: '居住地', dataIndex: 'homeAddress', key: 'homeAddress' },
      { title: '民族', dataIndex: 'nation', key: 'nation' },
      { title: '性别', dataIndex: 'sex', key: 'sex' },
      {
        title: '图片',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (data) =>
          <Popover title="图片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      {
        title: '操作',
        dataIndex: 'control',
        key: 'control',
        render: (text, record) => (
          <span>
            {
              props.location && props.location.state && props.location.state.category === '0'
                ? <a href="javascript:" onClick={() => { this.personControl(record) }}>{record.tagStatus === 'TAGGED' ? '撤销布控' : '布控'}</a>
                : null
            }
            {
              props.location && props.location.state && props.location.state.category === '1'
                ? <a href="javascript:" onClick={() => { this.personWarning(record) } }>{record.alertStatus === 'ALERTING' ? '忽略预警' : ''}</a>
                : null
            }
          </span>
        )
      }
    ]
  }

  componentDidMount () {
    this.getDataList(this.pageIndex)
  }

  /**
   * 人员布控取消布控
   * @param data
   */
  personControl (data) {
    const { setPersonTagStatus } = this.props
    const params = {
      identification: data.idNumber,
      targetStatus: data.tagStatus === 'TAGGED' ? 'UNTAGGED' : 'TAGGED'
    }
    const tipMessage = data.tagStatus === 'TAGGED' ? '撤销布控' : '布控'
    setPersonTagStatus(params, () => {
      message.success(`${tipMessage}成功`)
      this.getDataList(this.pageIndex)
    }, (errorMessage) => { message.error(`${tipMessage}失败，${errorMessage}`) })
  }

  /**
   * 人员取消预警
   * @param data
   */
  personWarning (data) {
    const { setPersonWarningStatus } = this.props
    const params = {
      identification: data.idNumber,
      targetStatus: 'IGNORED'
    }
    setPersonWarningStatus(params, () => {
      message.success('忽略预警成功')
      this.getDataList(this.pageIndex)
    }, (errorMessage) => { message.error(`忽略预警失败，${errorMessage}`) })
  }

  /**
   * 获取数据列表
   * @param pageIndex
   */
  getDataList (pageIndex) {
    const { location, getPersonList } = this.props
    this.pageIndex = pageIndex
    let category = ''
    if (location && location.state) {
      category = location.state.category
    }
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE,
      category
    }
    getPersonList(params)
  }

  render () {
    const { personControlWarningManageList, totalPage } = this.props
    return (
      <div>
        <IotTable
          columns={this.tableColumns}
          dataSource={personControlWarningManageList}
          totalPage={totalPage}
          onChange={(pagination) => { this.getDataList(pagination.current - 1) }}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    personControlWarningManageList: state.default.personControlWarningManageReducer.get('personControlWarningManageList'),
    totalPage: state.default.personControlWarningManageReducer.get('totalPage')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPersonList, setPersonTagStatus, setPersonWarningStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonControlWarningManage)
