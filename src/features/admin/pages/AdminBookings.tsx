import React from 'react';
import { Calendar } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ADMIN_BOOKINGS } from '@/constants/dummy-data';
import type { AdminBooking } from '@/types';

export const AdminBookings: React.FC = () => {
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
      header: 'Date & Time',
      accessor: (row: AdminBooking) => <span className="text-xs">{row.date}</span>,
    },
    {
      header: 'Duration',
      accessor: (row: AdminBooking) => <span className="text-xs">{row.duration} mins</span>,
    },
    {
      header: 'Gross Price',
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
      <SEOHead title="Admin Bookings Log" description="Review all learner-expert session booking logs." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Bookings Management
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Review details on session scheduling, durations, and booking status states.
        </p>
      </div>

      <Table columns={columns} data={ADMIN_BOOKINGS} keyExtractor={(row) => row.id} />
    </>
  );
};
export default AdminBookings;
