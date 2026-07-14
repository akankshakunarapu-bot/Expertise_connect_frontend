import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Clock, Users, Video, ArrowUpRight, Check, X, Star, Upload, FileText } from 'lucide-react';
import { StatCard } from '@/components/cards/StatCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { BOOKINGS, REVIEWS } from '@/constants/dummy-data';

// ============================================================
// ExpertStats
// ============================================================

const ExpertStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      <StatCard
        label="Total Earnings"
        value="$1,280"
        change={18.3}
        timeframe="vs last month"
        icon={<DollarSign className="w-5 h-5" />}
      />
      <StatCard
        label="Hours Taught"
        value="42.5"
        change={15}
        timeframe="vs last month"
        icon={<Clock className="w-5 h-5" />}
      />
      <StatCard
        label="Active Students"
        value={18}
        change={10}
        timeframe="vs last month"
        icon={<Users className="w-5 h-5" />}
      />
      <StatCard
        label="Sessions Conducted"
        value={32}
        change={25}
        timeframe="vs last month"
        icon={<Video className="w-5 h-5" />}
      />
    </div>
  );
};

// ============================================================
// BookingRequests
// ============================================================

const BookingRequests: React.FC = () => {
  const [bookings, setBookings] = useState(
    BOOKINGS.filter((b) => b.status === 'confirmed' || b.status === 'pending').slice(0, 4).map((b) => ({
      ...b,
      actionStatus: b.status as string,
    }))
  );

  const handleAction = (id: string, action: 'accepted' | 'rejected') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, actionStatus: action } : b))
    );
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Session Requests</h3>
        <Badge variant="primary" size="sm">{bookings.length} pending</Badge>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-850/50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <Avatar name={booking.learnerName} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-900 dark:text-gray-200 truncate">
                  {booking.learnerName}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                  {booking.technology} · {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {booking.duration} mins
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {booking.actionStatus === 'accepted' && (
                <Badge variant="success" size="sm">Accepted</Badge>
              )}
              {booking.actionStatus === 'rejected' && (
                <Badge variant="danger" size="sm">Rejected</Badge>
              )}
              {(booking.actionStatus === 'confirmed' || booking.actionStatus === 'pending') && (
                <>
                  <button
                    onClick={() => handleAction(booking.id, 'accepted')}
                    className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 transition-colors"
                    title="Accept"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleAction(booking.id, 'rejected')}
                    className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
                    title="Reject"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================
// EarningsLog
// ============================================================

const EarningsLog: React.FC = () => {
  const earnings = [
    { id: 1, student: 'Akanksha Sharma', tech: 'Node.js', amount: 40, fee: 8, net: 32, date: 'Jul 05' },
    { id: 2, student: 'Vikram Singh', tech: 'React.js', amount: 40, fee: 8, net: 32, date: 'Jul 03' },
    { id: 3, student: 'Sneha Reddy', tech: 'AWS', amount: 35, fee: 7, net: 28, date: 'Jun 28' },
    { id: 4, student: 'Arjun Mehta', tech: 'TypeScript', amount: 40, fee: 8, net: 32, date: 'Jun 25' },
  ];

  return (
    <Card>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">Earnings History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-100 dark:border-dark-700">
              <th className="text-left py-2 font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="text-left py-2 font-semibold text-gray-500 uppercase tracking-wider">Tech</th>
              <th className="text-right py-2 font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-right py-2 font-semibold text-gray-500 uppercase tracking-wider">Platform Fee</th>
              <th className="text-right py-2 font-semibold text-gray-500 uppercase tracking-wider">Your Payout</th>
              <th className="text-right py-2 font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((e) => (
              <tr key={e.id} className="border-b border-gray-50 dark:border-dark-800 last:border-0">
                <td className="py-3 font-semibold text-gray-800 dark:text-gray-200">{e.student}</td>
                <td className="py-3 text-gray-500 dark:text-gray-400">{e.tech}</td>
                <td className="py-3 text-right font-semibold text-gray-800 dark:text-gray-200">${e.amount}</td>
                <td className="py-3 text-right text-red-500">-${e.fee}</td>
                <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">${e.net}</td>
                <td className="py-3 text-right text-gray-400">{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

// ============================================================
// MentorReviews
// ============================================================

const MentorReviews: React.FC = () => {
  const mentorReviews = REVIEWS.slice(0, 3);

  return (
    <Card>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">Recent Reviews</h3>
      <div className="space-y-4">
        {mentorReviews.map((review) => (
          <div key={review.id} className="p-3 rounded-xl border border-gray-100 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-850/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Avatar name={review.reviewerName} size="xs" />
                <span className="text-xs font-bold text-gray-900 dark:text-gray-200">{review.reviewerName}</span>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-dark-700'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">{review.comment}</p>
            <p className="text-[10px] text-gray-400 mt-1.5">{review.technology}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================
// ResourceUploader
// ============================================================

const ResourceUploader: React.FC = () => {
  const [resources, setResources] = useState<{ name: string; size: string }[]>([
    { name: 'React-Hooks-CheatSheet.pdf', size: '1.2 MB' },
    { name: 'NodeJS-Architecture-Guide.pdf', size: '3.5 MB' },
  ]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResources([...resources, { name: file.name, size: `${(file.size / (1024 * 1024)).toFixed(1)} MB` }]);
    }
  };

  return (
    <Card>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">Learning Resources</h3>

      <div className="space-y-2 mb-4">
        {resources.map((r, i) => (
          <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 dark:border-dark-700">
            <FileText className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{r.name}</p>
              <p className="text-[10px] text-gray-400">{r.size}</p>
            </div>
          </div>
        ))}
      </div>

      <label className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-200 dark:border-dark-600 rounded-xl cursor-pointer hover:border-primary-400 dark:hover:border-primary-700 transition-colors text-xs font-semibold text-gray-500 dark:text-gray-400">
        <Upload className="w-4 h-4" />
        Upload Resource
        <input type="file" className="hidden" accept=".pdf,.doc,.docx,.pptx" onChange={handleUpload} />
      </label>
    </Card>
  );
};

// ============================================================
// ExpertDashboardView (Main Export)
// ============================================================

export const ExpertDashboardView: React.FC = () => {
  const { user } = useAuth();
  const firstName = user?.fullName ? user.fullName.split(' ')[0] : 'Expert';

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Welcome back, {firstName}! 👨‍🏫
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Manage your sessions, students, and earnings.
        </p>
      </div>

      {/* Verification Banner */}
      {user && !user.isVerified && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300">Profile Under Review</p>
            <p className="text-xs text-amber-700/80 dark:text-amber-400/70 mt-0.5">
              Your expert profile is being reviewed by our team. You'll be notified once verified.
            </p>
          </div>
        </div>
      )}

      <ExpertStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <BookingRequests />
          <EarningsLog />
        </div>
        <div className="space-y-8">
          <MentorReviews />
          <ResourceUploader />
        </div>
      </div>
    </div>
  );
};
export default ExpertDashboardView;
