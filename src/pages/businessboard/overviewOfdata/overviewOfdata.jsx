import React, {
  // Fragment,
  PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Modal } from 'antd'
import {
  getWeather, PEOPLE_BAR_DATA, PROTRCTIVE_RING_BAR_DATA, setFlowMapActiveTab, CAR_BAR_DATA, KEY_PERSONNE_BAR_DATA, CAR_RUN_DATA, PER_RUN_DATA, setTimeActiveTab
  , getAllMessage, FIRST_LEVEL, SECOND_LEVEL, FORTH_LEVEL, THIRD_LEVEL, setProtectiveTab, warningRealTimeData
} from '../../../redux/actions/overviewDataAction.js'
import Header from './header/header'
// import { Row, Col } from 'antd'
import TablePies from './pie/pie'
import PieCircle from './pieCircle/pieCircle'
import PieCircles from './line/line'
import './overviewOfdata.less'
import zonghe from '../../../assets/images/zonghe.png'
import guiji from '../../../assets/images/guiji.png'
import bukong from '../../../assets/images/bukong.png'
import fengxian from '../../../assets/images/fengxian.png'
import shebei from '../../../assets/images/shebei.png'
import shuju from '../../../assets/images/shuju.png'
import renkou from '../../../assets/images/renkou.png'
import fangwu from '../../../assets/images/fangwu.png'
import cheliang from '../../../assets/images/cheliang.png'
import renyuanP from '../../../assets/images/renyuanP.png'
import cheliangP from '../../../assets/images/cheliangP.png'
import zhongdianP from '../../../assets/images/zhongdianP.png'
import fanghuP from '../../../assets/images/fanghuP.png'
import passageCar from '../../../assets/images/passageCar.png'
import passagePer from '../../../assets/images/passagePer.png'
class OverviewOfdata extends PureComponent {
  constructor (props) {
    super(props)
    this.setsss = this.setsss.bind(this)
    this.realData = this.realData.bind(this)
    this.waringReal = this.waringReal.bind(this)
    this.state = ({
      animate: false,
      count: 1,
      count1: 1,
      count2: 1,
      count3: 1,
      levelcount1: 1,
      levelcount2: 1,
      levelcount3: 1,
      levelcount4: 1,
      mageStatus: null,
      perMaps: [],
      keyMaps: [],
      carMaps: [],
      firstMap: [],
      secondMap: [],
      thirdMap: [],
      forthMap: [],
      warningMap: [],
      centerMap: []
    })
  }
  componentDidMount () {
    this.props.setTimeActiveTab(CAR_RUN_DATA)
    this.setsss()
    const { getAllMessage } = this.props
    getAllMessage()
    this.realData()
    setInterval(() => {
      this.waringReal()
    }, 2000)
  }
  waringReal () {
    const { warningList } = this.props
    console.log(warningList, 555222)
    this.setState({
      centerMap: warningList,
      warningMap: warningList
    })
  }
  realData () {
    const { warningRealTimeData } = this.props
    // setInterval(() => {
    warningRealTimeData()
    // }, 2000)
  }
  setsss () {
    setInterval(() => {
      document.getElementById('carSetTime').style.display = 'none'
      document.getElementById('perSetTime').style.display = 'block'
      document.getElementById('perSetTime').className =
        'passage-box1 passage-box'
    }, 2000)
    setInterval(() => {
      document.getElementById('carSetTime').style.display = 'block'
      document.getElementById('perSetTime').style.display = 'none'
      document.getElementById('carSetTime').className =
        'passage-box1 passage-box'
    }, 4000)
  }

