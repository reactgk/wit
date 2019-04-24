import React, { Fragment, PureComponent } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setCurrentAlertData, closeWarningModal } from '../../../../redux/actions/controlWarningAction'
import './warning-modal.less'

class WarningModal extends PureComponent {
  renderInfo (currentAlertData) {
    const { isPerson } = this.props
    if (isPerson) {
      return (
        <Fragment>
          <p className="warning-info-modal-info-item">
            <span className="info-text">姓名</span>
            {currentAlertData.name || '--'}
          </p>
          <p className="warning-info-modal-info-item">
            <span className="info-text">性别</span>
            {currentAlertData.sex || '--'}
          </p>
          <p className="warning-info-modal-info-item">
            <span className="info-text">族别</span>
            {currentAlertData.nation || '--'}
          </p>
          <p className="warning-info-modal-info-item">
            <span className="info-text">身份证</span>
            {currentAlertData.idNumber || '--'}
          </p>
          <p className="warning-info-modal-info-item">
            <span className="info-text">户籍地</span>
            {currentAlertData.address || '--'}
          </p>
          <p className="warning-info-modal-info-item">
            <span className="info-text">出现点位</span>
            {currentAlertData.pointName || '--'}
          </p>
          <p className="warning-info-modal-info-item">
            <span className="info-text">出现时间</span>
            {currentAlertData.detectTime || '--'}
          </p>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <p className="warning-info-modal-info-item">
          <span className="info-text">车牌号</span>
          {currentAlertData.idPlate || '--'}
        </p>
        <p className="warning-info-modal-info-item">
          <span className="info-text">车牌颜色</span>
          {currentAlertData.plateColor || '--'}
        </p>
        <p className="warning-info-modal-info-item">
          <span className="info-text">车辆颜色</span>
          {currentAlertData.carColor || '--'}
        </p>
        <p className="warning-info-modal-info-item">
          <span className="info-text">场所名称</span>
          {currentAlertData.placeName || '--'}
        </p>
        <p className="warning-info-modal-info-item">
          <span className="info-text">场所地址</span>
          {currentAlertData.placeAddress || '--'}
        </p>
        <p className="warning-info-modal-info-item">
          <span className="info-text">通行时间</span>
          {currentAlertData.recordTime || '--'}
        </p>
      </Fragment>
    )
  }

  render () {
    const { isPerson, isShowModal, currentAlertData, closeWarningModal } = this.props
    if (isShowModal) {
      return (
        <div className="warning-info-modal">
          <div className="warning-info-modal-close-container">
            <i
              className="warning-info-modal-close"
              onClick={closeWarningModal}>×</i>
          </div>
          <div className="warning-info-modal-content">
            <div className="warning-info-modal-user-avatar-container">
              <i className="left-top"/>
              <i className="left-bottom"/>
              <i className="right-top"/>
              <i className="right-bottom"/>
              <img
                className="warning-info-modal-user-avatar"
                src={isPerson ? currentAlertData.imageFace : currentAlertData.imageFullPlate}/>
            </div>
            <div className="warning-info-modal-info-container">
              {this.renderInfo(currentAlertData)}
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
    isPerson: state.default.controlWarningReducer.get('isPerson'),
    currentAlertData: state.default.controlWarningReducer.get('currentAlertData'),
    isShowModal: state.default.controlWarningReducer.get('isShowModal')
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ setCurrentAlertData, closeWarningModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal)
