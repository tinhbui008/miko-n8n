// src/data/sampleData.js
import {
    MailOutlined,
    FileTextOutlined,
    SendOutlined,
    FacebookOutlined,
    CheckCircleOutlined, ApiOutlined, PlayCircleOutlined
} from '@ant-design/icons';

export const sampleProducts = Array(12).fill().map((_, i) => ({
    id: i + 1,
    title: 'Đăng bài lên Facebook',
    description: 'AI tự động gửi thiết kế xuất hiện lên các nền tảng mạng xã hội, công khai khách hàng mơi muối nhưng áo khoác',
    price: '99.000 ₫',
    rating: 4.8,
    author: 'Xem Thêm',
    icons: [
        { component: <MailOutlined />, color: '#ea4335' },
        { component: <FileTextOutlined />, color: '#34a853' },
        { component: <SendOutlined />, color: '#4285f4' },
        { component: <FacebookOutlined />, color: '#1877f2' },
    ]
}));

export const sampleActivities = [
    {
        title: 'Workflow "Email Campaign" executed successfully',
        description: '2 minutes ago',
        icon: <CheckCircleOutlined />,
        color: '#52c41a'
    },
    {
        title: 'New API integration added',
        description: '1 hour ago',
        icon: <ApiOutlined />,
        color: '#1890ff'
    },
    {
        title: 'Workflow "Data Sync" started',
        description: '3 hours ago',
        icon: <PlayCircleOutlined />,
        color: '#fa8c16'
    }
];