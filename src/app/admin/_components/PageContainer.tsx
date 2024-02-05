'use client'
import React from 'react'
import { Card } from 'antd'
//用作所有dashboard的页面公共配置
export default function PageContainer({children,title}:any) {
  return (
    <Card title={title}>
      {children}
    </Card>
  )
}
