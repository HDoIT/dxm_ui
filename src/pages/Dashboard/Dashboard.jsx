import React, { useEffect, useState } from 'react'
import { Line, Liquid } from '@ant-design/plots';
import { Breadcrumb, Card, Col, Layout, Row, Space, Statistic, Table, Tag, theme } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { MetaData } from '../../components/Layout/MetaData';

const columns = [
  {
    title: 'Khoản chi tiêu',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow',
          },
          {
            text: 'Pink',
            value: 'Pink',
          },
        ],
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          {
            text: 'Green',
            value: 'Green',
          },
          {
            text: 'Black',
            value: 'Black',
          },
        ],
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.name.includes(value),
    width: '30%',
  },
  {
    title: 'Chi phí',
    dataIndex: 'expense',
    sorter: (a, b) => a.expense - b.expense,
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '40%',
  },
];


const dataTable = [
  {
    key: '1',
    name: 'Mua cơm trưa',
    expense: 32000,
    note: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Mua cơm tối',
    expense: 50000,
    note: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '6',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '7',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '8',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '9',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '10',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '11',
    name: 'Chơi bi-a',
    expense: 70000,
    note: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },

];
const { Header, Content, Footer, Sider } = Layout;
function Dashboard() {
  const [data, setData] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState("Dashboard");


  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const configLine = {
    data,
    xField: 'date',
    yField: 'value',
    colorField: 'type',
    axis: {
      y: {
        labelFormatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    scale: { color: { range: ['#30BF78', '#F4664A', '#FAAD14'] } },
    style: {
      lineWidth: 2,
      lineDash: (data) => {
        if (data[0].type === 'register') return [4, 4];
      },
      opacity: (data) => {
        if (data[0].type !== 'register') return 0.5;
      },
    },
    title: "Chi tiêu từng ngày"
  };

  const configLiquid = {
    percent: 0.3,
    width: 280,
    style: {
      backgroundFill: 'pink',
    },
    title: "Ngân sách còn lại trong tháng"
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const itemsBreadCums = [
    { title: 'Dxm', path: '/' },
    { title: 'Dashboard', path: '/dashboard' },
  ];
  // const location = useLocation();
  // const pathnames = location.pathname.split('/').filter((x) => x);
  // const breadcrumbItems = [
  //   { title: 'Home', path: '/' },
  //   ...pathnames.map((name, index) => {
  //     const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
  //     return { title: name.charAt(0).toUpperCase() + name.slice(1), path: routeTo };
  //   }),
  // ];
  return (
    <>
      <MetaData title="DXM - Dashboard"></MetaData>
      <Content
      // style={{margin: "0 16px"}}
      // style={{ margin: '24px 16px 0 266px', overflow: 'initial' }}
      // style={{ margin: '1% 1% 4% 14%', overflow: 'initial' }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
          items={itemsBreadCums} />
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row gutter={[16, 48]} justify="start">
            <Col span={6}>
              <Card bordered={false} hoverable style={{ backgroundImage: "linear-gradient(to bottom right, #5761B2, #1FC5A8)" }}>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} hoverable style={{ backgroundImage: "linear-gradient(to bottom right, #FDABDD, #374A5A)" }}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false} hoverable style={{ backgroundImage: "linear-gradient(to bottom right, #FD8451, #FFBD6F)" }}>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={true} hoverable style={{ backgroundImage: "linear-gradient(to bottom right, #72FFB6, #10D164)" }}>
                <Statistic
                  title="Idle"
                  value={9.3}
                  precision={2}
                  valueStyle={{ color: '#cf1322' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={16}>
              <Line {...configLine} />
            </Col>
            <Col span={8} style={{ textAlign: "center" }}>
              <Liquid {...configLiquid} />
            </Col>

            <Col span={24}>
              <h3>Hạng mục chi tiêu</h3>
              <Table columns={columns} dataSource={dataTable} onChange={onChange} scroll={{
                x: 1500,
                y: 300,
              }} />
            </Col>

          </Row>

        </div>
      </Content>
    </>
  )
}

export default Dashboard