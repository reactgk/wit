import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchForm from '../component/searchform/SearchForm'
import IotTable from '../component/table/IotTable'
import Cascade from '../component/cascade/Cascade'
import {
  setActiveLink, ACTIVE_LINK_BIKE_DETAILS
} from '../../../redux/actions/manageAction'
import { bikeModelOptions } from '../../../data/selectOptions'
import { getBikeManageList, getBikeDetailsList } from '../../../redux/actions/livePlaceAction'
// import { Select } from 'antd'
import { PAGE_SIZE } from '../../../redux/actions/constant.js'
import './basicformation.less'
class Organization extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.searchValues = {}
    this.formConfig = [
      { value: 'deviceno', width: 200, placeholder: '标签编号', type: 'input' },
      { value: 'owner', placeholder: '车主', type: 'input' },
      // { value: 'provinceCode', width: 145, placeholder: '通行场所', type: 'select', options: [] },
      { value: 'model', placeholder: '车辆类型', type: 'select', options: bikeModelOptions },
      // { value: 'inOut', placeholder: '出入类型', type: 'select', options: inOUtOptions },
      { value: 'rangdate', type: 'rangeDate', placeholder1: '最后一次通行开始时间', placeholder2: '最后一次通行结束时间', width: 420 }
    ]
    const { tabs, setActiveLink } = this.props
    this.tableColumns = [
      { title: '标签编号', dataIndex: 'deviceNo', key: 'deviceNo' },
      { title: '所属场所', dataIndex: 'place', key: 'place' },
      { title: '车辆类型', dataIndex: 'model', key: 'model',
        render: (text, recode) => (
          <p>
            {
              recode.model === 0 ? <span>自行车</span> : (recode.model === 1 ? <span>电动车</span> : (recode.model === 2) ? <span>摩托车</span> : (recode.model === 4) ? <span>三轮车</span> : <span>其他</span>)
            }
          </p>
        )
      },
      { title: '钢印编号', dataIndex: 'sealno', key: 'sealno' },
      { title: '车主',
        dataIndex: 'owner',
        key: 'owner',
        render: (text, record) =>
          <p>
            <a onClick={() => { this.getPoint(text, record) } }>{record.owner}</a>
          </p>
      },
      { title: '车辆照片', dataIndex: 'inflow', key: 'inflow' },
      { title: '平台登记时间', dataIndex: 'outflow', key: 'outflow' },
      { title: '最后一次通行信息', dataIndex: 'lastime', key: 'lastime' },
      { title: '操作',
        dataIndex: '',
        key: '',
        render: (text, record) =>
          <div className='nav-item nav-sub-item-active'
            onClick={() => {
              setActiveLink(ACTIVE_LINK_BIKE_DETAILS, tabs)
              this.props.getBikeDetailsList(record.id)
            }}>
            <span className="label">详情</span>
          </div>
      }
    ]
  }

  componentDidMount () {
    this.getDataList(0)
  }
  getCommiy (e) {
    console.log(e)
    this.setState({
      province: e.province,
      city: e.city,
      area: e.area,
      street: e.street,
      community: e.community
    })
  }

  /**
   * 获取数据列表（tab1）
   * @param pageIndex
   * @param searchValues
   */
  getDataList (pageIndex, searchValues) {
    const { getBikeManageList } = this.props
    this.searchValues = searchValues
    let params = {
      pageIndex: pageIndex,
      pageSize: PAGE_SIZE
    }
    if (searchValues) {
      params.deviceno = searchValues.deviceno
      params.owner = searchValues.owner
      params.model = searchValues.model
      params.begindate = searchValues.rangdateStartDate
      params.enddate = searchValues.rangdateEndDate
      params.inOut = searchValues.inOut

      // params.provinceCode = this.state.province
      // params.cityCode = this.state.city
      // params.areaCode = this.state.area
      // params.jdCode = this.state.street
      // params.sqCode = this.state.community
    }
    this.setState({ unitList: [212212] })

    getBikeManageList(params)
  }

  render () {
    const { count, bikeManageList
    } = this.props
    return (
      <div>
        <SearchForm
          formConfig={this.formConfig}
          doSearch={(values) => { this.getDataList(0, values) }}
        />
        <div className='levelFour'>
          <Cascade onDataChange={(e) => this.getCommiy(e)}></Cascade>
        </div>
        <IotTable
          topButtons={this.tableTopButtons}
          columns={this.tableColumns}
          dataSource={bikeManageList}
          totalPage={count}
          onChange={(pagination) => { this.getDataList(pagination.current - 1, this.searchValues) }}
        />
      </div>
    )
  }
}
function mapStateToProps (state) {
  return {
    // nationTypes: state.default.manageReducer.get('nationTypes')
    bikeManageList: state.default.livePlaceReducer.get('bikeManageList'),
    count: state.default.livePlaceReducer.get('bikeManagecount'),
    tabs: state.default.manageReducer.get('tabs')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getBikeManageList, setActiveLink, getBikeDetailsList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Organization)
