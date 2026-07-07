import React, { useState } from 'react';
import { Plus, Check, Laptop } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ADMIN_TECHNOLOGIES } from '@/constants/dummy-data';
import type { AdminTechnology } from '@/types';

export const AdminTechnologies: React.FC = () => {
  const [techs, setTechs] = useState<AdminTechnology[]>(ADMIN_TECHNOLOGIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTechName, setNewTechName] = useState('');
  const [newTechCategory, setNewTechCategory] = useState('Frontend');

  const handleAddTech = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTechName.trim()) {
      const added: AdminTechnology = {
        id: `tech-${Date.now()}`,
        name: newTechName,
        slug: newTechName.toLowerCase().replace(/\s+/g, '-'),
        category: newTechCategory,
        expertCount: 0,
        sessionCount: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      setTechs([added, ...techs]);
      setIsModalOpen(false);
      setNewTechName('');
    }
  };

  const columns = [
    {
      header: 'Name',
      accessor: (row: AdminTechnology) => (
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gray-50 dark:bg-dark-900 flex items-center justify-center font-bold text-xs select-none">
            {row.name.charAt(0)}
          </div>
          <span className="font-bold text-xs text-gray-905 dark:text-gray-200">{row.name}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: (row: AdminTechnology) => row.category,
    },
    {
      header: 'Expert Mentors',
      accessor: (row: AdminTechnology) => row.expertCount,
    },
    {
      header: 'Completed Sessions',
      accessor: (row: AdminTechnology) => row.sessionCount,
    },
    {
      header: 'Status',
      accessor: (row: AdminTechnology) => (
        <Badge variant={row.status === 'active' ? 'success' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <SEOHead title="Admin Technologies Management" description="Manage listed technology languages and frameworks." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
            Technologies Management
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Maintain programming languages, categories, and review mentor counts.
          </p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Add Technology
        </Button>
      </div>

      <Table columns={columns} data={techs} keyExtractor={(row) => row.id} />

      {/* Add Tech Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Platform Technology">
        <form onSubmit={handleAddTech} className="space-y-5 select-none">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Technology Name
            </label>
            <input
              type="text"
              value={newTechName}
              onChange={(e) => setNewTechName(e.target.value)}
              placeholder="e.g. Flutter, Vue.js, Go..."
              className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500 text-gray-905 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Category
            </label>
            <select
              value={newTechCategory}
              onChange={(e) => setNewTechCategory(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500 text-gray-905 dark:text-white"
            >
              <option value="Frontend">Frontend Development</option>
              <option value="Backend">Backend Development</option>
              <option value="Mobile">Mobile Development</option>
              <option value="DevOps">DevOps & Infrastructure</option>
              <option value="Database">Database</option>
              <option value="AI/ML">AI & Machine Learning</option>
            </select>
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg" className="mt-4">
            Create Technology Listing
          </Button>
        </form>
      </Modal>
    </>
  );
};
export default AdminTechnologies;
