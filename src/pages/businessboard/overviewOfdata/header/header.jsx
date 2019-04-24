import React, { PureComponent } from 'react'
import moment from 'moment'
import immutable from 'immutable'
import './header.less'
import clock from '../../../../assets/images/userPic.png'
class Header extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentDate: moment().format('YYYY.MM.DD HH:mm:ss'),
      weather: props.weather
    }
  }

  componentDidMount () {
    this.getCurrentTime()
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.weather), immutable.fromJS(prevState.weather))) {
      return {
        weather: nextProps.weather
      }
    }
    return null
  }

  getCurrentTime () {
    this.timer = setTimeout(() => {
      this.setState({
        currentDate: moment().format('YYYY.MM.DD HH:mm:ss')
      })
      this.getCurrentTime()
    }, 1000)
  }

  componentWillUnmount () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render () {
    const { weather, currentDate } = this.state
    return (
      <header className='overData-board-header'>
        <div className='title-root'>
          <div className='title-left'>
            <span>{weather.city || '--'}</span>
            <span style={{ marginLeft: 20, marginRight: 20 }}>
              {weather.weather || '--'}
            </span>
            <span>{`${weather.low || '--'}/${weather.high || '--'}`}</span>
          </div>
          <div className='title-right'>
            <img className='user-pic' src={clock} />
            <div className='user-name'>
              <span className='label'>我是社区的主任</span>
            </div>
          </div>
        </div>
        <div className='time-root'>
          <div className='time'>
            <span className='label'>{currentDate}</span>
          </div>
        </div>
      </header>
    )
  }
}

Header.defaultProps = {
  title: '',
  weather: {}
}

export default Header
