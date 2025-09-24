// src/components/layout/Sidebar.js
'use client';

import { Layout, Menu } from 'antd';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  DashboardOutlined,
  AppstoreOutlined,
  ApiOutlined,
  HeartOutlined,
  TeamOutlined,
  CustomerServiceOutlined,
  SettingOutlined,
  PlayCircleOutlined,
  CodeOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

// Static menu items to avoid re-renders
const menuItems = [
  {
    key: '/dashboard',
    icon: <AppstoreOutlined />,
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    key: '/workflow-automation',
    icon: <CodeOutlined />,
    label: 'Workflow Automation',
    href: '/workflow-automation'
  },
  {
    key: '/my-aw',
    icon: <CodeOutlined />,
    label: 'My AW',
    href: '/my-aw'
  },
  {
    key: '/favorite',
    icon: <CodeOutlined />,
    label: 'Favorite',
    href: '/favorite'
  },
  {
    key: '/server',
    icon: <CodeOutlined />,
    label: 'Server',
    href: '/server'
  },
  {
    key: '/community',
    icon: <CodeOutlined />,
    label: 'Community',
    href: '/community'
  },
  {
    key: '/support',
    icon: <CodeOutlined />,
    label: 'Support',
    href: '/support'
  },
  {
    key: '/settings',
    icon: <CodeOutlined />,
    label: 'Setting',
    href: '/settings'
  },
];

export default function Sidebar({ collapsed, onCollapse }) {
  const pathname = usePathname();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={320}
      collapsedWidth={80}
      style={{
        // background: 'linear-gradient(180deg, #4fd1c7 0%, #2dd4bf 100%)',
        background: '#2B8279',
        boxShadow: '2px 0 8px rgba(77, 72, 72, 0.1)'
      }}
    >
      {/* Logo */}
      <div className="flex items-center p-4">
        <Image src="/images/mikotech-logo.png" alt="Logo" width={500} height={100} />
      </div>

      {/* Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        items={menuItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: <Link  href={item.href}>{item.label}</Link>
        }))}
        style={{
          background: '#2b8279',
          border: 'none',
          marginTop: '20px'
        }}
        className="dashboard-sidebar-menu"
      />
    </Sider>
  );
}