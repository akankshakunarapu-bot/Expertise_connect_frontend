import React from 'react';
import { CreditCard, DollarSign, Wallet, ShieldCheck } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/cards/StatCard';
import { TransactionHistory } from '@/components/cards/TransactionHistory';

export const PaymentPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Billing & Payments" description="Manage your transaction history and invoicing records." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Billing & Payments
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Review transactions, active orders, and download invoices.
        </p>
      </div>

      <div className="space-y-8">
        {/* Billing Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 select-none">
          <StatCard
            label="Total Spent"
            value="$450"
            change={12}
            timeframe="vs last month"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <StatCard
            label="Active Bookings"
            value={2}
            change={100}
            timeframe="vs last week"
            icon={<CreditCard className="w-5 h-5" />}
          />
          <StatCard
            label="Refund Credits"
            value="$25"
            icon={<Wallet className="w-5 h-5" />}
          />
        </div>

        {/* Transaction History Section */}
        <TransactionHistory />

        {/* Payment Security Badge */}
        <Card className="flex items-start gap-4 select-none bg-primary-50/10 border-primary-100 dark:border-primary-950/20">
          <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-650 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5.5 h-5.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-200">Secure Payments</h4>
            <p className="text-[11px] text-gray-505 dark:text-gray-400 leading-relaxed mt-1">
              All transactions are secured using standard SSL/TLS encryption. We use Razorpay to process credit cards and UPI, and your payouts are fully protected.
            </p>
          </div>
        </Card>
      </div>
    </>
  );
};
export default PaymentPage;
