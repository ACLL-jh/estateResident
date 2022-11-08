import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/font/iconfont.css';
import 'antd/dist/antd.min.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import zhCN from 'antd/es/locale/zh_CN';
import Router from './router/index';
import { ConfigProvider, DatePicker, message } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log(<Router></Router>);

root.render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <Router></Router>
    </BrowserRouter>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
