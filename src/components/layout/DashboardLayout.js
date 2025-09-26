// src/components/layout/DashboardLayout.js
'use client';

import { Layout, Flex, Radio, Space, Row, Col, Card } from 'antd';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import FilterWorkflow from '../common/FilterWorkflow';
import { sampleProducts } from '@/data/sampleData';
import WorkflowCard from '../card/WorkflowCard';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterTabs = [
    {
      key: 'all',
      label: 'All',
    },
    {
      key: 'social',
      label: 'Social',
    },
    {
      key: 'marketing',
      label: 'Marketing',
    },
    {
      key: 'video',
      label: 'Video',
    },
    {
      key: 'image',
      label: 'Image',
    }
  ];


  const cards = [
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    },
    {
      title: 'Workflow 1',
      description: 'Description 1',
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
    }
  ]

  const handleTabChange = (key) => {
    setActiveTab(key);
    console.log('Tab changed:', key);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log('Search:', value);
  };

  // Filter products based on tab and search
  const filteredProducts = sampleProducts.filter(product => {
    const matchesTab = activeTab === 'all' || product.category === activeTab;
    const matchesSearch = !searchTerm ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side skeleton
  if (!mounted) {
    return (
      <div className="min-h-screen flex">
        {/* Sidebar Skeleton */}
        <div className="w-280 bg-gradient-to-b from-teal-400 to-teal-500 flex-shrink-0">
          <div className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg mr-3"></div>
              <div className="w-24 h-5 bg-white/20 rounded"></div>
            </div>
          </div>
          <div className="px-4 space-y-2 mt-5">
            {Array(8).fill().map((_, i) => (
              <div key={i} className="h-12 bg-white/10 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 flex flex-col">
          <div className="h-16 bg-white border-b border-gray-200">
            <div className="px-6 h-full flex items-center justify-between">
              <div className="w-32 h-6 bg-gray-200 rounded"></div>
              <div className="flex items-center space-x-4">
                <div className="w-64 h-8 bg-gray-200 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-4 gap-6 mb-8">
                {Array(4).fill().map((_, i) => (
                  <div key={i} className="h-32 bg-white rounded-lg shadow"></div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div className="col-span-3 h-80 bg-white rounded-lg shadow"></div>
                <div className="h-80 bg-white rounded-lg shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout className="min-h-screen">
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <Header collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
        <FilterWorkflow
          tabs={filterTabs}
          defaultActiveKey="all"
          onTabChange={handleTabChange}
          onSearch={handleSearch}
          searchPlaceholder="Tìm kiếm ..." />

        <div style={{ marginLeft: '22px', marginRight: '20px' }}>
          <Flex wrap="wrap" align="center" justify="space-between" gap="middle">
            {cards.map((card, index) => (
              <WorkflowCard key={index} {...card} />
            ))}
          </Flex>
        </div>
      </Layout>
    </Layout>
  );
}