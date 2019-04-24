import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPersonList,
  setPersonTagStatus, setPersonWarningStatus
} from '../../../redux/actions/baseInformationManageAction'
class peopleDetails extends PureComponent {
  componentDidMount () {
    window.localStorage.getItem('peopleDetailsData')
    console.log(window.localStorage.getItem('peopleDetailsData'))
  }
  handleSubmit (e) {
    e.preventDefault()
    console.log('收到表单值：', this.props.form.getFieldsValue())
  }
  render () {
    return (
      <div>
       people
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getPersonList, setPersonTagStatus, setPersonWarningStatus }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(peopleDetails)
