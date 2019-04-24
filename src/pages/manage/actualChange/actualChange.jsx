import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './actualChange.less'
class peopleDetails extends PureComponent {
  componentDidMount () {
  }
  render () {
    return (
      <div>
        dasdasda
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(peopleDetails)
