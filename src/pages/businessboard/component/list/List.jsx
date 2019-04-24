import React, { PureComponent } from 'react'
import immutable from 'immutable'

import './list.less'

class List extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      dataList: props.dataList
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (!immutable.is(immutable.fromJS(nextProps.dataList), immutable.fromJS(prevState.dataList))) {
      return {
        dataList: nextProps.dataList
      }
    }
    return null
  }

  renderList () {
    const { dataList } = this.state
    const { renderRow, onRowClick, onRowDoubleClick } = this.props
    return dataList.map((item, index) => {
      return (
        <li
          key={'' + index}
          onClick={() => { onRowClick(item) }}
          onDoubleClick={() => { onRowDoubleClick(item) }}>
          <div className="content">
            {renderRow(item)}
          </div>
        </li>
      )
    })
  }

  render () {
    return (
      <div className="list-root">
        <ul className={`list ${this.props.rootClassName}`} style={this.props.rootStyle}>
          {this.renderList()}
        </ul>
        <i className="left-top"/>
        <i className="left-bottom"/>
        <i className="right-top"/>
        <i className="right-bottom"/>
      </div>
    )
  }
}

List.defaultProps = {
  dataList: [],
  rootClassName: '',
  rootStyle: {},
  onRowClick: () => {},
  onRowDoubleClick: () => {},
  renderRow: () => {}
}

export default List
