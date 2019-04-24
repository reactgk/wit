import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Row, Col, Select, Button, DatePicker, Modal, Input } from 'antd'
import {
  savePopulationDetail
} from '../../../redux/actions/personManageEditAction'
import './personManageEdit.less'

const localValue = {
  populationManageEdit: {}
}

class peopleEdit extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      populationManageEdit: {}
    }
    this.handleChangeFor = this.handleChangeFor.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.ReturnValue = this.ReturnValue.bind(this)
  }
  componentDidMount () {

  }

  // 请求
  ReturnValue () {
    Modal.success({
      title: '操作成功'
    })
  }

  handleChangeFor (event) {
    localValue.populationManageEdit[event.target.name] = event.target.value
  }
  handleChangeForLiveType (event) {
    localValue.populationManageEdit['resideType'] = event
  }
  handleChangeForPersonProperty (event) {
    localValue.populationManageEdit['personProperty'] = event
  }
  handleChangeForCompnay (event) {
    localValue.populationManageEdit['company'] = event
  }
  handleChangeForLivingTime (event) {
    localValue.populationManageEdit['livingTime'] = event
  }
  handleChangeForBirthday (date, dateString) {
    console.log(date)
    localValue.populationManageEdit['birthday'] = dateString
  }

  handleSubmit () {
    const { savePopulationDetail } = this.props
    savePopulationDetail(localValue.populationManageEdit, this.ReturnValue)
  }

  render () {
    return (
      <div className="houseManageModel">
        <Row style={{ margin: '0 10px' }}>
          <Col span={3}></Col>
          <Col span={8}>
            <span>姓名：</span><Input type="text" name = "name" defaultValue={this.state.populationManageEdit.name} onChange={event => this.handleChangeFor(event)}/>
            <span>性别：</span><Input type="text" name = "sex" defaultValue={this.state.populationManageEdit.sex} onChange={event => this.handleChangeFor(event)}/>
            <span>民族：</span><Input type="text" name = "nation" defaultValue={this.state.populationManageEdit.nation} onChange={event => this.handleChangeFor(event)}/>
            <span>出生年月：</span>
            <br/>
            <DatePicker placeHolder={ '请选择出生日期' } name = "birthday" onChange={ (date, dateString) => this.handleChangeForBirthday(date, dateString) }/>
            <br/>
            <span>身份证号：</span><Input type="text" name = "idNumber" defaultValue={this.state.populationManageEdit.idNumber} onChange={event => this.handleChangeFor(event)}/>
            <span>户籍地址：</span><Input type="text" name = "homeAddress" defaultValue={this.state.populationManageEdit.homeAddress} onChange={event => this.handleChangeFor(event)}/>
            <span>发证机关：</span><Input type="text" name = "issuer" defaultValue={this.state.populationManageEdit.issuer} onChange={event => this.handleChangeFor(event)}/>
            {/* <span>上传照片：</span><Input type="text" name = "imageFace" defaultValue={this.state.populationManageEdit.imageFace} onChange={event => this.handleChangeFor(event)}/> */}
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <span>联系方式：</span><Input type="text" name = "telephone" defaultValue={this.state.populationManageEdit.telephone} onChange={event => this.handleChangeFor(event)}/><span>现居住地：</span><Input type="text" name = "currentAddress" defaultValue={this.state.populationManageEdit.currentAddress} onChange={event => this.handleChangeFor(event)}/>
            <span>居住类型：</span>
            <br/>
            <Select placeholder={ '请选择居住类型' } style={{ width: 200 }} name = "resideType" defaultValue={this.state.populationManageEdit.resideType} onChange={this.handleChangeForLiveType}>
              <Select.Option value="0">常住人口</Select.Option>
              <Select.Option value="1">流动人口</Select.Option>
              <Select.Option value="2">陌生人</Select.Option>
              <Select.Option value="3">户籍人口</Select.Option>
            </Select>
            <br/>
            <span>所属单位：</span>
            <br/>
            <Select placeholder={ '请选择所属单位'} style={{ width: 200 }} name = "company" defaultValue={this.state.populationManageEdit.company} onChange={this.handleChangeForCompnay}>
              <Select.Option value="师机关">师机关</Select.Option>
              <Select.Option value="团机关">团机关</Select.Option>
              <Select.Option value="社区">社区</Select.Option>
              <Select.Option value="一连">一连</Select.Option>
              <Select.Option value="二连">二连</Select.Option>
              <Select.Option value="三连">三连</Select.Option>
              <Select.Option value="四连">四连</Select.Option>
              <Select.Option value="五连">五连</Select.Option>
              <Select.Option value="六连">六连</Select.Option>
              <Select.Option value="七连">七连</Select.Option>
              <Select.Option value="八连">八连</Select.Option>
              <Select.Option value="九连">九连</Select.Option>
              <Select.Option value="十连">十连</Select.Option>
              <Select.Option value="十一连">十一连</Select.Option>
              <Select.Option value="十二连">十二连</Select.Option>
              <Select.Option value="皮墨北京工业园">皮墨北京工业园</Select.Option>
              <Select.Option value="新疆城建">新疆城建</Select.Option>
              <Select.Option value="城投公司">城投公司</Select.Option>
              <Select.Option value="开元建筑">开元建筑</Select.Option>
              <Select.Option value="枣业公司">枣业公司</Select.Option>
            </Select>
            <br/>
            <span>人员性质：</span>
            <br/>
            <Select placeholder={ '请选择人员性质'} style={{ width: 200 }} name = "personProperty" defaultValue={this.state.populationManageEdit.personProperty} onChange={this.handleChangeForPersonProperty}>
              <Select.Option value="干部">干部</Select.Option>
              <Select.Option value="职工招录">职工招录</Select.Option>
              <Select.Option value="经商办企业">经商办企业</Select.Option>
              <Select.Option value="劳动力">劳动力</Select.Option>
              <Select.Option value="企业工人">企业工人</Select.Option>
              <Select.Option value="购房入籍">购房入籍</Select.Option>
            </Select>
            <br/>
            <span>居住年限：</span>
            <br/>
            <Select placeholder={ '请选择居住年限'} style={{ width: 200 }} name = "livingTime" defaultValue={this.state.populationManageEdit.livingTime} onChange={this.handleChangeForLivingTime}>
              <Select.Option value="半年">半年</Select.Option>
              <Select.Option value="一年">一年</Select.Option>
              <Select.Option value="二年">二年</Select.Option>
              <Select.Option value="长期">长期</Select.Option>
            </Select>
            <br/>
            <span>登记时间：</span><Input type="text" name = "registerTime" defaultValue={this.state.populationManageEdit.registerTime} onChange={event => this.handleChangeFor(event)}/>
          </Col>
          <Col span={3}></Col>
        </Row>
        <p align="right"><Button type={'primary'} onClick={this.handleSubmit}>保存</Button></p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    populationManageEdit: state.default.personManageEditReducer.get('populationManageEdit')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ savePopulationDetail }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(peopleEdit)
