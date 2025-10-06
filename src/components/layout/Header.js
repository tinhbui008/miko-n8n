// src/components/layout/Header.js
'use client';

import { Layout, Breadcrumb, Input, Badge, Avatar, Button, Dropdown, message } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
  SearchOutlined,
  EllipsisOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

const { Header: AntHeader } = Layout;
import React, { useState, useEffect } from 'react';


export default function Header({ collapsed, onToggle }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // No need to pass token - HttpOnly cookies are sent automatically
        const response = await fetch('/api/auth/me', {
          credentials: 'include' // Important: Include cookies in request
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setLoginUser(data.user);
          }
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // Logout function - Call API to clear cookies and redirect
  const handleLogout = async () => {
    try {
      // Call logout API - cookies are sent automatically
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include' // Important: Include cookies in request
      });

      // Clear user info from localStorage (non-sensitive data)
      localStorage.removeItem('user');

      message.success('Đăng xuất thành công!');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);

      // Clear localStorage anyway
      localStorage.removeItem('user');

      message.success('Đăng xuất thành công!');
      router.push('/login');
    }
  };

  // User menu items
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin cá nhân',
      onClick: () => router.push('/settings/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
      onClick: () => router.push('/settings')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
      danger: true
    }
  ];

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
      className="bg-white px-6 flex items-center justify-between"
      style={{ height: '60px', backgroundColor: '#ffffff' }}
    >
      <div className="flex items-center">
        <Breadcrumb
          items={getBreadcrumbItems()}
          className="font-semibold text-gray-600"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Badge count={3} size="small">
          <BellOutlined className="text-xl text-gray-600 cursor-pointer bg-gray-200 rounded-full p-2" />
        </Badge>

        <div className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors m-1">
          <Avatar
            icon={<UserOutlined />}
            size="large"
            src={loginUser?.avatar || "/images/avatar.jpg"}
            style={{ backgroundColor: '#4fd1c7', marginRight: '10px' }}
          />
          <span className="text-xs ml-2">
            Hello
            <br />
            <span className="text-sm text-b-500 font-semibold">
              {loginUser?.name || 'Guest'}
            </span>
          </span>

          <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
            <Button type="text" icon={<EllipsisOutlined />} style={{ rotate: '90deg' }} />
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
}