  componentWillUnmount () {
  }
  people () {
    const { personList } = this.props
    console.log(personList, '人员')
    if (this.state.count % 2 === 0) {
      this.setState({
        count: this.state.count + 1,
        perMaps: []
      })
    } else {
      this.setState({
        count: this.state.count + 1,
        perMaps: personList
      })
    }
  }
  cars () {
    const { carList } = this.props
    console.log(carList, '车辆')
    if (this.state.count1 % 2 === 0) {
      this.setState({
        count1: this.state.count1 + 1,
        carMaps: []
      })
    } else {
      this.setState({
        count1: this.state.count1 + 1,
        carMaps: carList
      })
    }
  }
  keys (e) {
    const { keyPersonList } = this.props
    if (this.state.count2 % 2 === 0) {
      this.setState({
        count2: this.state.count2 + 1,
        keyMaps: []
      })
    } else {
      this.setState({
        count2: this.state.count2 + 1,
        keyMaps: keyPersonList
      })
    }
  }
  firstList (e) {
    const { firstList } = this.props
    if (this.state.levelcount1 % 2 === 0) {
      this.setState({
        levelcount1: this.state.levelcount1 + 1,
        firstMap: []
      })
    } else {
      this.setState({
        levelcount1: this.state.levelcount1 + 1,
        firstMap: firstList
      })
    }
  }
  secondList (e) {
    const { secondList } = this.props
    if (this.state.levelcount2 % 2 === 0) {
      this.setState({
        levelcount2: this.state.levelcount2 + 1,
        secondMap: []
      })
    } else {
      this.setState({
        levelcount2: this.state.levelcount2 + 1,
        secondMap: secondList
      })
    }
  }
  thirdList (e) {
    const { thirdList } = this.props
    if (this.state.levelcount3 % 2 === 0) {
      this.setState({
        levelcount3: this.state.levelcount3 + 1,
        thirdMap: []
      })
    } else {
      this.setState({
        levelcount3: this.state.levelcount3 + 1,
        thirdMap: thirdList
      })
    }
  }
  forthList (e) {
    const { forthList } = this.props
    console.log(forthList, 56565656)
    if (this.state.levelcount4 % 2 === 0) {
      this.setState({
        levelcount4: this.state.levelcount4 + 1,
        forthMap: []
      })
    } else {
      this.setState({
        levelcount4: this.state.levelcount4 + 1,
        forthMap: forthList
      })
    }
  }
  clearKey (e) {
    this.setState({
      count3: this.state.count3 + 1,
      levelcount4: 1,
      levelcount3: 1,
      levelcount2: 1,
      levelcount1: 1,
      firstMap: [],
      secondMap: [],
      thirdMap: [],
      forthMap: []
    })
  }
  handleWheel () {
    setTimeout(() => {
      this.state.numbers.push(this.state.numbers[0])
      this.state.numbers.shift()
      this.setState({ animate: false })
      this.forceUpdate()
    }, 1000)
  }
  levelTab (tabs) {
    return {
      content: {
        tabs
      }
    }
  }
  handleImageErrored () {
    this.setState({ imageStatus: 'failed to load' })
  }
  render () {
    const {
      weather,
      setFlowMapActiveTab,
      getReActiveTab,
      getTimeActiveTab,
      setTimeActiveTab,
      rentalHoseCount,
      selfHouseCount,
      houseCount,
      personCount,
      hjPersonCount,
      livePersonCount,
      flowPersonCount,
      keyPersonCount,
      carCount,
      nativeCarCount,
      foreignCarCount,
      setProtectiveTab,
      placeList, linePerBox, xBox,
      pointList, carPicMap, personOutCount, personFlowCount, personInCount, carFlowCount, carOutCount, carInCount, alertInfoCount, peoPicMap, lineCarBox
    } = this.props
    const palceName = '石家庄'
    // console.log(lineCarBox, 44444, linePerBox, xBox)
    const datas = [
      { value: 4, name: '摇一摇' },
      { value: 40, name: '视频监控' },
      { value: 18, name: '道闸' },
      { value: 25, name: '门禁' },
      { value: 15, name: '魔方' }
    ]
    const datas2 = [
      { value: 1, name: '摇一摇' },
      { value: 3, name: '视频监控' },
      { value: 0, name: '道闸' },
      { value: 0, name: '门禁' },
      { value: 2, name: '魔方' }
    ]
    const datas3 = [
      { value: 0, name: '摇一摇' },
      { value: 2, name: '视频监控' },
      { value: 0, name: '道闸' },
      { value: 1, name: '门禁' },
      { value: 0, name: '魔方' }
    ]
    const color = ['#ce201e']
    console.log(this.state.carMaps, 4444)
    console.log([{ name: '777', value: [79.4977579698, 37.5154606222, 300] }, { name: '777', value: [79.2977579698, 37.0154606222, 300] }], 4444)
    return (
      <div className='over-business-board'>
        <Header title='' weather={weather} />
        {/* <ShoppingList name='Mark' /> */}
        <div className='over-data-body'>
          <div
            className='jump-button'
            // style={{ marginTop: document.body.clientHeight - 890 }}
          >
            <div className='left-jump'>
              <a
                className='nav-item nav-sub-item'
                href='/overview'
                target='_blank'
              >
                <img src={zonghe} />
              </a>
              <a
                className='nav-item nav-sub-item'
                href='/trajectoryanalysis'
                target='_blank'
              >
                <img src={guiji} />
              </a>
              <a
                className='nav-item nav-sub-item'
                href='/controlwarning'
                target='_blank'
              >
                <img src={bukong} />
              </a>
            </div>
            <div className='right-jump'>
              <a className='nav-item nav-sub-item' href='#' target='_blank'>
                <img src={fengxian} />
              </a>
              <a className='nav-item nav-sub-item' href='#' target='_blank'>
                <img src={shebei} />
              </a>
              <a className='nav-item nav-sub-item' href='#' target='_blank'>
                <img src={shuju} />
              </a>
            </div>
          </div>
          {/* <div style={{ position: 'relative', top: '-600px', left: '0px', height: '800px', width: '1920px', background: '#fff', zIndex: '2000' }}>
          </div> */}
          <div className='data-show-left'>
            <div className='data-push'>
              <p className='placeName'>{palceName}</p>
              <TablePies id='pie1' seriesDataList={placeList} />
              <span className='left-top-concer' />
              <span className='right-top-concer' />
              <span className='left-bottom-concer' />
              <span className='right-bottom-concer' />
              <div className='seeData'>
                <div className='img-box'>
                  <img src={fangwu} />
                </div>
                <div className='cont-box'>
                  <p>实有房屋</p>
                  <p>{houseCount}</p>
                </div>
                <p className='dis-box'>
                  <span>自住房：{selfHouseCount}</span>
                  <span>出租房：{rentalHoseCount}</span>
                </p>
              </div>
              <div className='seeData'>
                <div className='img-box'>
                  <img src={renkou} />
                </div>
                <div className='cont-box'>
                  <p>实有人口</p>
                  <p>{personCount}</p>
                </div>
                <p className='dis-box'>
                  <span>户籍人口：{hjPersonCount}</span>
                  <span>常住人口：{livePersonCount}</span>
                </p>
                <p className='dis-box'>
                  <span>流动人口：{flowPersonCount}</span>
                  <span>重点人口：{keyPersonCount}</span>
                </p>
              </div>
              <div className='seeData'>
                <div className='img-box'>
                  <img src={cheliang} />
                </div>
                <div className='cont-box'>
                  <p>实有车辆</p>
                  <p>{carCount}</p>
                </div>
                <p className='dis-box'>
                  <span>本地车辆：{nativeCarCount}</span>
                  <span>外地车辆：{foreignCarCount}</span>
                </p>
              </div>
            </div>
            <div className='data-pie'>
              <p>设备总量：108</p>
              <div className='Pies'>
                <PieCircle id='pie2' seriesDataList={datas} color={color} />
                <p style={{ color: '#B8E986' }}>在线</p>
              </div>
              <div className='Pies'>
                <PieCircle id='pie3' seriesDataList={datas2} />
                <p style={{ color: '#F19622' }}>掉线</p>
              </div>
              <div className='Pies'>
                <PieCircle id='pie4' seriesDataList={datas3} />
                <p style={{ color: '#F24056' }}>预警</p>
              </div>
              <span className='left-top-concer' />
              <span className='right-top-concer' />
              <span className='left-bottom-concer' />
              <span className='right-bottom-concer' />
            </div>
          </div>
          <div className='point-button'>
            <Row>
              <Col span={3} />
              <Col span={3} onClick={(e, val) => this.people(e, val)} className={
                this.state.count % 2 === 0 ? '' : 'no-op'
              }>
                <p
                  onClick={() => {
                    setFlowMapActiveTab(PEOPLE_BAR_DATA)
                  }}
                  className={
                    this.state.count % 2 === 0
                      ? 'flow-data-tab-active'
                      : ''
                  }
                >
                  <span>
                    <img src={renyuanP} alt='' />
                  </span>
                </p>
              </Col>
              <Col span={2} />
              <Col span={3} onClick={(e, val) => this.cars(e, val)} className={
                this.state.count1 % 2 === 0 ? '' : 'no-op'
              }>
                <p
                  onClick={() => {
                    setFlowMapActiveTab(CAR_BAR_DATA)
                  }}
                  className={
                    this.state.count1 % 2 === 0
                      ? 'flow-data-tab-active'
                      : ''
                  }
                >
                  <span>
                    <img src={cheliangP} alt='' />
                  </span>
                </p>
              </Col>
              <Col span={2} />
              <Col span={3} onClick={() => this.keys()} className={
                this.state.count2 % 2 === 0 ? '' : 'no-op'
              }>
                <p
                  onClick={() => {
                    setFlowMapActiveTab(PROTRCTIVE_RING_BAR_DATA)
                  }}
                  className={
                    this.state.count2 % 2 === 0
                      ? 'flow-data-tab-active'
                      : ''
                  }
                >
                  <span>
                    <img src={zhongdianP} alt='' />
                  </span>
                </p>
              </Col>
              <Col span={2} />
              <Col span={3} style={{ position: 'relative', zIndex: 20 }} onClick={() => this.clearKey()}>
                <p className={
                  this.state.count3 % 2 === 0 ? '' : 'no-op'
                }>
                  <p
                    onClick={() => {
                      setFlowMapActiveTab(KEY_PERSONNE_BAR_DATA)
                    }}
                    className={
                      this.state.count3 % 2 === 0
                        ? 'flow-data-tab-active'
                        : ''
                    }
                  >
                    <span>
                      <img src={fanghuP} alt='' />
                    </span>
                  </p>
                  <div
                    className={
                      getReActiveTab === KEY_PERSONNE_BAR_DATA
                        ? 'defint-squer-active'
                        : 'defint-squer'
                    }
                  >
                  </div>
                </p>
              </Col>
              <div className={
                this.state.count3 % 2 === 0 ? '' : 'no-shows'
              } style={{ position: 'relative', left: 'calc(50% + 220px)' }}>
                <span className={
                  this.state.levelcount1 % 2 === 0 ? '' : 'no-op'
                }>
                  <div
                    onClick={() => {
                      setProtectiveTab(FIRST_LEVEL)
                    }}
                    className={
                      this.state.levelcount1 % 2 === 0
                        ? 'activeSquer fanghuSquer1'
                        : 'fanghuSquer1'
                    }
                  >
                    <p onClick={() => this.firstList()}>一级</p>
                  </div>
                </span>
                <span className={
                  this.state.levelcount2 % 2 === 0 ? '' : 'no-op'
                }>
                  <div
                    onClick={() => {
                      setProtectiveTab(SECOND_LEVEL)
                    }}
                    className={
                      this.state.levelcount2 % 2 === 0
                        ? 'activeSquer fanghuSquer2'
                        : 'fanghuSquer2'
                    }
                  >
                    <p onClick={() => this.secondList()}>二级</p>
                  </div>
                </span>
                <span className={
                  this.state.levelcount3 % 2 === 0 ? '' : 'no-op'
                }>
                  <div
                    onClick={() => {
                      setProtectiveTab(THIRD_LEVEL)
                    }}
                    className={
                      this.state.levelcount3 % 2 === 0
                        ? 'activeSquer fanghuSquer3'
                        : 'fanghuSquer3'
                    }
                  >
                    <p onClick={() => this.thirdList()}>三级</p>
                  </div>
                </span>
                <span className={
                  this.state.levelcount4 % 2 === 0 ? '' : 'no-op'
                }>
                  <div
                    onClick={() => {
                      setProtectiveTab(FORTH_LEVEL)
                    }}
                    className={
                      this.state.levelcount4 % 2 === 0
                        ? 'activeSquer fanghuSquer4'
                        : 'fanghuSquer4'
                    }
                  >
                    <p onClick={() => this.forthList()}>四级</p>
                  </div>
                </span>
              </div>
              <Col span={3} />
            </Row>
          </div>
          <div className='data-show-right'>
            <div className='warning-box' style={{ height: '311px' }}>
              <p className='warningTit'>
                预警信息
                <span className='right-font' style={{ lineHeight: '46px' }}>
                  预警数量：{alertInfoCount}
                </span>
              </p>
              <div className='scrollFuction' style={{ height: '270px', overflow: 'hidden' }} onScroll={() => this.handleWheel()}>
                {/* {
                  pointList || [].map((ele, items) => {
                    return (
                      <div key ={items}>
                        <p key={ele.alertTime}>预警点位: {ele.pointName}</p>
                      </div>
                    )
                  })
                } */}
                {
                  (pointList || []).map((ele, items) => {
                    return (
                      <div key ={items}>
                        <p>预警点位: {ele.pointName}</p>
                        <p>预警类型: {ele.alertype}</p>
                        <p>预警时间: {ele.alertTime}</p>
                        <p>
                          预警状态: {ele.state}
                        </p>
                        <hr
                          style={{
                            padding: '2px 10px',
                            border: 'none',
                            borderTop: '1px solid rgba(243,243,243,1)',
                            width: '90%',
                            margin: '10px auto'
                          }}
                        />
                      </div>
                    )
                  })
                }
                {/* {
                  (configItem.options || []).map(item =>
                    <Option key={item.value} value={item.value}>{item.label}</Option>
                  )
                } */}
                {/* <p>预警点位: 中京国际大门入口</p>
                <p>预警类型: 重点人员预警</p>
                <p>预警时间: 2019-03-24 12:20:23</p>
                <p>
                  预警状态: 处理中
                  <span className='right-font' style={{ lineHeight: '46px' }}>
                    责任人: 李召
                  </span>
                </p>
                <hr
                  style={{
                    padding: '2px 10px',
                    border: 'none',
                    borderTop: '1px solid rgba(243,243,243,1)',
                    width: '90%',
                    margin: '10px auto'
                  }}
                /> */}
              </div>
              <span className='left-top-concer' />
              <span className='right-top-concer' />
              <span className='left-bottom-concer' />
              <span className='right-bottom-concer' />
            </div>
            <div className='data-pie'>
              <p className='warningTit'>
                今日通行
              </p>
              <p className='passage-box' id='carSetTime'>
                <img src={passageCar} alt='' />
                <span style={{ color: '#68C5F0' }}>流入量 {carInCount}</span>
                <span style={{ color: '#F19622' }}>流出量 {carOutCount}</span>
                <span style={{ color: '#B8E986' }}>净流量 {carFlowCount}</span>
              </p>
              <p className='passage-box' id='perSetTime'>
                <img src={passagePer} alt='' />
                <span style={{ color: '#68C5F0' }}>流入量 {personInCount}</span>
                <span style={{ color: '#F19622' }}>流出量 {personOutCount}</span>
                <span style={{ color: '#B8E986' }}>净流量 {personFlowCount}</span>
              </p>
              <span className='left-top-concer' />
              <span className='right-top-concer' />
              <span className='left-bottom-concer' />
              <span className='right-bottom-concer' />
            </div>
            <div className='data-pie' style={{ height: '115px' }}>
              <p className='warningTit'>
                <span
                  className={
                    getTimeActiveTab === CAR_RUN_DATA
                      ? 'flow-data-tab-active special-tab'
                      : 'special-tab'
                  }
                  onClick={() => {
                    setTimeActiveTab(CAR_RUN_DATA)
                  }}
                >
                  车行
                </span>
                <span
                  className={
                    getTimeActiveTab === PER_RUN_DATA
                      ? 'flow-data-tab-active special-tab'
                      : 'special-tab'
                  }
                  onClick={() => {
                    setTimeActiveTab(PER_RUN_DATA)
                  }}
                  style={{ marginLeft: 20 }}
                >
                  人行
                </span>
                <span
                  className='right-font'
                  style={{ lineHeight: '26px', marginTop: '10px' }}
                />
              </p>
              <p
                className={
                  getTimeActiveTab === CAR_RUN_DATA
                    ? 'show-car passage-img-box'
                    : 'hide-car passage-img-box'
                }
              >
                {
                  (carPicMap || []).map((items, index) => (
                    <span className='tabs-cont' key={index}>
                      <img src={items} alt='' />
                    </span>
                  ))
                }
              </p>
              <p
                className={
                  getTimeActiveTab === PER_RUN_DATA
                    ? 'show-per passage-img-box'
                    : 'hide-per passage-img-box'
                }
              >
                {
                  (peoPicMap || []).map((items, index) => (
                    <span className='tabs-cont' key={index}>
                      <img src={items} alt='' />
                    </span>
                  ))
                }
              </p>
              <span className='left-top-concer' />
              <span className='right-top-concer' />
              <span className='left-bottom-concer' />
              <span className='right-bottom-concer' />
            </div>
            <div className='data-pie' style={{ padding: '10px 20px 0' }}>
              <span className='left-top-concer' />
              <span className='right-top-concer' />
              <span className='left-bottom-concer' />
              <span className='right-bottom-concer' />
              <PieCircles
                id='dasd' style={{ height: '133px !important', width: 'calc( 50% - 580px)', top: '18px' }}
                color={xBox}
                preDataList={lineCarBox}
                carDataList={linePerBox}
              />
            </div>
          </div>
        </div>
        <Modal title="Basic Modal" visible={this.state.visible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    weather: state.default.overviewDataReducer.get('weather'),
    // 二级: state.default.overviewDataReducer.get('二级'),
    getProActiveTab: state.default.overviewDataReducer.get('getProActiveTab'),
    getTimeActiveTab: state.default.overviewDataReducer.get('getTimeActiveTab'),
    getReActiveTab: state.default.overviewDataReducer.get('getReActiveTab'),
    houseCount: state.default.overviewDataReducer.get('houseCount'),
    selfHouseCount: state.default.overviewDataReducer.get('selfHouseCount'),
    rentalHoseCount: state.default.overviewDataReducer.get('rentalHoseCount'),
    personCount: state.default.overviewDataReducer.get('personCount'),
    flowPersonCount: state.default.overviewDataReducer.get('flowPersonCount'),
    hjPersonCount: state.default.overviewDataReducer.get('hjPersonCount'),
    livePersonCount: state.default.overviewDataReducer.get('livePersonCount'),
    keyPersonCount: state.default.overviewDataReducer.get('keyPersonCount'),
    carCount: state.default.overviewDataReducer.get('carCount'),
    nativeCarCount: state.default.overviewDataReducer.get('nativeCarCount'),
    foreignCarCount: state.default.overviewDataReducer.get('foreignCarCount'),
    personList: state.default.overviewDataReducer.get('personList'),
    carList: state.default.overviewDataReducer.get('carList'),
    keyPersonList: state.default.overviewDataReducer.get('keyPersonList'),
    firstList: state.default.overviewDataReducer.get('firstList'),
    secondList: state.default.overviewDataReducer.get('secondList'),
    thirdList: state.default.overviewDataReducer.get('thirdList'),
    forthList: state.default.overviewDataReducer.get('forthList'),
    placeList: state.default.overviewDataReducer.get('placeList'),
    pointList: state.default.overviewDataReducer.get('pointList'),
    carPicMap: state.default.overviewDataReducer.get('carPicMap'),
    peoPicMap: state.default.overviewDataReducer.get('peoPicMap'),
    carInCount: state.default.overviewDataReducer.get('carInCount'),
    carOutCount: state.default.overviewDataReducer.get('carOutCount'),
    carFlowCount: state.default.overviewDataReducer.get('carFlowCount'),
    personInCount: state.default.overviewDataReducer.get('personInCount'),
    personOutCount: state.default.overviewDataReducer.get('personOutCount'),
    personFlowCount: state.default.overviewDataReducer.get('personFlowCount'),
    alertInfoCount: state.default.overviewDataReducer.get('alertInfoCount'),
    lineCarBox: state.default.overviewDataReducer.get('lineCarBox'),
    warningList: state.default.overviewDataReducer.get('warningList'),
    linePerBox: state.default.overviewDataReducer.get('linePerBox'),
    xBox: state.default.overviewDataReducer.get('xBox')
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      getWeather, setFlowMapActiveTab, setTimeActiveTab, getAllMessage, setProtectiveTab, warningRealTimeData
    },
    dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewOfdata)
