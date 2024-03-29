import { delArticleAPI, getArticleListAPI } from '@/apis/article'
import img404 from '@/assets/error.png'
import { useChannel } from '@/hooks/useChannel'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Breadcrumb, Button, Card, DatePicker, Form, Popconfirm, Radio, Select, Space, Table, Tag } from 'antd'
// 引入汉化包，让时间选择器显示中文
import locale from 'antd/es/date-picker/locale/zh_CN'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const { channelList } = useChannel()
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  const [reqData, setReqData] = useState({
    status: '',
    page: 1,
    per_page: 2
  })
  const navigate = useNavigate()
  useEffect(() => {
    async function getList() {
      const res = await getArticleListAPI(reqData)
      setList(res.data.data.results)
      setCount(res.data.data.total_count)
    }
    getList()
  }, [reqData])
  const status = [
    <Tag color="warning">等审核</Tag>,
    <Tag color="green">审核通过</Tag>
  ]
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data - 1]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => { navigate(`/publish?id=${data.id}`) }}
            />
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              onConfirm={() => { onConfirm(data) }}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  const onConfirm = async (data) => {
    await delArticleAPI(data.id)
    setReqData({ ...reqData })
  }
  const onFinish = (values) => {
    setReqData({
      ...reqData,
      channel_id: values.channel_id,
      status: values.status,
      begin_pubdate: values.data && values.data[0].format('YYYY-MM-DD'),
      end_pubdate: values.data && values.data[1].format('YYYY-MM-DD'),
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 180 }}
            >
              {channelList?.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          pagination={{
            total: count,
            pageSize: reqData.per_page,
            current: reqData.page,
            onChange: (e) => {
              setReqData({ ...reqData, page: e })
            }
          }}
        />
      </Card>
    </div>
  )
}

export default Article