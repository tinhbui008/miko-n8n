// src/components/dashboard/DashboardContent.js
'use client';

import { Row, Col } from 'antd';
import PageHeader from '@/components/common/PageHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import PerformanceChart from '@/components/dashboard/PerformanceChart';
import { dashboardStats, recentActivities } from '@/data/dashboardData';

export default function DashboardContent() {
  return (
    <div>
      {/* <PageHeader 
        title="Dashboard Overview"
        subtitle="Tổng quan hệ thống automation và workflow"
      /> */}

      {/* Stats Cards */}
      {/* <Row gutter={[24, 24]} className="mb-8">
        {dashboardStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatsCard {...stat} />
          </Col>
        ))}
      </Row> */}

      {/* Charts and Activities */}
      {/* <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <PerformanceChart />
        </Col>
        <Col xs={24} lg={8}>
          <RecentActivity activities={recentActivities} />
        </Col>
      </Row> */}
    </div>
  );
}