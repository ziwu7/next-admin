import React from 'react'
import  AntdContainer  from './_components/AntdContainer'
//在layout模板组件里放入AntdContainer把全部组件包起来才能使用antd
export default function AdminLayout({children}:any) {
  return (
    <div className='admin-main'>
    <AntdContainer>
      {children}
    </AntdContainer>
    </div>
  )
}
