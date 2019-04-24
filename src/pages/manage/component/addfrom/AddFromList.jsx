import React, { PureComponent } from 'react'
import { List } from 'antd'

import './AddFromList.less'

class AddFromList extends PureComponent {
  render () {
    const { handleDelete, list } = this.props
    return (
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item
            actions={[<a key={index} onClick={() => handleDelete({ powerTypeGroupCode: item.powerTypeGroupCode })}>删除</a>]}>
            <List.Item.Meta
              title={<a key={index} href="javascript:;">{item.powerTypeGroupName}</a>}
            />
          </List.Item>
        )}
      />
    )
  }
}

export default AddFromList
