// src/app/(dashboard)/layout.js
import ClientWrapper from '@/components/ClientWrapper';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function DashboardGroupLayout({ children }) {
  return (
    <ClientWrapper>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ClientWrapper>
  );
}