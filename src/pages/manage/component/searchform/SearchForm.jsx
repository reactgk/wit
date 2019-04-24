import React, { PureComponent } from 'react'
import { Form, Button } from 'antd'
import FormWrapper from './FormWrapper'

import './search-form.less'

const Wrapper = Form.create()(FormWrapper)

class SearchForm extends PureComponent {
  onSearchClick () {
    this.props.doSearch(this.formWrapper.props.form.getFieldsValue())
  }

  render () {
    return (
      <div className="search-form">
        <Wrapper
          wrappedComponentRef={ (el) => { this.formWrapper = el } }
          formConfig={this.props.formConfig}/>
        <Button
          type="primary"
          className="search-form-button"
          onClick={() => { this.onSearchClick() }}>
          搜索
        </Button>
      </div>
    )
  }
}

SearchForm.defaultProps = {
  formConfig: [],
  doSearch: () => {}
}

export default SearchForm
