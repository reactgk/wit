import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import moment from 'moment'
import { LocaleProvider } from 'antd'
import 'moment/locale/zh-cn'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { BrowserRouter, Route } from 'react-router-dom'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import './index.less'
import App from './pages/App'

import * as reducer from './redux/reducers/rootReducer'

moment.locale('zh-cn')

const store = createStore(
  combineReducers(reducer),
  applyMiddleware(thunk, logger)
)

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <BrowserRouter>
        <Route component={App} />
      </BrowserRouter>
    </Provider>
  </LocaleProvider>,
  document.getElementById('app')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
