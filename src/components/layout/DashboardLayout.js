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

        {/* <Flex justify="space-around" gap="middle">
          {Array.from({ length: 4 }).map((_, i) => (
            <WorkflowCard key={i} {...cards[i]} />
          ))}
        </Flex> */}

        <div style={{ marginLeft: '22px', marginRight: '20px' }}>
          <Row gutter={[12, 12]}>
            <Col span={6}>
              <Card>
                <Flex style={{ overflow: 'hidden', flexWrap: 'nowrap', gap: '10px' }}>
                  <div style={{ padding: 10, border: '1px solid #ccc', flex: '0 0 50px' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                      <path fill="#1976d2" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                      <polygon fill="#8bc34a" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                      <path fill="#2196f3" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                      <path fill="#4caf50" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                    </svg>
                  </div>

                  <div style={{ padding: 10, border: '1px solid #ccc', flex: '0 0 50px' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                      <path fill="#1976d2" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                      <polygon fill="#8bc34a" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                      <path fill="#2196f3" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                      <path fill="#4caf50" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                    </svg>
                  </div>

                  <div style={{ padding: 10, border: '1px solid #ccc', flex: '0 0 50px' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                      <path fill="#1976d2" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                      <polygon fill="#8bc34a" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                      <path fill="#2196f3" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                      <path fill="#4caf50" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                    </svg>
                  </div>

                  <div style={{ padding: 10, border: '1px solid #ccc', flex: '0 0 50px' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                      <path fill="#1976d2" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                      <polygon fill="#8bc34a" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                      <path fill="#2196f3" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                      <path fill="#4caf50" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                    </svg>
                  </div>

                  <div style={{ padding: 10, border: '1px solid #ccc', flex: '0 0 50px' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                      <path fill="#1976d2" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                      <polygon fill="#8bc34a" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                      <path fill="#2196f3" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                      <path fill="#4caf50" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                    </svg>
                  </div>

                  <div style={{ padding: 10, border: '1px solid #ccc', flex: '0 0 50px' }}>
                    <svg
                      width='100%'
                      height='100%'
                      viewBox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
                      <path fill="#1976d2" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
                      <polygon fill="#8bc34a" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
                      <path fill="#2196f3" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
                      <path fill="#4caf50" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z" />
                    </svg>
                  </div>
                  
                </Flex>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                Card content
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                Card content
              </Card>
            </Col>
          </Row>
        </div>
      </Layout>
    </Layout>
  );
}