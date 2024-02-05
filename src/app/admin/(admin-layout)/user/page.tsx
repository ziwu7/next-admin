'use client'
import React from 'react'
import {Form, Input, Button,Table, Card} from 'antd';
import {SearchOutlined,PlusOutlined}from '@ant-design/icons';
const columns=[
    {
        title:'姓名',
        key:'name',dataIndex: 'name'},{title:'年龄',key:'age',dataIndex: 'age'},{title:'性别',key:'sex',dataIndex: 'sex'},{title:'地址',key:'address',dataIndex: 'address'}]
const datas = [{
name:'张三',
age:18,
sex:'男',
address:'北京'
},{
    name:'张而',
    age:11,
    sex:'男',
    address:'英德'
    }]
export default function UserInfo() {
  return (
    <Card title='用户信息' extra={<><Button type='primary' icon={<PlusOutlined/>}/></>}>
      <Form layout='inline'>
        <Form.Item label='名字'>
            <Input placeholder='请输入用户名字' />
        </Form.Item>
        <Form.Item >
            <Button type='primary' htmlType='submit' icon={<SearchOutlined/>}>查询</Button>
        </Form.Item>
      </Form>
      <Table style={{marginTop:'8px'}} columns={columns} dataSource={datas}/>
    </Card >
  )
}
