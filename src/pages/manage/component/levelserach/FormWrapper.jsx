import React, { PureComponent } from 'react'
import { Form, Input, DatePicker, Select } from 'antd'

const Option = Select.Option

class FormWrapper extends PureComponent {
  getFieldItem (configItem) {
    const { getFieldDecorator } = this.props.form
    switch (configItem.type) {
      case 'select': {
        return (
          <Form.Item key={configItem.value}>
            {
              getFieldDecorator(configItem.value, { rules: [], initialValue: configItem.defaultValue })(
                <Select
                  placeholder={configItem.placeholder}
                  style={{ width: configItem.width || 120 }}>
                  {
                    configItem.options.map(item =>
                      <Option key={item.value} value={item.value}>{item.label}</Option>
                    )
                  }
                </Select>
              )
            }
          </Form.Item>
        )
      }
      case 'date': {
        return (
          <Form.Item key={configItem.value} style={{ width: configItem.width || 120 }}>
            {
              getFieldDecorator(configItem.value, { rules: [] })(
                <DatePicker placeholder="选择时间"/>
              )
            }
          </Form.Item>
        )
      }
      case 'rangeDate': {
        return (
          <Form.Item key={configItem.value} style={{ width: configItem.width || 310 }}>
            {
              getFieldDecorator(`${configItem.value}StartDate`, { rules: [] })(
                <DatePicker placeholder={configItem.placeholder1} style={{ width: 'calc(50% - 12px)' }}/>
              )
            }
            <span style={{ display: 'inline-block', width: 24, textAlign: 'center' }}>-</span>
            {
              getFieldDecorator(`${configItem.value}EndDate`, { rules: [] })(
                <DatePicker placeholder={configItem.placeholder2} style={{ width: 'calc(50% - 12px)' }}/>
              )
            }
          </Form.Item>
        )
      }
      default: {
        return (
          <Form.Item key={configItem.value} >
            {
              getFieldDecorator(configItem.value, { rules: [] })(
                <Input placeholder={configItem.placeholder} style={{ width: configItem.width || 145 }}/>
              )
            }
          </Form.Item>
        )
      }
    }
  }

  getFields () {
    const formConfig = this.props.formConfig
    return formConfig.map((item, index) => {
      return (
        this.getFieldItem(item)
      )
    })
  }

  render () {
    return (
      <Form className="form-wrapper" layout="inline">
        {this.getFields()}
      </Form>
    )
  }
}

FormWrapper.defaultProps = {
  formConfig: []
}

export default FormWrapper
