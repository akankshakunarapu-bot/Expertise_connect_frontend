import React from 'react';
import { CreditCard, DollarSign, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { TRANSACTIONS } from '@/constants/dummy-data';
import type { Transaction } from '@/types';

export const TransactionHistory: React.FC = () => {
  const columns = [
    {
      header: 'Description',
      accessor: (row: Transaction) => (
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
            row.type === 'payment' ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-500' : 'bg-red-50 dark:bg-red-950/20 text-red-500'
          }`}>
            {row.type === 'payment' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          </div>
          <div>
            <p className="text-xs font-bold text-gray-905 dark:text-gray-200">{row.description}</p>
            <p className="text-[10px] text-gray-500 mt-0.5 capitalize">{row.method} Payment</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Amount',
      accessor: (row: Transaction) => (
        <span className={`font-bold text-xs ${row.type === 'refund' ? 'text-red-505' : 'text-gray-900 dark:text-white'}`}>
          {row.type === 'refund' ? '-' : ''}{formatCurrency(row.amount, row.currency)}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: (row: Transaction) => (
        <span className="text-xs text-gray-500">{formatDate(row.date)}</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: Transaction) => (
        <Badge variant={row.status === 'success' ? 'success' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Invoice',
      accessor: (row: Transaction) => (
        <button className="rounded-lg p-1.5 border border-gray-200 dark:border-dark-700 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none">
          <Download className="w-4.5 h-4.5" />
        </button>
      ),
    },
  ];

  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <CreditCard className="w-4.5 h-4.5 text-gray-500" /> Transaction History
      </h3>
      <Table
        columns={columns}
        data={TRANSACTIONS}
        keyExtractor={(row) => row.id}
      />
    </Card>
  );
};
export default TransactionHistory;
