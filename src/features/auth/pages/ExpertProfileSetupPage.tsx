import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import {
  ArrowRight,
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Globe,
  Clock,
  DollarSign,
  Upload,
  Check,
  Link2,
} from 'lucide-react';

const TECHNOLOGY_OPTIONS = [
  'React.js', 'Node.js', 'Python', 'AWS', 'TypeScript', 'Docker',
  'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Next.js', 'Flutter',
  'Machine Learning', 'DevOps', 'Rust', 'Go', 'Java', 'Angular',
  'Vue.js', 'Redis', 'System Design', 'Data Structures',
];

const AVAILABILITY_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

export const ExpertProfileSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { update } = useAuth();
  const [step, setStep] = useState(1);

  // Step 1 state
  const [bio, setBio] = useState('');
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  // Step 2 state
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [company, setCompany] = useState('');
  const [linkedin, setLinkedin] = useState('');

  // Step 3 state
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({});
  const [cvFileName, setCvFileName] = useState('');

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const toggleSlot = (day: string, time: string) => {
    setSelectedSlots((prev) => {
      const daySlots = prev[day] || [];
      if (daySlots.includes(time)) {
        return { ...prev, [day]: daySlots.filter((t) => t !== time) };
      }
      return { ...prev, [day]: [...daySlots, time] };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCvFileName(file.name);
  };

  const handleComplete = () => {
    update({ isVerified: false });
    navigate('/dashboard', { replace: true });
  };

  const canProceedStep1 = bio.trim().length >= 10 && experience && hourlyRate;
  const canProceedStep2 = selectedTechs.length >= 1;

  return (
    <>
      <SEOHead title="Complete Expert Profile" description="Set up your expert profile to start mentoring on Expertise Connect." />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-12 px-4 transition-colors duration-200">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary-600 to-accent-600 flex items-center justify-center text-white font-black text-2xl shadow-md mb-4">
              E
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Complete Your Expert Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              Provide your details so learners can find and book sessions with you. Your profile will be reviewed before going live.
            </p>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                    s <= step ? 'bg-primary-600 dark:bg-primary-500' : 'bg-gray-200 dark:bg-dark-700'
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-center text-xs font-semibold text-gray-400 dark:text-gray-500 mb-6">
            Step {step} of 3
          </p>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <Card className="space-y-5">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-600" />
                Professional Information
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Biography *</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell learners about your expertise, teaching style, and background..."
                  className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[100px] text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    Years of Experience *
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-900 dark:text-white"
                  >
                    <option value="">Select</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    <DollarSign className="w-3.5 h-3.5 inline mr-1" />
                    Hourly Rate (USD) *
                  </label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="e.g. 40"
                    min="5"
                    max="500"
                    className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-dark-700">
                <Button
                  variant="primary"
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Technologies & Company */}
          {step === 2 && (
            <Card className="space-y-5">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                Technologies & Background
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Technologies You Teach * <span className="text-gray-400 font-normal">(Select at least 1)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {TECHNOLOGY_OPTIONS.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleTech(tech)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all active:scale-[0.97] ${
                        selectedTechs.includes(tech)
                          ? 'bg-primary-50 dark:bg-primary-950/20 border-primary-300 dark:border-primary-800 text-primary-700 dark:text-primary-400'
                          : 'bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-dark-600'
                      }`}
                    >
                      {selectedTechs.includes(tech) && <Check className="w-3 h-3 inline mr-1" />}
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  <Briefcase className="w-3.5 h-3.5 inline mr-1" />
                  Company / University
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Google, MIT, Freelance"
                  className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  <Link2 className="w-3.5 h-3.5 inline mr-1" />
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-dark-700">
                <Button variant="outline" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Continue
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Availability & Documents */}
          {step === 3 && (
            <Card className="space-y-5">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Globe className="w-5 h-5 text-accent-600" />
                Availability & Documents
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Set Your Available Time Slots
                </label>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr>
                        <th className="text-left py-2 pr-2 text-gray-500 font-semibold">Day</th>
                        {TIME_SLOTS.map((t) => (
                          <th key={t} className="py-2 px-1 text-gray-500 font-medium whitespace-nowrap">{t}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {AVAILABILITY_DAYS.map((day) => (
                        <tr key={day} className="border-t border-gray-100 dark:border-dark-700">
                          <td className="py-2 pr-2 text-xs font-semibold text-gray-700 dark:text-gray-300">{day}</td>
                          {TIME_SLOTS.map((time) => {
                            const isSelected = selectedSlots[day]?.includes(time);
                            return (
                              <td key={time} className="py-1.5 px-1 text-center">
                                <button
                                  type="button"
                                  onClick={() => toggleSlot(day, time)}
                                  className={`w-6 h-6 rounded-md border transition-all ${
                                    isSelected
                                      ? 'bg-primary-600 border-primary-600 text-white'
                                      : 'bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-700 hover:border-primary-300'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 mx-auto" />}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  <Upload className="w-3.5 h-3.5 inline mr-1" />
                  Upload Resume / CV (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-250 dark:border-dark-600 rounded-xl cursor-pointer hover:border-primary-400 dark:hover:border-primary-700 transition-colors text-xs text-gray-500 dark:text-gray-400">
                    <Upload className="w-4 h-4" />
                    <span>{cvFileName || 'Choose file (PDF, DOC)'}</span>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                  </label>
                </div>
              </div>

              {/* Verification notice */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl px-4 py-3">
                <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">
                  ⚠️ Your profile will be reviewed by our team. You'll be notified once verified.
                  Only verified experts appear in search results.
                </p>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100 dark:border-dark-700">
                <Button variant="outline" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back
                </Button>
                <Button variant="primary" onClick={handleComplete} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Submit for Review
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
export default ExpertProfileSetupPage;
