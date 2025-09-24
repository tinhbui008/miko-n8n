// src/app/(dashboard)/dashboard/page.js
import { Suspense } from 'react';
import DashboardContent from '@/components/dashboard/DashboardContent';

function DashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>
      <div className="grid grid-cols-4 gap-6">
        {Array(4).fill().map((_, i) => (
          <div key={i} className="h-32 bg-white rounded-lg shadow animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}