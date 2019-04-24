import React, { PureComponent } from 'react'
import { Button, Form } from 'antd'
import FormWrapper from './FormWrapper'
import AddFormWrapper from '../addfrom/AddFormWrapper'

import './search-form.less'

const Wrapper = Form.create()(FormWrapper)
const CollectionCreateForm = Form.create()(AddFormWrapper)

class SearchForm extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
    // this.visible = false
    this.WrapperFromList = props.WrapperFromList
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.saveFormRef = this.saveFormRef.bind(this)
  }

  showModal () {
    this.setState({ visible: true })
    // this.visible = true
  }

  saveFormRef (formRef) {
    this.formRef = formRef
  }

  handleCancel () {
    this.setState({ visible: false })
    // this.visible = true
  }

  onSearchClick () {
    this.props.doSearch(this.formWrapper.props.form.getFieldsValue())
  }

  // Modal 点击确定时回调
  handleCreate () {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      if (err) {
        return
      }

      // 调用父组件方法
      this.props.AddFromListValue(values, 1)

      form.resetFields()
      this.setState({ visible: false })
      // this.visible = true
    })
  }

  render () {
    const { WrapperFromListDepart } = this.props
    return (
      <div className="search-form">
        <Wrapper
          wrappedComponentRef={(el) => {
            this.formWrapper = el
          }}
          formConfig={this.props.formConfig}
        />

        <div className="search-button">
          <Button
            type="primary"
            className="search-form-button"
            onClick={() => {
              this.onSearchClick()
            }}>
            搜索
          </Button>

          <Button type="primary" className="search-form-button-add" onClick={this.showModal}>添加</Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            ModalTitle="添加" // 弹出层标题
            AddWrapperFromList={this.WrapperFromList}
            WrapperFromListDepart={WrapperFromListDepart}
          />
        </div>

      </div>
    )
  }
}

SearchForm.defaultProps = {
  formConfig: [],
  doSearch: () => {
  }
}

export default SearchForm
