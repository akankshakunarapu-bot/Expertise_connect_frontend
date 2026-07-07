import React from 'react';
import { CreditCard } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ADMIN_PAYMENTS } from '@/constants/dummy-data';
import type { AdminPayment } from '@/types';

export const AdminPayments: React.FC = () => {
  const columns = [
    {
      header: 'Transaction ID',
      accessor: (row: AdminPayment) => <span className="font-mono text-xs">{row.transactionId}</span>,
    },
    {
      header: 'User',
      accessor: (row: AdminPayment) => row.userName,
    },
    {
      header: 'Expert',
      accessor: (row: AdminPayment) => row.expertName,
    },
    {
      header: 'Gross Amount',
      accessor: (row: AdminPayment) => <span className="font-bold text-xs">${row.amount}</span>,
    },
    {
      header: 'Platform Fee',
      accessor: (row: AdminPayment) => <span className="text-xs text-indigo-650">${row.platformFee}</span>,
    },
    {
      header: 'Expert Payout',
      accessor: (row: AdminPayment) => <span className="text-xs text-emerald-600 font-semibold">${row.expertPayout}</span>,
    },
    {
      header: 'Method',
      accessor: (row: AdminPayment) => row.method,
    },
    {
      header: 'Status',
      accessor: (row: AdminPayment) => (
        <Badge variant={row.status === 'success' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <SEOHead title="Admin Payments Checkout" description="Review all billing ledger transaction records." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Payments Ledger
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Review system payouts, credit conversions, and processing fees.
        </p>
      </div>

      <Table columns={columns} data={ADMIN_PAYMENTS} keyExtractor={(row) => row.id} />
    </>
  );
};
export default AdminPayments;
