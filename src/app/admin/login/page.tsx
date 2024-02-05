'use client'
import React from 'react'
import {Card,Form,Input,Button} from 'antd'
import {useRouter} from 'next/navigation'
export default function LoginPage() {
    const nav=useRouter()
  return (
    <div className='login-form pt-20'>
        <Card title="管理后台登陆" className='w-4/5 mx-auto mt-20'>
        <Form labelCol={{span:3}} onFinish={async (v)=>{
            console.log('v',v)
            //提交登录，设置ck
            const res = await fetch('/api/admin/login',{
                method:'POST',
                body:JSON.stringify(v)
            }).then(res=>res.json())
            console.log('res',res);
            nav.push('/admin/dashboard')
        }
        }>
            <Form.Item name='userName' label="用户名">
                <Input placeholder='请输入用户名' />
            </Form.Item>
            <Form.Item  name='password' label="密码">
                <Input placeholder='请输入密码' />
            </Form.Item>
            <Form.Item >
                <Button block type="primary" htmlType='submit'>登陆</Button>
            </Form.Item>
        </Form>
        </Card>
    </div>
  )
}
