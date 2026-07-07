import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, MessageSquare, ShieldAlert } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import {
  VideoLayout,
  MeetingControls,
  ChatSidebar,
  ParticipantsList,
  RecordingIndicator,
} from '../components/SessionComponents';
import { BOOKINGS } from '@/constants/dummy-data';

export const LiveSessionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Find session booking
  const session = BOOKINGS.find((b) => b.id === id) || BOOKINGS[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col transition-colors duration-200">
      <SEOHead title={`Live Room - ${session.expertName}`} description="Live interactive mentoring workspace." />

      {/* Top Header Controls */}
      <header className="h-16.5 border-b border-dark-800 bg-dark-950 flex items-center justify-between px-6 shrink-0 select-none">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-600 flex items-center justify-center text-white font-black text-lg">
            E
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold truncate max-w-[150px] sm:max-w-none">
              Live Room: {session.expertName}
            </h2>
            <p className="text-[10px] text-gray-500 truncate mt-0.5">
              Topic: {session.technology} (Duration: {session.duration} mins)
            </p>
          </div>
        </div>

        {/* Center Timer */}
        <div className="font-mono text-sm bg-dark-800 px-3.5 py-1.5 rounded-full border border-dark-700 font-bold shrink-0">
          {formatTimer(sessionTime)}
        </div>

        {/* Right Info Indicators */}
        <div className="flex items-center gap-3">
          <RecordingIndicator />

          <button
            onClick={() => {
              setShowParticipants(!showParticipants);
              setShowChat(false);
            }}
            className={`p-2.5 rounded-xl border transition-all focus:outline-none relative shrink-0 ${
              showParticipants
                ? 'bg-primary-600 border-primary-650 text-white'
                : 'border-dark-700 text-gray-400 hover:bg-dark-800'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => {
              setShowChat(!showChat);
              setShowParticipants(false);
            }}
            className={`p-2.5 rounded-xl border transition-all focus:outline-none relative shrink-0 ${
              showChat
                ? 'bg-primary-600 border-primary-650 text-white'
                : 'border-dark-700 text-gray-400 hover:bg-dark-800'
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5" />
          </button>
        </div>
      </header>

      {/* Main Stream Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Stream view */}
        <div className="flex-1 flex flex-col p-6 overflow-hidden">
          <VideoLayout expertName={session.expertName} />
          <MeetingControls onEnd={handleEndSession} />
        </div>

        {/* Toggleable side panels */}
        {showChat && <ChatSidebar />}
        {showParticipants && <ParticipantsList />}
      </div>
    </div>
  );
};
export default LiveSessionPage;
