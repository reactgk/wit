import React, { PureComponent } from 'react'
import { Button, Form } from 'antd'
import AddFormWrapper from './AddFormWrapper'
import './AddFrom.less'

const CollectionCreateForm = Form.create()(AddFormWrapper)

class AddFrom extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      ModalTitle: props.ButtonName
    }

    this.saveFormRef = this.saveFormRef.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.showModal = this.showModal.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  showModal () {
    this.setState({ visible: true })
  }

  handleCancel () {
    this.setState({ visible: false })
  }

  // Modal 点击确定时回调
  handleCreate () {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      // 调用父组件方法
      this.props.AddFromListValue(values)

      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef (formRef) {
    this.formRef = formRef
  }

  render () {
    const {
      ButtonName,
      AddWrapperFromList
    } = this.props
    return (
      <div className="newAddBtn">
        <Button type="primary" onClick={this.showModal}>{ButtonName}</Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          ModalTitle={this.state.ModalTitle} // 弹出层标题
          AddWrapperFromList={AddWrapperFromList}
        />
      </div>
    )
  }
}

export default AddFrom
