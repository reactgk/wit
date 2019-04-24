import React, { PureComponent } from 'react'

import './car-person-control.less'

import car from '../../../../assets/images/business-board-icon-car.png'
import person from '../../../../assets/images/business-board-icon-person.png'

class CarPersonControl extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      personControlTotal: props.personControlTotal,
      personWarningTotal: props.personWarningTotal,
      carControlTotal: props.carControlTotal,
      carWarningTotal: props.carWarningTotal
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.personControlTotal !== prevState.personControlTotal ||
      nextProps.personWarningTotal !== prevState.personWarningTotal ||
      nextProps.carControlTotal !== prevState.carControlTotal ||
      nextProps.carWarningTotal !== prevState.carWarningTotal) {
      return {
        personControlTotal: nextProps.personControlTotal,
        personWarningTotal: nextProps.personWarningTotal,
        carControlTotal: nextProps.carControlTotal,
        carWarningTotal: nextProps.carWarningTotal
      }
    }
    return null
  }

  render () {
    const { personControlTotal, personWarningTotal,
      carControlTotal, carWarningTotal } = this.state
    return (
      <div className="car-person-control">
        <div className="item">
          <img src={person}/>
          <div className="content-item">
            <spWarningan>布控</spWarningan>
            <p className="data">
              {personControlTotal}
              <span className="unit">人</span>
            </p>
          </div>
          <div className="content-item">
            <span>预警</span>
            <p className="data red-font">
              {personWarningTotal}
              <span className="unit">人</span>
            </p>
          </div>
        </div>
        <div className="item" style={{ marginTop: 20 }}>
          <img src={car}/>
          <div className="content-item">
            <span>布控</span>
            <p className="data">
              {carControlTotal}
              <span className="unit">辆</span>
            </p>
          </div>
          <div className="content-item">
            <span>预警</span>
            <p className="data red-font">
              {carWarningTotal}
              <span className="unit">辆</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

CarPersonControl.defaultProps = {
  personControlTotal: 0,
  personWarningTotal: 0,
  carControlTotal: 0,
  carWarningTotal: 0
}

export default CarPersonControl
