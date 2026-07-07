import React, { useState } from 'react';
import { Send, Search, Image, Paperclip, CheckCheck, Smile, HelpCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { addMessage } from '@/store/slices/chatSlice';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeTime } from '@/utils/formatters';
import type { Conversation, Message } from '@/types';

// ============================================================
// MessageBubble
// ============================================================

interface MessageBubbleProps {
  message: Message;
  currentUserId: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  currentUserId,
}) => {
  const isMe = message.senderId === currentUserId;

  return (
    <div className={`flex gap-3 max-w-[80%] ${isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
      <Avatar name={message.senderName} src={message.senderAvatar} size="sm" className="mt-1" />
      <div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-gray-900 dark:text-gray-200">
            {message.senderName}
          </span>
          <span className="text-[9px] text-gray-400 dark:text-gray-500">
            {formatRelativeTime(message.createdAt)}
          </span>
        </div>
        <div
          className={`p-3 rounded-2xl border text-xs leading-relaxed mt-1 shadow-sm select-text ${
            isMe
              ? 'bg-primary-600 border-primary-600 text-white rounded-tr-none'
              : 'bg-white dark:bg-dark-855 border-gray-100 dark:border-dark-700 text-gray-700 dark:text-gray-305 rounded-tl-none'
          }`}
        >
          {message.content}

          {message.attachments?.map((att) => (
            <div key={att.id} className="mt-2.5 p-2 rounded-xl bg-black/10 dark:bg-black/20 flex items-center gap-2 border border-white/10">
              <Paperclip className="w-3.5 h-3.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold truncate">{att.name}</p>
                <p className="text-[9px] opacity-75">PDF file (2.0 MB)</p>
              </div>
            </div>
          ))}
        </div>
        {isMe && (
          <div className="flex justify-end mt-1 text-primary-500">
            <CheckCheck className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// ConversationList
// ============================================================

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelect,
}) => {
  const [search, setSearch] = useState('');

  const filtered = conversations.filter((c) => {
    const mentorName = c.participants.find((p) => p.id !== 'u1')?.fullName || '';
    return mentorName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex flex-col h-full bg-white dark:bg-dark-800 border-r border-gray-150 dark:border-dark-750 w-80 shrink-0">
      <div className="p-4 border-b border-gray-150 dark:border-dark-750 shrink-0 select-none">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search chat conversations..."
            className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500 text-gray-905 dark:text-white"
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto divide-y divide-gray-100 dark:divide-dark-750/30 no-scrollbar">
        {filtered.map((c) => {
          const mentor = c.participants.find((p) => p.id !== 'u1') || { fullName: 'User', avatar: '' };
          const isActive = c.id === activeId;
          return (
            <div
              key={c.id}
              onClick={() => onSelect(c.id)}
              className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${
                isActive ? 'bg-primary-50/20 dark:bg-primary-950/10 border-l-2 border-primary-500' : 'hover:bg-gray-50/50 dark:hover:bg-dark-700/20'
              }`}
            >
              <Avatar name={mentor.fullName} src={mentor.avatar} size="md" isOnline={c.isOnline} />
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                    {mentor.fullName}
                  </h4>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500">
                    {c.lastMessage ? formatRelativeTime(c.lastMessage.createdAt) : ''}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate leading-normal">
                  {c.lastMessage?.content || 'No messages yet'}
                </p>
              </div>
              {c.unreadCount > 0 && (
                <span className="h-5 w-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                  {c.unreadCount}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// ChatInput
// ============================================================

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-150 dark:border-dark-750 flex items-center gap-3 bg-white dark:bg-dark-800 shrink-0">
      <button type="button" className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
        <Paperclip className="w-4.5 h-4.5" />
      </button>
      <button type="button" className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors">
        <Image className="w-4.5 h-4.5" />
      </button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message here..."
        className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-gray-50 dark:bg-dark-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-gray-905 dark:text-white"
      />
      <button type="submit" className="p-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 transition-all active:scale-[0.97]">
        <Send className="w-4.5 h-4.5" />
      </button>
    </form>
  );
};
