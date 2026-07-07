import React, { useState } from 'react';
import { Search, ToggleLeft, ShieldAlert, Award } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchInput } from '@/components/ui/SearchInput';
import { ADMIN_USERS } from '@/constants/dummy-data';
import type { AdminUser } from '@/types';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS);
  const [search, setSearch] = useState('');

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          const nextStatus = u.status === 'active' ? 'inactive' : 'active';
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleVerify = (id: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return { ...u, isVerified: true };
        }
        return u;
      })
    );
  };

  const filtered = users.filter((u) => u.fullName.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      header: 'User details',
      accessor: (row: AdminUser) => (
        <div className="flex items-center gap-3">
          <img src={row.avatar} alt={row.fullName} className="h-8 w-8 rounded-full object-cover border" />
          <div>
            <p className="text-xs font-bold text-gray-900 dark:text-white">{row.fullName}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Workspace Role',
      accessor: (row: AdminUser) => (
        <Badge variant={row.role === 'learner' ? 'neutral' : 'primary'} size="sm" className="capitalize">
          {row.role}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessor: (row: AdminUser) => (
        <Badge variant={row.status === 'active' ? 'success' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Verified',
      accessor: (row: AdminUser) => (
        <Badge variant={row.isVerified ? 'primary' : 'neutral'}>
          {row.isVerified ? 'Verified' : 'Pending'}
        </Badge>
      ),
    },
    {
      header: 'Sessions',
      accessor: (row: AdminUser) => row.sessionsCount,
    },
    {
      header: 'Spent/Earned',
      accessor: (row: AdminUser) => <span>${row.totalSpent}</span>,
    },
    {
      header: 'Actions',
      accessor: (row: AdminUser) => (
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
            {row.status === 'active' ? 'Block' : 'Unblock'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead title="Admin Users Management" description="Manage learners and toggle status metrics." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
            Users Management
          </h2>
          <p className="text-xs text-gray-505 dark:text-gray-400 mt-1">
            Browse registered platform learners and update verification credentials.
          </p>
        </div>
        <div className="w-full sm:w-64 shrink-0">
          <SearchInput value={search} onChange={setSearch} placeholder="Search users by name..." />
        </div>
      </div>

      <Table columns={columns} data={filtered} keyExtractor={(row) => row.id} />
    </>
  );
};
export default AdminUsers;
