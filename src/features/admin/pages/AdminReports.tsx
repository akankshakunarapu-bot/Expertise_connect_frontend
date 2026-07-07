import React, { useState } from 'react';
import { FileText, Download, Play, Calendar } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export const AdminReports: React.FC = () => {
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('month');
  const [reports, setReports] = useState([
    { id: '1', name: 'Gross Revenue Summary July 2026.pdf', type: 'Revenue', size: '1.2 MB', date: '2026-07-07' },
    { id: '2', name: 'Learners Growth Breakdown Q2.csv', type: 'Growth', size: '204 KB', date: '2026-07-01' },
  ]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const added = {
      id: `rep-${Date.now()}`,
      name: `System_${reportType}_report_${dateRange}_${new Date().toISOString().slice(0,10)}.pdf`,
      type: reportType.charAt(0).toUpperCase() + reportType.slice(1),
      size: '1.5 MB',
      date: new Date().toISOString().slice(0, 10),
    };
    setReports([added, ...reports]);
  };

  return (
    <>
      <SEOHead title="System Reports" description="Generate system growth and transaction report logs." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          System Reports Workspace
        </h2>
        <p className="text-xs text-gray-505 dark:text-gray-400 mt-1">
          Generate, compile, and download system datalogs and transaction reports.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start select-none">
        {/* Parameters selector */}
        <Card className="lg:col-span-1">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Play className="w-4.5 h-4.5 text-gray-500" /> Generate Report
          </h3>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-350 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500 text-gray-905 dark:text-white font-semibold"
              >
                <option value="revenue">Gross Revenue Ledger</option>
                <option value="users">Learners Registrations</option>
                <option value="sessions">Mentoring Sessions Log</option>
                <option value="expertPayouts">Expert Mentor Payouts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                Date Range
              </label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-350 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500 text-gray-905 dark:text-white font-semibold"
              >
                <option value="week">Past 7 Days</option>
                <option value="month">Current Month</option>
                <option value="quarter">Current Quarter (Q3)</option>
                <option value="year">Current Fiscal Year</option>
              </select>
            </div>

            <Button type="submit" variant="primary" fullWidth size="lg" className="mt-4">
              Compile Report Datalogs
            </Button>
          </form>
        </Card>

        {/* Generated list */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-4.5 h-4.5 text-gray-550" /> Compiled Reports
          </h3>
          <div className="space-y-4">
            {reports.map((rep) => (
              <Card key={rep.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gray-50 dark:bg-dark-900 flex items-center justify-center text-gray-400">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-250 truncate max-w-[200px] sm:max-w-none">
                      {rep.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                      Type: {rep.type} &bull; Size: {rep.size} &bull; Created: {rep.date}
                    </p>
                  </div>
                </div>
                <button className="p-2 border border-gray-200 dark:border-dark-700 rounded-xl text-gray-400 hover:text-primary-655 dark:hover:text-primary-400 transition-colors focus:outline-none shrink-0">
                  <Download className="w-4 h-4" />
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminReports;
