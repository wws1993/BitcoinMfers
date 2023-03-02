/*
 * @Author: 武文帅 15696141050@163.com
 * @Date: 2022-12-31 16:51:33
 * @LastEditors: wws1993 15696141050@163.com
 * @LastEditTime: 2023-03-02 17:38:47
 * @FilePath: \BitcoinMfers\src\main.tsx
 * @Description: 根目录
 * IE6腦殘粉
 * Copyright (c) 2022 by wws1993<15696141050@163.com>, All Rights Reserved.
 */

import './less/common.less'

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Layout from './layout';
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'

const lazyComponent = (Elm: any) => <Suspense fallback={<div></div>}><Elm /></Suspense>

const routeMap = [
  {p: '/', c: lazyComponent(React.lazy(() => import('./pages/Home.v2')))},
  {p: '/admin', c: lazyComponent(React.lazy(() => import('./pages/Admin')))},
]

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>
  <HashRouter>
    <ConfigProvider theme={{token: { colorPrimary: '#00bcd4' }}}>
      <Layout>
        <Routes>
          {routeMap.map(item => <Route path={item.p} key={item.p} element={ item.c } />)}
        </Routes>
      </Layout>
    </ConfigProvider>
  </HashRouter>
</React.StrictMode>)
