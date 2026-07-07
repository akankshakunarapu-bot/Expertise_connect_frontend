import React, { useState } from 'react';
import { ShieldCheck, ToggleLeft, Award } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { StarRating } from '@/components/ui/StarRating';
import { ADMIN_EXPERTS } from '@/constants/dummy-data';
import type { AdminExpert } from '@/types';

export const AdminExperts: React.FC = () => {
  const [experts, setExperts] = useState<AdminExpert[]>(ADMIN_EXPERTS);
  const [search, setSearch] = useState('');

  const handleToggleStatus = (id: string) => {
    setExperts(
      experts.map((e) => {
        if (e.id === id) {
          const nextStatus = e.status === 'active' ? 'inactive' : 'active';
          return { ...e, status: nextStatus };
        }
        return e;
      })
    );
  };

  const handleVerify = (id: string) => {
    setExperts(
      experts.map((e) => {
        if (e.id === id) {
          return { ...e, isVerified: true };
        }
        return e;
      })
    );
  };

  const filtered = experts.filter((e) => e.fullName.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      header: 'Expert details',
      accessor: (row: AdminExpert) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.fullName} className="h-8 w-8 rounded-full object-cover border" />
          <div>
            <p className="text-xs font-bold text-gray-905 dark:text-white">{row.fullName}</p>
            <p className="text-[9px] text-gray-500 mt-0.5 truncate max-w-[150px]">{row.title}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Rating',
      accessor: (row: AdminExpert) => (
        <div className="flex items-center gap-1">
          <StarRating rating={row.rating} max={5} interactive={false} size={11} />
          <span className="text-[10px] text-gray-400 font-bold">({row.rating})</span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessor: (row: AdminExpert) => (
        <Badge variant={row.status === 'active' ? 'success' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Verified',
      accessor: (row: AdminExpert) => (
        <Badge variant={row.isVerified ? 'primary' : 'neutral'}>
          {row.isVerified ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      header: 'Sessions',
      accessor: (row: AdminExpert) => row.totalSessions,
    },
    {
      header: 'Total Earnings',
      accessor: (row: AdminExpert) => <span className="font-bold text-xs">${row.totalEarnings.toLocaleString()}</span>,
    },
    {
      header: 'Actions',
      accessor: (row: AdminExpert) => (
        <div className="flex gap-2">
          {!row.isVerified && (
            <Button variant="outline" size="sm" onClick={() => handleVerify(row.id)}>
              Verify
            </Button>
          )}
          <Button
            variant={row.status === 'active' ? 'danger' : 'outline'}
            size="sm"
            onClick={() => handleToggleStatus(row.id)}
          >
            {row.status === 'active' ? 'Suspend' : 'Activate'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead title="Admin Experts Management" description="Manage verification credentials for platform experts." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
            Experts Management
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Moderate registered tech mentors, review star ratings, and toggle status.
          </p>
        </div>
        <div className="w-full sm:w-64 shrink-0">
          <SearchInput value={search} onChange={setSearch} placeholder="Search experts by name..." />
        </div>
      </div>

      <Table columns={columns} data={filtered} keyExtractor={(row) => row.id} />
    </>
  );
};
export default AdminExperts;
