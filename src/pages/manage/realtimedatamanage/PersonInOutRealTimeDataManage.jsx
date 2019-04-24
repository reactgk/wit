import React, { Fragment, PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import IotTable from '../component/table/IotTable'
import { Popover } from 'antd'
import { modeOfPassageOptions } from '../../../data/selectOptions.js'

import { getPersonList } from '../../../redux/actions/personInOutRealTimeDataAction.js'

class PersonInOutRealTimeDataManage extends PureComponent {
  constructor (props) {
    super(props)
    this.tableColumns = [
      { title: '序号', dataIndex: 'serialNumber', key: 'serialNumber' },
      {
        title: '姓名', dataIndex: 'name', key: 'name',
        render: (data, itemData) =>
          <Popover title="人员信息" content={ this.renderOwnerInfo(itemData.person || {}) } trigger="hover">
            <a>{data}</a>
          </Popover>
      },
      { title: '身份证号', dataIndex: 'idNumber', key: 'idNumber' },
      { title: '通行时间', dataIndex: 'detectTime', key: 'detectTime' },
      {
        title: '通行方式', dataIndex: 'detectType', key: 'detectType',
        render: value => {
          let mode = modeOfPassageOptions.find((item) => item.value === value) || {}
          return <span>{mode.label}</span>
        }
      },
      {
        title: '人证对比', dataIndex: 'detectResult', key: 'detectResult',
        render: value => value === '1' ? '通过' : '不通过'
      },
      {
        title: '出入类型', dataIndex: 'devImport', key: 'devImport',
        render: value => value === '1' ? '进' : value === '2' ? '出' : '--' },
      { title: '通行场所', dataIndex: 'placeName', key: 'placeName' },
      { title: '通行点位', dataIndex: 'pointName', key: 'pointName' },
      { title: '设备类型', dataIndex: 'devType', key: 'devType' },
      { title: '设备名称', dataIndex: 'devName', key: 'devName' },
      {
        title: '图片', dataIndex: 'imageFace', key: 'imageFace',
        render: (data) =>
          <Popover title="图片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      }
    ]
  }

  componentDidMount () {
    this.getDataList()
  }

  renderOwnerInfo (person) {
    return (
      <Fragment>
        <p>姓名：{person.name}</p>
        <p>联系方式1：{person.telePhonr}</p>
        <p>联系方式2：{person.telePhonr2 || '--'}</p>
        <p>身份证号：{person.idNumber}</p>
        <p>现居住地：{person.homeAddress}</p>
        <p>居住类型：{person.bloodType}</p>
      </Fragment>
    )
  }

  /**
   * 获取数据列表
   */
  getDataList () {
    const { getPersonList } = this.props
    const requestEndCallback = () => {
      this.timer = setTimeout(() => {
        if (!this.isDestory) {
          this.getDataList()
        }
      }, 3000)
    }
    getPersonList(requestEndCallback)
  }

  componentWillUnmount () {
    this.isDestory = true
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render () {
    const { personList } = this.props
    return (
      <div>
        <IotTable
          isShowPagination={false}
          columns={this.tableColumns}
          dataSource={personList}/>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    personList: state.default.personInOutRealTimeDataReducer.get('personList')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPersonList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonInOutRealTimeDataManage)
