import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

export const RoleSelectionPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'learner' | 'expert'>('learner');
  const navigate = useNavigate();
  const { update } = useAuth();

  const handleContinue = () => {
    update({ role: selectedRole });
    navigate('/dashboard');
  };

  return (
    <>
      <SEOHead title="Select Your Workspace Role" description="Choose between Learner and Expert workspaces." />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Choose Your Profile Type
        </h2>
        <p className="text-xs text-gray-505 dark:text-gray-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
          Tailor your workspace based on whether you want to learn new skills or mentor other developers.
        </p>
      </div>

      <div className="space-y-4">
        {/* Learner Card */}
        <Card
          onClick={() => setSelectedRole('learner')}
          className={`flex gap-4 items-start cursor-pointer transition-all duration-200 ${
            selectedRole === 'learner'
              ? 'border-2 border-primary-500 dark:border-primary-400 shadow-md ring-4 ring-primary-500/5'
              : 'border border-gray-150 dark:border-dark-700/80 hover:border-gray-300 dark:hover:border-dark-600'
          }`}
        >
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
            selectedRole === 'learner' ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-650' : 'bg-gray-100 dark:bg-dark-700 text-gray-500'
          }`}>
            <BookOpen className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              I want to Learn
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-normal">
              Book live sessions, access custom learning roadmaps, earn certificates, and build skills in trending technologies.
            </p>
          </div>
        </Card>

        {/* Expert Card */}
        <Card
          onClick={() => setSelectedRole('expert')}
          className={`flex gap-4 items-start cursor-pointer transition-all duration-200 ${
            selectedRole === 'expert'
              ? 'border-2 border-primary-500 dark:border-primary-400 shadow-md ring-4 ring-primary-500/5'
              : 'border border-gray-150 dark:border-dark-700/80 hover:border-gray-300 dark:hover:border-dark-600'
          }`}
        >
          <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${
            selectedRole === 'expert' ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-650' : 'bg-gray-100 dark:bg-dark-700 text-gray-500'
          }`}>
            <ShieldCheck className="w-5 h-5 stroke-[1.8]" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              I want to Mentor / Expert
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 leading-normal">
              Teach 1-on-1 sessions, review system architecture, write customized reports, set pricing, and manage payouts.
            </p>
          </div>
        </Card>

        <Button
          onClick={handleContinue}
          variant="primary"
          fullWidth
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="mt-6"
        >
          Enter Dashboard Workspace
        </Button>
      </div>
    </>
  );
};
export default RoleSelectionPage;
