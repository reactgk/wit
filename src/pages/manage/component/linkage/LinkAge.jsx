import React, { PureComponent } from 'react'
import { Form, Select, Button, } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './LinkAge.less'
import { 
	getLinkAgeList ,cascadingQueries
} from '../../../../redux/actions/powerOperationAction'

const { Option } = Select;
const LinkAgeFrom = Form.create()
class LinkAge extends PureComponent {
	constructor (props) {
		super(props);
		//console.log()
		
		getLinkAgeList();
		this.state={
			province : [],
			city : [],
			area : [],
			street : [],
			community : [],
			selected:[]
		}
		//this.province=props.province;
	}
	
	 
	componentWillMount(){
		const { getLinkAgeList } = this.props;
		getLinkAgeList();
		console.log(this.props);
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
				console.log('Received values of form: ', values);
		  }
		});
	}
	
	componentWillReceiveProps () {
		console.log(this.props.province);
	}

	handleSelectChange = (value,source) => {
		const { streetLevelQuery } = this.props;
		//console.log(source);
		const {name}=source.props;
		
		if(name==='area'){
			
		}
		// wrappedComponentRef={ (el) => { source.name} }
		// console.log(streetLevelQuery);
		streetLevelQuery(value);
	}
	
	componentDidMount () {
// 		const { getLinkAgeList } = this.props;
// // 		// console.log(this.props);
// 		getLinkAgeList();
// 		console.log("------------------------");
// 		console.log(this.state);
// 	 this.state.setState({
// 		 selected : props.state.default.powerOperationReducer.get('selected')
// 	 })	
// 	 console.log(this.state);
// 		console.log("------------------------");
// 		this.setState({
// 				province : this.props.province,
// 		});
		
		
	}
	
	render() {
		const { getFieldDecorator } = this.props.form;
		const {
			province //,city ,area ,street ,community 
			// ,place ,point ,devinfo 
			,selected
		} = this.props;
		console.log("------------------------");
		console.log(province);
		console.log("------------------------");
		return (
			<div className="search-form">
			
				<Form layout="inline">
					<Form.Item>
						{
							getFieldDecorator('province', {
								rules: [{ required: false, message: '省' }],
								initialValue :this.state.province.departCode,
							})(
								<Select
									placeholder="Select a option and change input text above"
									onChange={this.handleSelectChange}
									style={{ width: 200 }} 
								>
									{
										this.state.province.map((item,index)=>{
											return (
												<Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
											)
										})
									}
								</Select>
							)
						}
					</Form.Item>
					<Form.Item>
						{
							getFieldDecorator('city', {
								rules: [{ required: false, message: '市' }],
								initialValue :this.state.selected.city,
							})(
								<Select
									placeholder="Select a option and change input text above"
									onChange={this.handleSelectChange}
									style={{ width: 200 }} 
								>
									{
										this.state.city.map((item,index)=>{
											return (
												<Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
											)
										})
									}
								</Select>
							)
						}
					</Form.Item>
					<Form.Item>
						{
							getFieldDecorator('area', {
								rules: [{ required: false, message: '区县' }],
								initialValue :this.state.selected.area,
							})(
								<Select
									key='area'
									placeholder="Select a option and change input text above"
									onChange={this.handleSelectChange}
									style={{ width: 200 }} 
								>
									{
										this.state.area.map((item,index)=>{
											return (
												<Option name='area' key={item.departCode} value={item.departCode}>{item.departName}</Option>
											)
										})
									}
								</Select>
							)
						}
					</Form.Item>
					<Form.Item>
						{
							getFieldDecorator('street', {
								rules: [{ required: false, message: '街道' }],
								initialValue :this.state.selected.street,
							})(
								<Select
									key='street'
									placeholder="Select a option and change input text above"
									onChange={this.handleSelectChange}									
									label='province'
									style={{ width: 200 }} 
								>
									{
										this.state.street.map((item,index)=>{
											return (
												<Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
											)
										})
									}
								</Select>
							)
						}
					</Form.Item>	
					<Form.Item>
						{
							getFieldDecorator('community', {
								rules: [{ required: false, message: '社区' }],
								initialValue :this.state.selected.community,
							})(
								<Select
									placeholder="社区"
									onChange={this.handleSelectChange}
									style={{ width: 200 }} 
								>
									{
										this.state.community.map((item,index)=>{
											return (
												<Option key={item.departCode} value={item.departCode}>{item.departName}</Option>
											)
										})
									}
								</Select>
							)
						}
					</Form.Item>
				</Form>
			</div>
		)
	}
}

// LinkAge.defaultProps = {
//   province : [],
//   city : [],
//   area : [],
//   street : [],
//   community : [],
// //   place : [],
// //   point : [],
// //   devinfo : [],
// 	selected : [],
// 	streetLevelQuery: () => {}
// }

function mapStateToProps (state) {
	//const { getLinkAgeList } = this.props;
// 	getLinkAgeList();
// 	getLinkAgeList();
  // selected : state.default.powerOperationReducer.get('province');
   //console.log(selected);
	return {
 		province : state.default.powerOperationReducer.get('province'),
	
		// test:1111,
		// selected
		city : state.default.powerOperationReducer.get('city'),
		area : state.default.powerOperationReducer.get('area'),
		street : state.default.powerOperationReducer.get('street'),
		community : state.default.powerOperationReducer.get('community'),
// 		place : state.default.powerOperationReducer.get('place'),
// 		point : state.default.powerOperationReducer.get('point'),
// 		devinfo : state.default.powerOperationReducer.get('devinfo'),
		selected : state.default.powerOperationReducer.get('selected')
		//selected: 'adadadsad'
		
	}
}
function mapDispatchToProps (dispatch) {
	return bindActionCreators({ getLinkAgeList ,cascadingQueries }, dispatch)
}

export default  connect(mapStateToProps,mapDispatchToProps)(LinkAge)