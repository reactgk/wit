import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './labelManage.less'
import { Tabs, Icon, Modal, Button, Input, Select } from 'antd'
import { tagTypeSelect, getbikeTagsSearch } from '../../../redux/actions/livePlaceAction'
import { delPeopleLabel, tagTypePersonSelect, savePeopleTypeLabel, tagPersonAdd, tagCarAdd } from '../../../redux/actions/labelTypeAction'
import $ from 'jquery'
const TabPane = Tabs.TabPane
const Option = Select.Option
class topicManage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      tags: ['Unremovable', 'Tag 2', 'Tag 3', 'Unremovable', 'Tag 2', 'Tag 3', 'dasdjhaj', 'dhjashd', 'jdiasjdo', 'dhjaks'],
      inputValue: '',
      edit1: 0,
      edit2: 0,
      edit3: 0,
      typeChoose: '',
      visible: false,
      visibleC: false,
      visibleP: false
    }
  }
  componentDidMount () {
    this.props.tagTypeSelect()
    this.props.getbikeTagsSearch()
    this.props.tagTypePersonSelect()
  }
  labelDel (e) {
    console.log(e)
    console.log(e.currentTarget.getAttribute('data-value'))
    const { delPeopleLabel } = this.props
    let params = {}
    params.id = e.currentTarget.getAttribute('data-value')
    delPeopleLabel(params)
    // console.log(this.labelDels.value)
  }
  addPeople () {
    console.log(this.state.edit1)
    this.setState({
      edit1: this.state.edit1 + 1
    })
  }
  addCar (e) {
    console.log(this.state.edit2, e.currentTarget.getAttribute('value'))
    this.setState({
      edit2: this.state.edit2 + 1
    })
  }
  addBike () {
    console.log(this.state.edit3)
    this.setState({
      edit3: this.state.edit3 + 1
    })
  }
  labelValDel (a) {
    console.log(a.currentTarget.getAttribute('data-index'))
  }
  // 人员标签类型
  showModal () {
    this.setState({
      visible: true
    })
  }
  handleOk (e) {
    const types = this.idNum.state.value
    console.log(types)
    this.setState({
      visible: false
    })
    const { savePeopleTypeLabel } = this.props
    let params = {}
    params.tagTyepName = types
    savePeopleTypeLabel(params)
  }
  handleCancel (e) {
    this.setState({
      visible: false
    })
  }
  // 新增人员标签
  showModalP () {
    this.setState({
      visibleP: true
    })
  }
  handleOkP (e) {
    const types = this.idNumP.state.value
    console.log(types)
    this.setState({
      visibleP: false
    })
    const { tagPersonAdd } = this.props
    let params = {}
    params.tagName = types
    params.tagTypeID = this.state.typeChoose
    tagPersonAdd(params)
  }
  handleCancelP (e) {
    this.setState({
      visibleP: false
    })
  }
  handleChange (value) {
    let arr = [1, 2, 3, 4, 5, 1, 2, 3]
    let aas = [...new Set(arr)]
    let aa = new Set(arr)
    console.log(aa, aas)
    console.log(value)
    this.setState({
      typeChoose: value
    })
  }
  // 新增机动车标签
  showModalC () {
    this.setState({
      visibleC: true
    })
  }
  handleOkC (e) {
    const types = this.idNumC.state.value
    console.log(types)
    this.setState({
      visibleC: false
    })
    const { tagCarAdd } = this.props
    let params = {}
    params.tagName = types
    params.tagType = 0
    tagCarAdd(params)
  }
  handleCancelC (e) {
    this.setState({
      visibleC: false
    })
  }
  // 新增非机动车标签
  showModalB () {
    this.setState({
      visibleB: true
    })
  }
  handleOkB (e) {
    const types = this.idNumB.state.value
    console.log(types)
    this.setState({
      visibleB: false
    })
    const { tagCarAdd } = this.props
    let params = {}
    params.tagName = types
    params.tagType = 0
    tagCarAdd(params)
  }
  handleCancelB (e) {
    this.setState({
      visibleB: false
    })
  }
  /**
 *
 *
 * @returns
 * @memberof topicManage
 */
  render () {
    const { bikeTagsList, newTagList, carList, selectTagList } = this.props
    console.log(88888, newTagList, selectTagList)
    return (
      <div className='label_type'>
        <Tabs onChange={callback} type='card'>
          <TabPane tab='人员标签管理' key='1'>
            <Button type='primary' onClick={ () => this.showModal() } style={{ float: 'right', margin: '10px' }}>新增人员类型</Button>
            <Modal title='新增人员类型' visible={this.state.visible}
              onOk={() => this.handleOk() } onCancel={() => this.handleCancel()}
            >
              人员类型 ： <Input placeholder='请输入人员类型' ref={(el) => { this.idNum = el }} />
            </Modal>
            <Modal title='新增人员标签' visible={this.state.visibleP}
              onOk={() => this.handleOkP() } onCancel={() => this.handleCancelP()}
            >
              人员类型 :
              <Select style={{ width: '100%' }} onChange={(e) => { this.handleChange(e) }}>
                {
                  (selectTagList || []).map(ele =>
                    <Option key={ele.value} value={ele.value}>{ele.label}</Option>
                  )
                }
              </Select>
              人员标签 ： <Input placeholder='请输入人员类型' ref={(el) => { this.idNumP = el }} />
            </Modal>
            <Modal title='新增车辆标签' visible={this.state.visibleC}
              onOk={() => this.handleOkC() } onCancel={() => this.handleCancelC()}
            >
              车辆标签 ： <Input placeholder='请输入人员类型' ref={(el) => { this.idNumC = el }} />
            </Modal>
            <Modal title='新增车辆标签' visible={this.state.visibleB}
              onOk={() => this.handleOkB() } onCancel={() => this.handleCancelB()}
            >
              车辆标签 ： <Input placeholder='请输入人员类型' ref={(el) => { this.idNumB = el }} />
            </Modal>
            {(newTagList || []).map((item, key) =>
              <p key={key}>
                <p style={{ width: '300px', display: 'inline-block' }}>
                  <span style={{ float: 'left' }} className='form-input ant-input tagTyp' >{item.tagTyepName}</span>
                  <span className='delLabel'>
                    <Icon type='close' className='can-closed' ref={(el) => { this.labelDels = el }} onClick={(e) => this.labelDel(e)} data-value={item.id} />
                  </span>
                  <span className='big-icon' onClick={ () => { this.addPeople() } }>
                    <Icon type='edit' style={{ margin: '25px', float: 'left', width: '30px', height: '30px' }}
                      onClick={this.state.edit1 % 2 === 0 ? function label () { $('.delLabel').css({ display: 'inline-block' }); console.log(88585) } : function label () { $('.delLabel').css({ display: 'none' }); console.log(88888) }} />
                  </span>
                </p>
                <br/>
                {
                  item.list.map((item1, number) => {
                    return (
                      <span key={number} value={item1.id} className='lowestType'>
                        <span className='form-input ant-input'>{item1.tagName}</span>
                        <span className='delLabel'>
                          <Icon type='close' className='can-closed'
                            onClick={(e) => { this.labelValDel(e) } }
                            data-index={item1.id}
                          />
                        </span>
                      </span>
                    )
                  })
                }
                <Icon type="plus-circle-o" onClick={() => this.showModalP() } />
              </p>
            )}
          </TabPane>
          <TabPane tab='机动车标签管理' key='2'>
            <div className='lableBody'>
              <Icon type='edit' style={{ margin: '25px', float: 'left', width: '30px', height: '30px' }}
                onClick={this.state.edit1 % 2 === 0 ? function label () { $('.delLabel').css({ display: 'inline-block' }); console.log(88585) } : function label () { $('.delLabel').css({ display: 'none' }); console.log(88888) }} />
              {carList.map((item, key) =>
                <span key={key} >
                  <span value={item.value} onClick={ (e) => { this.addCar(e) } }>
                    <span className='form-input ant-input' >{item.name}</span>
                  </span>
                  <span className='delLabel'>
                    <Icon type='close' className='can-closed'
                      onClick={(e) => { this.labelValDelC(e) }}
                      data-index={item.id}
                    />
                  </span>
                </span>
              )
              }
              <Icon type="plus-circle-o" onClick={() => this.showModalC()} />
            </div>
          </TabPane>
          <TabPane tab='非机动车标签管理' key='3'>
            <div className='lableBody'>
              {bikeTagsList.map((item, key) =>
                <span key={key} value={item.value}>
                  <span className='form-input ant-input' >{item.name}</span>
                </span>
              )
              }
              <Icon type="plus-circle-o" onClick={() => this.showModalB()} />
            </div>
          </TabPane>
        </Tabs>
      </div>

    )
  }
}
// function labelValDel (e) {
//   console.log(123, e)
//   const aaa = $('.lowestType').attr('value')
//   console.log(aaa)
//   // console.log(this.labelValDels.getAttribute('value'))
// }
function callback (key) {
  console.log(key)
}
function mapStateToProps (state) {
  return {
    tagTypeSelectList: state.default.livePlaceReducer.get('tagTypeSelectList'),
    tagList: state.default.livePlaceReducer.get('tagList'),
    newTagList: state.default.labelTypeReducer.get('newTagList'),
    carList: state.default.livePlaceReducer.get('carCheckBoxList'),
    bikeTagsList: state.default.livePlaceReducer.get('bikeCheckBoxList'),
    selectTagList: state.default.labelTypeReducer.get('selectTagList')
    // selectTagList: state.default.populationFloatingReducer.get('counts')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    tagTypeSelect, getbikeTagsSearch, delPeopleLabel, savePeopleTypeLabel, tagTypePersonSelect, tagPersonAdd, tagCarAdd }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(topicManage)
