import React, { Fragment, PureComponent } from 'react'
import './point-info-modal.less'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  TAB_PERSON_CONTROL_WARNING,
  closePointInfoModal
} from '../../../../redux/actions/trajectoryAnalysisAction'

class PointInfoModal extends PureComponent {
  renderInfo (currentPointInfo) {
    const { activeTab } = this.props
    if (activeTab === TAB_PERSON_CONTROL_WARNING) {
      return (
        <Fragment>
          <p className="point-info-modal-info-item">
            <span className="info-text">姓名</span>
            {currentPointInfo.name}
          </p>
          <p className="point-info-modal-info-item">
            <span className="info-text">性别</span>
            {currentPointInfo.sex}
          </p>
          <p className="point-info-modal-info-item">
            <span className="info-text">族别</span>
            {currentPointInfo.nation}
          </p>
          <p className="point-info-modal-info-item">
            <span className="info-text">身份证</span>
            {currentPointInfo.idNumber}
          </p>
          <p className="point-info-modal-info-item">
            <span className="info-text">户籍地</span>
            {currentPointInfo.address}
          </p>
          <p className="point-info-modal-info-item">
            <span className="info-text">出现点位</span>
            {currentPointInfo.pointName}
          </p>
          <p className="point-info-modal-info-item">
            <span className="info-text">出现时间</span>
            {currentPointInfo.detectTime}
          </p>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <p className="point-info-modal-info-item">
          <span className="info-text">车牌号</span>
          {currentPointInfo.idPlate}
        </p>
        <p className="point-info-modal-info-item">
          <span className="info-text">车牌颜色</span>
          {currentPointInfo.plateColor}
        </p>
        <p className="point-info-modal-info-item">
          <span className="info-text">车辆颜色</span>
          {currentPointInfo.carColor}
        </p>
        <p className="point-info-modal-info-item">
          <span className="info-text">场所名称</span>
          {currentPointInfo.placeName}
        </p>
        <p className="point-info-modal-info-item">
          <span className="info-text">场所地址</span>
          {currentPointInfo.placeAddress}
        </p>
        <p className="point-info-modal-info-item">
          <span className="info-text">通行时间</span>
          {currentPointInfo.recordTime}
        </p>
      </Fragment>
    )
  }

  render () {
    const { isShowPointInfoModal, currentPointInfo, closePointInfoModal } = this.props
    if (isShowPointInfoModal) {
      return (
        <div className="point-info-modal">
          <div className="point-info-modal-close-container">
            <i
              className="point-info-modal-close"
              onClick={closePointInfoModal}>×</i>
          </div>
          <div className="point-info-modal-content">
            <div className="point-info-modal-user-avatar-container">
              <i className="left-top"/>
              <i className="left-bottom"/>
              <i className="right-top"/>
              <i className="right-bottom"/>
              <img className="point-info-modal-user-avatar" src={currentPointInfo.imageFace}/>
            </div>
            <div className="point-info-modal-info-container">
              {this.renderInfo(currentPointInfo)}
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

function mapStateToProps (state) {
  return {
    isShowPointInfoModal: state.default.trajectoryAnalysisReducer.get('isShowPointInfoModal'),
    activeTab: state.default.trajectoryAnalysisReducer.get('activeTab'),
    currentPointInfo: state.default.trajectoryAnalysisReducer.get('currentPointInfo')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    { closePointInfoModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PointInfoModal)
