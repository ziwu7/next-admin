"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Table,
  Button,
  Input,
  Card,
  Modal,
  Space,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import MyUpload from "../../_components/MyUpload";
import MyEditor from "../../_components/MyEditor";
type Article = {
  //来源是数据库里的article
  id: string;
  title: string;
  desc: string;
  image: string;
  content: string;
};

export default function ArticlePage() {
  const [open, setOpen] = React.useState(false);
  const [myform] = Form.useForm();

  const [dataList, setDataList] = React.useState<Article[]>([]); //
  const [query, setQuery] = React.useState({
    per: 10,
    page: 1,
    title: "",
  });
  //currentId为空时为新增数据，不为空时则为修改数据
  const [currentId, setCurrentId] = React.useState("");
  const [total, setTotal] = React.useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  //监听查询条件改变时？
  useEffect(() => {
    fetch(
      `/api/admin/articles/?per=${query.per}&&page=${query.page}&&title=${query.title}`,
      {}
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("getdata", data);
        setDataList(data.data);
        setTotal(data.total);
      });
  }, [query]);

  //监控模态框关闭时crrentId确保恢复为空,清空数据
  useEffect(() => {
    if (!open) {
      setCurrentId("");
      setImageUrl("");
      setHtml("");
      myform.resetFields(); //竟然是用这个来清空数据，但是有报错
    }
  }, [open]);
  const columnList: TableColumnsType<Article> = [
    {
      title: "序号",
      width: 80,
      render(v, r, index) {
        //当前值，当前行，索引
        return index + 1;
      },
    },
    { key: "title", dataIndex: "title", title: "标题" },
    { key: "desc", dataIndex: "desc", title: "简介" },
    {
      title: "封面",
      width: 100,
      render(v, r) {
        return <img src={r.image || ""} alt={r.title} width={50} height={50} />;
      },
    },
    {
      title: "操作",
      render(v, r) {
        //当前值，当前行，索引
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              icon={<EditOutlined />}
              onClick={() => {
                //点击编辑按钮打开模态框，显示模态框里面的form
                setOpen(true);
                //这里加这个标识是为了识别添加按钮为新增还是修改，用currentId不为空表示当前属于编辑修改数据状态，不是则为新增数据状态，
                setCurrentId(r.id);
                //将模态框里的form对应当前行的数据(数据从render来获取)
                myform.setFieldsValue(r);
                //（个人分析）这里还要设置图片，虽然myform.setFieldsValue(r)已经设置数据了，但是图片组件需要2个参数，imageUrl,setImageUrl，所以还要单独setImage，
                setImageUrl(r.image);
                //跟图片类似，组件需要的参数2个，html和setHtml
                setHtml(r.content);
              }}
            />
            <Popconfirm
              title="是否删除？"
              onConfirm={async () => {
                console.log("删除id", r.id);

                //注意：此处不能设置currentId，否则会变为修改数据的流程了
                //删除数据
                await fetch("/api/admin/articles/" + r.id, {
                  method: "DELETE",
                  // body:currentId
                }).then((res) => res.json());
                setQuery({ ...query }); //改变query重新触发重新获取数据？
              }}
            >
              <Button
                type="primary"
                size="small"
                icon={<DeleteOutlined />}
                danger
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <Card
      title="文章管理"
      extra={
        <Button
          icon={<PlusOutlined />}
          type="primary"
          onClick={() => {
            setOpen(true);
          }}
        />
      }
    >
      <Form
        layout="inline"
        onFinish={async (v) => {
          console.log("query-改title", v);
          setQuery({ ...query, ...v, page: 1 }); //用新的title和page数据覆盖默认的数据,数据库搜索含包含条件contains时，需全量搜索不能设置跳过数量，所以page设置为1
          await fetch(
            `/api/admin/articles/?per=${query.per}&&page=${query.page}&&title=${query.title}`,
            {}
          ).then((res) => res.json());
        }}
      >
        <Form.Item label="标题" name="title">
          <Input name="title" placeholder="请输入文章标题" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
      <Table
        style={{ marginTop: "8px" }}
        rowKey="id"
        dataSource={dataList}
        columns={columnList}
        pagination={{
          total: total,
          pageSize: query.per,
          current: query.page,
          onChange: (page, pageSize) => {
            setQuery({ ...query, page, per: pageSize });
            console.log("分页修改query", query);
          },
        }}
      />
      <Modal
        title="新增文章"
        open={open}
        width="75vw"
        onCancel={() => {
          setOpen(false);
        }}
        // destroyOnClose //={true} //关闭模态框时销毁，清空数据，和Form的preserve一起使用才生效
        maskClosable={false} //点击空白处模态框不关闭
        onOk={() => {
          myform.submit(); //手动出发模态框里面的form提交
        }}
      >
        <Form
          // preserve ={false} //表单提交后不保留数据,和Modal的destroyOnClose一起使用才生效
          layout="vertical"
          form={myform}
          onFinish={async (v) => {
            console.log("vvvv", v);
            if (currentId) {
              console.log("修改", currentId);

              //有currentid，修改模式
              await fetch("/api/admin/articles/" + currentId, {
                method: "PUT",
                body: JSON.stringify({ ...v, image: imageUrl, content: html }),
              }).then((res) => res.json());
              setOpen(false);
              setQuery({ ...query }); //改变query重新触发重新获取数据？
            } else {
              //无currentid，新增模式
              //此处需要调接口提交保存到数据库
              await fetch(
                `/api/admin/articles/?per=${query.per}&&page=${query.page}`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    ...v,
                    image: imageUrl,
                    content: html,
                  }),
                }
              ).then((res) => res.json());
              setOpen(false);
              setQuery({ ...query }); //改变query重新触发重新获取数据？
            }
          }}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入文章标题" />
          </Form.Item>
          <Form.Item label="简介" name="desc">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="图片">
            <MyUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
          <Form.Item label="详情">
            <MyEditor html={html} setHtml={setHtml} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
