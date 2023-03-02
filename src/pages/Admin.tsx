import useRequest, { OrderStatus } from '@/hooks/useRequest';
import { Button, message, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import testImage from '@/assets/images/bg.png'

export default () => {
  const { operateBatchQuery } = useRequest()
  const fmtAdds = (str: any) => `${str.toString().slice(0, 6)}...${str.toString().slice(str.toString().length - 4)}`
  const columns: ColumnsType<API.order.entry> = [
    {title: 'ID', dataIndex: 'id', render: value => <span title={value}>{fmtAdds(value)}</span>},
    {title: 'ownerAddress', dataIndex: 'ownerAddress', render: value => <span title={value}>{fmtAdds(value)}</span>},
    {title: 'receiveAddress', dataIndex: 'receiveAddress', render: value => <span title={value}>{fmtAdds(value)}</span>},
    {title: 'payAddress', dataIndex: 'payAddress', render: value => <span title={value}>{fmtAdds(value)}</span>},
    {title: 'payCount', dataIndex: 'value'},
    {title: 'botOrderId', dataIndex: 'botOrderId', render: value => <span title={value}>{fmtAdds(value)}</span>},
    // {title: 'updateTime', dataIndex: 'updateTime', render: value => new Date(value)},
    // {title: 'createTime', dataIndex: 'createTime', render: value => new Date(value)},
    {title: 'operator', render(value, record, index) {
      return <div>
        <Button type='primary'>refresh</Button>
        <Button color='red'>Get Image</Button>
      </div>
    }}
    // { title: 'Name', dataIndex: 'name', key: 'name', render: (text) => <a>{text}</a> },
    // { title: 'Age', dataIndex: 'age', key: 'age' },
    // { title: 'Address', dataIndex: 'address', key: 'address' },
    // { title: 'Tags', key: 'tags', dataIndex: 'tags', render: (_, { tags }) => <>{
    //     tags.map((tag: any) => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') color = 'volcano';
    //       return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>
    //     })
    //   }</>
    // },
    // { title: 'Action', key: 'action', render: (_, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //     <a>Delete</a>
    //   </Space>
    // )},
  ];
  const [params, setParams] = useState<API.order.dto.batchQueryDto>({
    size: 10000,
    status: undefined
  })
  const [data, setData] = useState<API.order.entry[]>([])
  const [lock, setLock] = useState(true)

  const hooks = {
    query: async () => {
      try {
        message.loading('requesting...', 0)
        const res = await operateBatchQuery(params)
        setData([...res.data])

        message.destroy()
      } catch (error) {
        console.log(error);

        return setData(new Array(100).fill({
          /** 订单id */
          id: 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw',
          /** 创建时间 */
          createTime: Date.now(),
          /** 更新时间 */
          updateTime: Date.now(),
          /** 购买数量 */
          num: 1,
          /**  付款人地址 */
          ownerAddress: 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw',
          /**  用户nft收款地址 */
          receiveAddress: 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw',
          /**  平台收款地址 */
          payAddress: 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw',
          /**  取值：Economy, Normal, Faster  */
          feeLevel: 'Faster',
          /** 付款金额 */
          value: 0.0009,
          /** 机器人订单id */
          botOrderId: 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw',
          /** nft信息 */
          nftInfoList: [{
            /** 图片大图 */
            contentUrl: testImage,
            /** 图片编号 */
            imgId: '003',
            /** 铭文 */
            inscription: 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw',
            /** 铭文hash */
            inscriptionHash: 'bc1qxeh9rjlspyz6hdkdetsxkeuc3cfs2tr4j06exw',
          }]
      }))
      }
    }
  }

  useEffect(() => {
    const key = 'B582CD7763FA264B8B72FC378C226AEC'
    const sk = '3F50A0539C7E6CE421B715161612ECFD'.split('').reverse().join('')

    // window.localStorage.setItem('B582CD7763FA264B8B72FC378C226AEC', 'DFCE216161517B124EC6E7C9350A05F3')

    if (window.localStorage.getItem(key) === sk) {
      setLock(false)
      hooks.query()
    }
  }, [])

  return !lock ? <div className="admin">
    <h1 className="title">Order Statistics</h1>

    <div className="filter">
      <div className="row">
        <Select
          style={{width: '200px'}}
          value={params.status}
          placeholder='Order Status...'
          options={[
            {label: 'INTI', value: OrderStatus.INTI},
            {label: 'PAID', value: OrderStatus.PAID},
            {label: 'EXECUTING', value: OrderStatus.EXECUTING},
            {label: 'SUCCESS', value: OrderStatus.SUCCESS},
            {label: 'FAILED', value: OrderStatus.FAILED},
          ]}
        />
      </div>

      <Button type='primary' onClick={hooks.query}>refresh</Button>
    </div>

    <Table
      className='table'
      columns={columns}
      dataSource={data}
    />
  </div> : <></>
};
