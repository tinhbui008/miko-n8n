// src/components/dashboard/PerformanceChart.js
'use client';

import { Card, Progress } from 'antd';

export default function PerformanceChart() {
  const metrics = [
    { label: 'CPU Usage', value: 45, color: '#4fd1c7' },
    { label: 'Memory Usage', value: 67, color: '#52c41a' },
    { label: 'Storage', value: 23, color: '#1890ff' },
    { label: 'Network', value: 34, color: '#722ed1' },
  ];

  return (
    <Card 
      title="Hiệu suất hệ thống"
      className="shadow-sm h-full"
      styles={{ body: { padding: '24px' } }}
    >
      <div className="space-y-6">
        {metrics.map((metric, index) => (
          <div key={index}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              <span className="text-sm font-semibold text-gray-900">{metric.value}%</span>
            </div>
            <Progress 
              percent={metric.value} 
              strokeColor={metric.color}
              showInfo={false}
              // strokeWidth={8}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-2">Tổng quan</div>
        <div className="text-lg font-semibold text-gray-900">Hệ thống hoạt động ổn định</div>
        <div className="text-sm text-green-600">Tất cả dịch vụ đang chạy bình thường</div>
      </div>
    </Card>
  );
}