import { Button, QRCode, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect } from 'react';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default () => {
  const columns: ColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => <a>{text}</a> },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    { title: 'Tags', key: 'tags', dataIndex: 'tags', render: (_, { tags }) => <>{
        tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') color = 'volcano';
          return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>
        })
      }</>
    },
    { title: 'Action', key: 'action', render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )},
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  useEffect(() => {

  })

  return <div className="admin">
    <h1 className="title">Order Statistics</h1>

    <div className="filter">
      <div className="row"></div>

      <Button type='default'>refresh</Button>
    </div>
    <Table columns={columns} dataSource={data} />

    <QRCode value='8B0373A38D0EA55DAE7CADD5FC7FEA3C'></QRCode>
  </div>
};
