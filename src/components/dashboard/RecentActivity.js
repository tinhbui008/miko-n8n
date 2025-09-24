// src/components/dashboard/RecentActivity.js
'use client';

import { Card, List, Avatar, Tag } from 'antd';

export default function RecentActivity({ activities, loading = false }) {
  return (
    <Card
      title="Hoạt động gần đây"
      loading={loading}
      className="h-full shadow-sm"
      styles={{ body: { padding: '24px' } }}
    >
      <List
        itemLayout="horizontal"
        dataSource={activities}
        renderItem={item => (
          <List.Item className="border-none py-3">
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={item.icon}
                  style={{ backgroundColor: item.color }}
                  size="default"
                />
              }
              title={
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">
                    {item.title}
                  </span>
                  <Tag color={item.status === 'success' ? 'green' : item.status === 'error' ? 'red' : 'blue'} size="small">
                    {item.status}
                  </Tag>
                </div>
              }
              description={
                <div>
                  <p className="text-xs text-gray-600 mb-1">{item.description}</p>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}