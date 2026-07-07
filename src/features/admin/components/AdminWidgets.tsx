import React from 'react';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';
import { Users, Shield, Calendar, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/cards/StatCard';
import { REVENUE_DATA, USER_GROWTH_DATA } from '@/constants/dummy-data';

// ============================================================
// AdminStatsCards
// ============================================================

export const AdminStatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      <StatCard
        label="Total Learners"
        value="15,000"
        change={12.5}
        timeframe="vs last month"
        icon={<Users className="w-5 h-5" />}
      />
      <StatCard
        label="Active Experts"
        value="1,200"
        change={8.3}
        timeframe="vs last month"
        icon={<Shield className="w-5 h-5" />}
      />
      <StatCard
        label="Total Sessions Booked"
        value="45,000"
        change={18.3}
        timeframe="vs last month"
        icon={<Calendar className="w-5 h-5" />}
      />
      <StatCard
        label="Gross Revenue"
        value="$2,500,000"
        change={24.2}
        timeframe="vs last month"
        icon={<DollarSign className="w-5 h-5" />}
      />
    </div>
  );
};

// ============================================================
// RevenueChart
// ============================================================

export const RevenueChart: React.FC = () => {
  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center justify-between">
        Revenue Growth
        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5"><ArrowUpRight className="w-3.5 h-3.5" /> +24%</span>
      </h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-dark-700/50" />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: '#334155',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '11px',
              }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

// ============================================================
// UserGrowthChart
// ============================================================

export const UserGrowthChart: React.FC = () => {
  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center justify-between">
        User Growth Distribution
        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5"><ArrowUpRight className="w-3.5 h-3.5" /> +12.5%</span>
      </h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={USER_GROWTH_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-dark-700/50" />
            <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: '#334155',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '11px',
              }}
            />
            <Line type="monotone" dataKey="learners" stroke="#6366F1" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
            <Line type="monotone" dataKey="experts" stroke="#7C3AED" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
