import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
// import { getPopulationFloating } from '../../../redux/actions/manageAction.js'
import { warningLevelOptions, warningStateOptions } from '../../../data/selectOptions.js'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import httpClient from '../../../network/httpClient'
import {
  earlyControlList
} from '../../../redux/actions/livePlaceAction.js'
import { Popover } from 'antd'
class topicManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.searchValues = {}
    this.formConfig = [
      { value: 'placeID', width: 200, placeholder: '查询场所', type: 'select', options: [] },
      { value: 'nationCode', placeholder: '预警点位', type: 'select', options: [] },
      { value: 'provinceCode', width: 145, placeholder: '预警设备', type: 'select', options: [] },
      { value: 'state', placeholder: '预警状态', type: 'select', options: warningStateOptions },
      { value: 'warnLevel', placeholder: '预警级别', type: 'select', options: warningLevelOptions },
      { value: 'rangdate', width: 340, type: 'rangeDate', placeholder1: '时间跨度开始时间', placeholder2: '时间跨度结束时间' }
    ]
    this.tableColumns = [
      { title: '预警场所', dataIndex: 'placeName', key: 'placeName' },
      { title: '预警点位', dataIndex: 'pointName', key: 'pointName' },
      { title: '预警设备', dataIndex: 'deviceName', key: 'deviceName' },
      { title: '预警时间', dataIndex: 'doTime', key: 'doTime' },
      { title: '预警级别', dataIndex: 'warnLevel', key: 'warnLevel' },
      { title: '预警类型', dataIndex: 'warnMethods', key: 'warnMethods' },
      { title: '现场图', dataIndex: 'warnMethods', key: 'warnMethods' },
      {
        title: '车牌照片', dataIndex: 'img', key: 'img',
        render: (data) =>
          <Popover title="车牌照片" content={<img src={data}/>} trigger="hover">
            <img style={{ height: 40 }} src={data}/>
          </Popover>
      },
      // { title: '点位数',
      //   dataIndex: 'pointCount',
      //   key: 'pointCount',
      //   render: (text, record) =>
      //     <p>
      //       <a onClick={() => { this.getPoint(text, record) } }>{text}</a>
      //     </p>
      // },
      { title: '预警方式', dataIndex: 'type', key: 'type' },
      { title: '当前状态', dataIndex: 'state', key: 'state' },
      { title: '操作', dataIndex: 'netflow', key: 'netflow',
        render: (text, record) => (
          <p>{
            record.state === '预警中' ? <a onClick={() => { this.changeState(text, record) } }>解除</a> : ''
          }
          </p>
        )
      }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
  }
  changeState (text, record) {
    var states = ''
    if (record.state === '预警中') {
      states = 2
    } else if (record.state === '已处理') {
      states = 1
    } else if (record.state === '已解除') {
      states = 2
    }
    httpClient.post('meta/alert/save', { id: record.id, state: states })
      .then(result => {
        console.log(result.data)
        // message.success('更改成功', 4)
        let param = {
          pageIndex: 0,
          pageSize: PAGE_SIZE
        }
        this.props.queryControlLisat(param)
        this.getDataList(0)
        setTimeout(this.props.earlyControlList(param), 500)
      })
      .catch(error => {
        let param = {
          pageIndex: 0,
          pageSize: PAGE_SIZE
        }
        setTimeout(this.props.earlyControlList(param), 500)
      })
  }
  /**
   * 获取数据列表
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    const { earlyControlList } = this.props
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      params.state = searchValues.state
      params.warnLevel = searchValues.warnLevel
      params.startTime = searchValues.rangdateStartDate
      params.endTime = searchValues.rangdateEndDate
    }
    earlyControlList(params)
  }
  render () {
    const { earlyWarningControlList
      , count
    } = this.props
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={earlyWarningControlList}
          totalPage={count}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />

      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    earlyWarningControlList: state.default.livePlaceReducer.get('earlyWarningControlList'),
    count: state.default.livePlaceReducer.get('earlyWarnincount')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    earlyControlList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(topicManage)
