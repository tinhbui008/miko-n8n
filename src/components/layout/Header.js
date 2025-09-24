// src/components/layout/Header.js
'use client';

import { Layout, Breadcrumb, Input, Badge, Avatar, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  EllipsisOutlined
} from '@ant-design/icons';
import { usePathname } from 'next/navigation';

const { Header: AntHeader } = Layout;
const { Search } = Input;

export default function Header({ collapsed, onToggle }) {
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbMap = {
      'dashboard': 'Dashboard',
      'marketplace': 'Marketplace',
      'workflow-automation': 'Workflow Automation',
      'my-api': 'My API',
      'favorites': 'Favorites',
      'community': 'Community',
      'support': 'Support',
      'settings': 'Settings'
    };

    return pathSegments.map(segment => ({
      title: breadcrumbMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    }));
  };

  return (
    <AntHeader
      className="bg-white px-6 flex items-center justify-between ml-6"
      style={{ height: '70px', backgroundColor: '#ffffff', marginTop: '20px' }}
    >
      <div className="flex items-center">
        <Breadcrumb
          items={getBreadcrumbItems()}
          className="text-lg font-semibold text-gray-800"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Badge count={3} size="small">
          <BellOutlined className="text-xl text-gray-600 cursor-pointer bg-gray-200 rounded-full p-2" />
        </Badge>

        <div className="flex items-center space-x-2 cursor-pointer px-3 py-2 rounded-lg transition-colors m-1">
          <Avatar
            icon={<UserOutlined />}
            size="large"
            src="/images/avatar.jpg"
            style={{ backgroundColor: '#4fd1c7', marginRight: '10px' }}
          />
          <span className="text-xs ml-2">
            Hello
            <br />
            <span className="text-sm text-gray-500">Tháng</span>
          </span>

          <Button type="text" icon={<EllipsisOutlined />} style={{ rotate: '90deg' }} />
        </div>
      </div>
    </AntHeader>
  );
}