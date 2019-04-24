import React, { PureComponent } from 'react';
import { Table, Button, Popconfirm } from 'antd';

class PrivilegeTable extends PureComponent  {
	constructor (props) {
		super(props);
		this.state = {
			columns : [{
				title: '权限名称',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: '权限分组',
				dataIndex: 'age',
				width: '12%',
				key: 'age',
			}, {
				title: '权限URL',
				dataIndex: 'address',
				width: '20%',
				key: 'address',
			}, { 
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) => (
					record.state == 1 ? (
						this.state.data.length >= 1
						? (
							<Popconfirm title="确定删除此项嘛?" onConfirm={() => this.handleDelete(record.key)}>
								<a href="javascript:;">删除</a>
							</Popconfirm>
						) : null
					) : null
					
				),
			}],
					
			data : props.TableData,
			
			// rowSelection objects indicates the need for row selection
			rowSelection : {
				onChange: (selectedRowKeys, selectedRows) => {
					console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				},
				onSelect: (record, selected, selectedRows) => {
					console.log(record, selected, selectedRows);
				},
				onSelectAll: (selected, selectedRows, changeRows) => {
					console.log(selected, selectedRows, changeRows);
				},
			}
		}
		
	}
	
	handleDelete = (key) => {
		const dataSource = [...this.state.data];
		// 遍历data大集合
		dataSource.map((item,index)=>{			
			// 遍历data.children集合
			item.children.map((childItem)=>{
				// children中的key值等于传递的ke值
				if(childItem.key == key){
					// 删除符合条件的子元素,重新赋值放入大集合中指定的子元素
					dataSource[index].children=item.children.filter(item=>item.key !== key);
					
					this.setState({ 							
						data: dataSource
					});
				}
			})	
		})
	}
	
	render() {
		const { TableData, } = this.props;
		return (
			<Table columns={this.state.columns} rowSelection={this.state.rowSelection} dataSource={this.state.data} />
		)
	}
}

export default PrivilegeTable
