// src/components/dashboard/StatsCard.js
'use client';

import { Card, Statistic } from 'antd';

export default function StatsCard({
  title,
  value,
  prefix,
  suffix,
  precision,
  valueStyle,
  loading = false,
  trend,
  trendValue
}) {
  return (
    <Card
      loading={loading}
      className="shadow-sm hover:shadow-md transition-shadow"
      styles={{ body: { padding: '24px' } }}
    >
      <Statistic
        title={<span className="text-gray-600 text-sm font-medium">{title}</span>}
        value={value}
        prefix={prefix}
        suffix={suffix}
        precision={precision}
        valueStyle={{
          fontSize: '28px',
          fontWeight: 'bold',
          ...valueStyle
        }}
      />

      {trend && (
        <div className="flex items-center mt-2">
          <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '↗' : '↘'} {trendValue}
          </span>
          <span className="text-gray-500 text-sm ml-1">so với tháng trước</span>
        </div>
      )}
    </Card>
  );
}