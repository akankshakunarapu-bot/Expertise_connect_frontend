import React from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import {
  AdminStatsCards,
  RevenueChart,
  UserGrowthChart,
} from '../components/AdminWidgets';
import { ADMIN_BOOKINGS } from '@/constants/dummy-data';
import type { AdminBooking } from '@/types';

export const AdminDashboard: React.FC = () => {
  const columns = [
    {
      header: 'ID',
      accessor: (row: AdminBooking) => <span className="font-mono text-xs">{row.id}</span>,
    },
    {
      header: 'Learner',
      accessor: (row: AdminBooking) => row.learnerName,
    },
    {
      header: 'Expert',
      accessor: (row: AdminBooking) => row.expertName,
    },
    {
      header: 'Technology',
      accessor: (row: AdminBooking) => (
        <Badge variant="neutral" size="sm">
          {row.technology}
        </Badge>
      ),
    },
    {
      header: 'Amount',
      accessor: (row: AdminBooking) => <span className="font-bold text-xs">${row.amount}</span>,
    },
    {
      header: 'Status',
      accessor: (row: AdminBooking) => (
        <Badge variant={row.status === 'confirmed' ? 'success' : row.status === 'completed' ? 'neutral' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <SEOHead title="Admin Dashboard Overview" description="Manage learners, experts, transactions, and site analytics." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Dashboard Overview
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Monitor system metrics, platform statistics, and gross billing analytics.
        </p>
      </div>

      <div className="space-y-8">
        {/* Statistics Cards */}
        <AdminStatsCards />

        {/* Recharts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueChart />
          <UserGrowthChart />
        </div>

        {/* Recent Bookings Table */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 select-none">
            Recent System Bookings
          </h3>
          <Table
            columns={columns}
            data={ADMIN_BOOKINGS.slice(0, 5)}
            keyExtractor={(row) => row.id}
          />
        </div>
      </div>
    </>
  );
};
export default AdminDashboard;
