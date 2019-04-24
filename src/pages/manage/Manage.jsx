import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'
import { getDepartments, getDeviceTypes,
  getNationTypes, getPlaceTypes,
  getPowerTypes, getUserTypes, getplaceTopic,
  getLivePlace, getCascader, getDomicileTypes, selectPresonTypeList } from '../../redux/actions/manageAction.js'
import auth from '../../network/auth'
import Nav from './nav/Nav'
import Header from './header/Header'
import Tab from './tab/Tab'

import './manage.less'

class Manage extends PureComponent {
  componentDidMount () {
    const { getDepartments, getDeviceTypes,
      getNationTypes, getPlaceTypes,
      getPowerTypes, getUserTypes, getplaceTopic, getLivePlace, getCascader, getDomicileTypes, selectPresonTypeList } = this.props
    auth.registerTokenEffect(() => {
    })
    getDepartments()
    getDeviceTypes()
    getNationTypes()
    getPlaceTypes()
    getPowerTypes()
    getUserTypes()
    getplaceTopic()
    getLivePlace()
    getCascader()
    getDomicileTypes()
    selectPresonTypeList()
    // getPopulationSize()
    // getPopulationFloating()
  }

  render () {
    return (
      <div className="manage">
        <Header/>
        <div className="manage-root-content">
          <Nav/>
          <div className="manage-content">
            <Route component={Tab}/>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getDepartments, getDeviceTypes,
    getNationTypes, getPlaceTypes,
    getPowerTypes, getUserTypes,
    getplaceTopic, getLivePlace,
    getCascader, getDomicileTypes, selectPresonTypeList
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Manage)
