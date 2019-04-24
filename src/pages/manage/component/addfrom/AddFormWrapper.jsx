import React, { PureComponent } from 'react'
import { Modal, Form, Input, Radio, Select } from 'antd'

const Option = Select.Option

class AddFormWrapper extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      list: props.AddWrapperFromList,
      selectedItems: []
    }
  }

  // 加载表单
  getFormItem (TypeItem, index) {
    const { getFieldDecorator } = this.props.form
    const { WrapperFromListDepart } = this.props
    switch (TypeItem.type) {
      case 'input' : {
        return (
          <Form.Item label={TypeItem.label} key={index}>
            {
              getFieldDecorator(TypeItem.name, {
                rules: [{ required: TypeItem.required, message: TypeItem.massage }],
                initialValue: TypeItem.initialValue
              })(
                <Input/>
              )
            }
          </Form.Item>
        )
      }
      case 'select' : {
        return (
          <Form.Item label={TypeItem.label} key={index}>
            {getFieldDecorator(TypeItem.name, {
              rules: [{ required: true, message: TypeItem.massage }]
            })(
              <Select
                placeholder="请选择"
                onChange={this.handleSelectChange}
              >
                {
                  TypeItem.initialValue.map((item, index) => {
                    return (
                      <Option key={index} value={item.value}>{item.label}</Option>
                    )
                  })
                }
              </Select>
            )}
          </Form.Item>
        )
      }
      case 'selectSearch' : {
        // const { selectedItems } = this.state;
        // const filteredOptions = TypeItem.initialValue.filter(o => !selectedItems.includes(o));
        return (
          <Form.Item
            label={TypeItem.label} key={index}
          >
            {getFieldDecorator(TypeItem.name, {
              rules: [
                { required: true, message: TypeItem.massage }
              ]
            })(
              <Select showSearch={true} placeholder="请选择">
                {
                  WrapperFromListDepart.map((item, index1) => {
                    return (
                      <Option key={index1} value={item.departCode}>{item.departName}</Option>
                    )
                  })
                }
              </Select>
            )}
          </Form.Item>

        )
      }
      case 'radio' : {
        return (
          <Form.Item label={TypeItem.label} key={index}>
            {getFieldDecorator(TypeItem.name, {
              rules: [{ required: true, message: TypeItem.massage }]
            })(
              <Radio.Group>
                {
                  TypeItem.initialValue.map((item, index) => {
                    return (
                      <Radio key={index} value={item.value}>{item.label}</Radio>
                    )
                  })
                }
              </Radio.Group>
            )}
          </Form.Item>
        )
      }
      default : {
        return (
          <Form.Item label={TypeItem.label} key={index}>
            {
              getFieldDecorator(TypeItem.name, {
                rules: [{ required: TypeItem.required, message: TypeItem.massage }],
                initialValue: TypeItem.initialValue
              })(
                <Input/>
              )
            }
          </Form.Item>
        )
      }
    }
  }

  onHandlerName1 (code) {
    console.log(code)
  }

  render () {
    const { visible, onCancel, onCreate, ModalTitle } = this.props
    return (
      <div>
        <Modal
          visible={visible}
          title={ModalTitle}
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            {
              this.state.list.map((item, index) => {
                return (this.getFormItem(item, index))
              })
            }
          </Form>

        </Modal>

      </div>
    )
  }
}

export default AddFormWrapper
