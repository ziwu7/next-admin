import React from 'react'
import AntdAdmin from '../_components/AntdAdmin'
//在layout模板组件里放入AntdContainer把全部组件包起来才能使用antd
export default function DashBoardLayout({children}:any) {
  return (
    <div className='admin-dashboard'>
    <AntdAdmin>
      {children}
    </AntdAdmin>
    </div>
  )
}
