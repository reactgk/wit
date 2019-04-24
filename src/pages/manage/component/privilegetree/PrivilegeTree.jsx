import React, { PureComponent } from 'react'
import { Tree } from 'antd';

import './PrivilegeTree.less'

const { TreeNode } = Tree;

class PrivilegeTree extends PureComponent {
  constructor (props) {
  	super(props);
  	this.state = {
			expandedKeys: ['0-0','0-1','0-2'], // 默认展开项
			autoExpandParent: true,	// 自动扩展父级(不知道有什么用)
			checkedKeys: [],	// 默认选中项
			selectedKeys: [],
		};
  }
	

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }

  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  })
	
	/*
		param List treeData 树形结构列表项
	*/
  render() {
		const {
			treeData, // 列表项
			} = this.props;
    return (
      <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    );
  }
}


export default PrivilegeTree