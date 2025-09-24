// src/data/dashboardData.js
import { 
  PlayCircleOutlined,
  CheckCircleOutlined,
  ApiOutlined,
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';

export const dashboardStats = [
  {
    title: 'Active Workflows',
    value: 24,
    prefix: <PlayCircleOutlined />,
    valueStyle: { color: '#4fd1c7' },
    trend: 'up',
    trendValue: '+12%'
  },
  {
    title: 'Total Executions',
    value: 1482,
    prefix: <CheckCircleOutlined />,
    valueStyle: { color: '#52c41a' },
    trend: 'up',
    trendValue: '+23%'
  },
  {
    title: 'Success Rate',
    value: 98.5,
    suffix: '%',
    precision: 1,
    valueStyle: { color: '#1890ff' },
    trend: 'up',
    trendValue: '+2.1%'
  },
  {
    title: 'API Calls',
    value: 15678,
    prefix: <ApiOutlined />,
    valueStyle: { color: '#722ed1' },
    trend: 'down',
    trendValue: '-5%'
  }
];

export const recentActivities = [
  {
    title: 'Email Campaign workflow completed',
    description: 'Successfully sent 150 emails to subscribers',
    time: '2 phút trước',
    icon: <CheckCircleOutlined />,
    color: '#52c41a',
    status: 'success'
  },
  {
    title: 'New user registered',
    description: 'john.doe@example.com joined the platform',
    time: '15 phút trước',
    icon: <UserOutlined />,
    color: '#1890ff',
    status: 'info'
  },
  {
    title: 'Data Sync workflow started',
    description: 'Syncing customer data from CRM',
    time: '1 giờ trước',
    icon: <PlayCircleOutlined />,
    color: '#fa8c16',
    status: 'running'
  },
  {
    title: 'API endpoint error',
    description: 'Weather API returned 429 error',
    time: '2 giờ trước',
    icon: <ApiOutlined />,
    color: '#f5222d',
    status: 'error'
  }
];