import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Breadcrumb, Button, Col, DatePicker, Layout, Row, Space, Table, Typography, message, Popconfirm } from 'antd'
import { Content } from 'antd/es/layout/layout';
import { MetaData } from '../../components/Layout/MetaData';
import dayjs from 'dayjs';
import {
  DiffOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  FundViewOutlined
} from '@ant-design/icons';
import { NewBillSpending } from '../../components/Dialog/NewBillSpending';
import "./PersonalSpending.scss"
import { ViewEditBillSpending } from '../../components/Dialog/ViewEditBillSpending';

function PersonalSpending() {
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const confirm = (e) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(message.success('Delete Success!')), 3000);
    });

  const confirmCopy = (e) =>
    new Promise((resolve) => {
      setTimeout(() => resolve(message.success('Copy Success!')), 3000);
    });
  // message.success('Delete Success!');
  const cancelCopy = (e) => {
    console.log(e);
    message.error('Delete no success!');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Delete no success!');
  };
  const toggleModal = () => {
    setOpen(!open)
  }

  const toggleModalEdit = () => {
    setOpenEdit(!openEdit)
  }
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 80
    },
    {
      title: 'Ngày',
    },
    {
      title: 'Tổng',
    },
    {
      title: 'Chi tiết',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: () => (
        <Space>
          <Typography.Link>
            <Popconfirm
              title="Copy the bill"
              description="Are you sure to copy this bill?"
              onConfirm={confirmCopy}
              onCancel={cancelCopy}
              okText="Yes"
              cancelText="No"
            ><CopyOutlined title='Copy' />
            </Popconfirm></Typography.Link>
          <Typography.Link>
            <Popconfirm
              title="Delete the bill"
              description="Are you sure to delete this bill?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined title="Delete" />
            </Popconfirm>
          </Typography.Link>
          {/* <Typography.Link><EditOutlined title="Edit"/></Typography.Link> */}
          <Typography.Link onClick={toggleModalEdit}><FundViewOutlined title="View" /></Typography.Link>
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      stt: '1'
    },
  ]
  const dateFormat = 'YYYY-MM-DD';
  const currentDate = dayjs().format('YYYY-MM-DD')
  const itemsBreadCums = [
    { title: 'Dxm', path: '/' },
    { title: 'My Spending ', path: '/dashboard' },
  ];
  return (
    <>
      <MetaData title="DXM - My Spending"></MetaData>
      <Content
      // style={{ margin: '24px 16px 0 266px', overflow: 'initial' }}
      >
        <Breadcrumb style={{
          margin: '16px 0',
        }}
          items={itemsBreadCums} />
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Dxm</Breadcrumb.Item>
          <Breadcrumb.Item>Personal Spending</Breadcrumb.Item>
        </Breadcrumb> */}
        <Row gutter={[16, 16]} justify="start">
          <Col span={24}>
            <Button type="primary" icon={<DiffOutlined />} danger style={{ position: "absolute", right: 0, bottom: 0 }} onClick={toggleModal}>Thêm hóa đơn chi tiêu</Button>

            <DatePicker.RangePicker status="warning" style={{ position: "relative", left: 0, overflow: "hidden" }} defaultValue={[dayjs(currentDate, dateFormat), dayjs(currentDate, dateFormat)]} />

          </Col>
          <Col>
            <Table columns={columns} dataSource={data} style={{ position: "relative" }} scroll={{
              x: 1500,
              y: 300,
            }} />
          </Col>

        </Row>
      </Content>
      <NewBillSpending open={open} setOpen={setOpen} />
      <ViewEditBillSpending openEdit={openEdit} setOpenEdit={setOpenEdit} />
    </>
  )
}

export default PersonalSpending