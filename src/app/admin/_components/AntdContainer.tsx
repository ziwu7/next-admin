'use client'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
// import './index.css';

export default function AntdContainer({children}: any) {
  return (
    <ConfigProvider locale={zhCN}>
      {children}
      </ConfigProvider>
  )
}
