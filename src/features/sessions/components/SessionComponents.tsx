import React, { useState } from 'react';
import { Mic, MicOff, Video as VideoIcon, VideoOff, ScreenShare, ScreenShareOff, PanelRightClose, PanelRightOpen, Users, LogOut, Send, Smile, Paperclip, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

// ============================================================
// RecordingIndicator
// ============================================================

export const RecordingIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full border border-red-500/20 text-xs font-semibold animate-pulse select-none shrink-0">
      <span className="h-2 w-2 rounded-full bg-red-500" />
      <span>REC 01:24:10</span>
    </div>
  );
};

// ============================================================
// ParticipantsList
// ============================================================

export const ParticipantsList: React.FC = () => {
  const participants = [
    { id: 1, name: 'John David (Mentor)', role: 'expert', isMuted: false },
    { id: 2, name: 'Akanksha Sharma (You)', role: 'learner', isMuted: true },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-800 border-l border-gray-150 dark:border-dark-750 p-4.5 w-64 select-none shrink-0">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-400" /> Participants ({participants.length})
      </h3>
      <div className="space-y-3.5 flex-1 overflow-y-auto no-scrollbar">
        {participants.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <Avatar name={p.name} size="xs" />
              <span className="font-bold text-gray-900 dark:text-gray-200 truncate">{p.name}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {p.isMuted && <MicOff className="w-3.5 h-3.5 text-gray-400" />}
              <Badge variant={p.role === 'expert' ? 'primary' : 'neutral'} size="sm" className="capitalize">
                {p.role}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// ChatSidebar
// ============================================================

export const ChatSidebar: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'John David', text: 'Hi Akanksha! Ready to start?', time: '10:00 AM' },
    { id: 2, sender: 'Akanksha Sharma', text: 'Yes John, I have my queries ready.', time: '10:01 AM' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'Akanksha Sharma', text: input, time: '10:02 AM' }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-800 border-l border-gray-150 dark:border-dark-750 w-72 shrink-0">
      <div className="p-4.5 border-b border-gray-150 dark:border-dark-750">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Send className="w-4 h-4 text-gray-400 rotate-45" /> Room Chat
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4.5 space-y-4 no-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className="text-xs">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="font-bold text-gray-900 dark:text-gray-200">{m.sender}</span>
              <span className="text-[9px] text-gray-400 dark:text-gray-500">{m.time}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50 dark:bg-dark-900 p-2.5 rounded-xl border border-gray-100 dark:border-dark-800 mt-1">
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="p-3 border-t border-gray-150 dark:border-dark-750 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:text-white"
        />
        <button type="submit" className="p-2 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

// ============================================================
// VideoLayout
// ============================================================

interface VideoLayoutProps {
  expertName: string;
}

export const VideoLayout: React.FC<VideoLayoutProps> = ({ expertName }) => {
  return (
    <div className="flex-1 bg-dark-950 flex items-center justify-center relative rounded-3xl overflow-hidden shadow-2xl border border-dark-800 min-h-[400px]">
      {/* Remote Video Stream (Placeholder) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none text-center bg-dark-900">
        <Avatar name={expertName} size="xl" className="border-4 border-dark-800 ring-2 ring-primary-500/20 mb-3" />
        <h4 className="text-base font-bold text-white">{expertName}</h4>
        <p className="text-xs text-gray-500 mt-1">Remote video stream active</p>
      </div>

      {/* Local Video Stream (Corner Overlay) */}
      <div className="absolute bottom-6 right-6 w-36 h-48 bg-dark-800 rounded-2xl border border-dark-700 shadow-xl overflow-hidden flex flex-col items-center justify-center select-none text-center">
        <Avatar name="Akanksha Sharma" size="md" className="mb-2 border-2 border-dark-750" />
        <span className="text-[10px] font-bold text-white truncate max-w-[100px]">You</span>
      </div>
    </div>
  );
};

// ============================================================
// MeetingControls
// ============================================================

interface MeetingControlsProps {
  onEnd: () => void;
}

export const MeetingControls: React.FC<MeetingControlsProps> = ({ onEnd }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  return (
    <div className="flex items-center justify-center gap-3.5 flex-wrap select-none pt-4">
      <button
        onClick={() => setIsMuted(!isMuted)}
        className={cn(
          'p-3 rounded-2xl border text-white transition-all focus:outline-none hover:scale-105 active:scale-95 shadow-sm',
          isMuted ? 'bg-red-500 border-red-500 hover:bg-red-600' : 'bg-dark-800 border-dark-700 hover:bg-dark-750'
        )}
      >
        {isMuted ? <MicOff className="w-5.5 h-5.5" /> : <Mic className="w-5.5 h-5.5" />}
      </button>

      <button
        onClick={() => setIsCamOff(!isCamOff)}
        className={cn(
          'p-3 rounded-2xl border text-white transition-all focus:outline-none hover:scale-105 active:scale-95 shadow-sm',
          isCamOff ? 'bg-red-500 border-red-500 hover:bg-red-600' : 'bg-dark-800 border-dark-700 hover:bg-dark-750'
        )}
      >
        {isCamOff ? <VideoOff className="w-5.5 h-5.5" /> : <VideoIcon className="w-5.5 h-5.5" />}
      </button>

      <button
        onClick={() => setIsSharing(!isSharing)}
        className={cn(
          'p-3 rounded-2xl border text-white transition-all focus:outline-none hover:scale-105 active:scale-95 shadow-sm',
          isSharing ? 'bg-emerald-500 border-emerald-500 hover:bg-emerald-600' : 'bg-dark-800 border-dark-700 hover:bg-dark-750'
        )}
      >
        {isSharing ? <ScreenShareOff className="w-5.5 h-5.5" /> : <ScreenShare className="w-5.5 h-5.5" />}
      </button>

      <div className="h-6 w-[1px] bg-dark-800" />

      <button
        onClick={onEnd}
        className="px-5 py-3 rounded-2xl bg-red-600 border border-red-600 text-white font-bold hover:bg-red-700 transition-all focus:outline-none hover:scale-105 active:scale-95 flex items-center gap-2 text-xs uppercase tracking-wider shadow-md"
      >
        <LogOut className="w-4 h-4 rotate-180" /> Leave Room
      </button>
    </div>
  );
};
