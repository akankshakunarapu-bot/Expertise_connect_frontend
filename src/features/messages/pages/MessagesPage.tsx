import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare, ArrowLeft } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setActiveConversation, addMessage, markConversationRead } from '@/store/slices/chatSlice';
import { SEOHead } from '@/components/common/SEOHead';
import { ConversationList, MessageBubble, ChatInput } from '../components/ChatWidgets';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';

export const MessagesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { conversations, activeConversationId, messages } = useAppSelector((state) => state.chat);

  const expertParam = searchParams.get('expert');

  // Find active conversation
  const activeConversation = conversations.find((c) => c.id === activeConversationId);
  const activeMentor = activeConversation?.participants.find((p) => p.id !== 'u1');
  const activeMessages = activeConversationId ? messages[activeConversationId] || [] : [];

  useEffect(() => {
    // If expertParam is present, find or select that conversation
    if (expertParam) {
      const existingConv = conversations.find((c) =>
        c.participants.some((p) => p.id === expertParam)
      );
      if (existingConv) {
        dispatch(setActiveConversation(existingConv.id));
      }
    } else if (conversations.length > 0 && !activeConversationId) {
      // Default select first
      dispatch(setActiveConversation(conversations[0].id));
    }
  }, [expertParam, conversations, activeConversationId, dispatch]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationRead(activeConversationId));
    }
  }, [activeConversationId, dispatch]);

  const handleSendMessage = (text: string) => {
    if (activeConversationId) {
      dispatch(
        addMessage({
          id: `m-${Date.now()}`,
          conversationId: activeConversationId,
          senderId: 'u1',
          senderName: 'Akanksha Sharma',
          senderAvatar: 'https://ui-avatars.com/api/?background=4F46E5&color=fff&name=Akanksha+Sharma&size=128',
          content: text,
          type: 'text',
          readBy: ['u1'],
          isEdited: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }
  };

  return (
    <div className="h-[80vh] flex rounded-3xl overflow-hidden border border-gray-150 dark:border-dark-750 bg-white dark:bg-dark-800 shadow-md">
      <SEOHead title="Conversations" description="Chat with your expert technical mentors." />

      {/* Conversation List Sidebar */}
      <ConversationList
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={(id) => dispatch(setActiveConversation(id))}
      />

      {/* Active Conversation Window */}
      {activeConversation && activeMentor ? (
        <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-dark-900">
          {/* Header */}
          <div className="h-16.5 border-b border-gray-150 dark:border-dark-750 px-6 flex items-center justify-between bg-white dark:bg-dark-800 select-none">
            <div className="flex items-center gap-3">
              <Avatar name={activeMentor.fullName} src={activeMentor.avatar} size="sm" isOnline={activeConversation.isOnline} />
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-gray-200 leading-tight">
                  {activeMentor.fullName}
                </h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 capitalize mt-0.5">
                  {activeConversation.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
            {activeMessages.map((m) => (
              <MessageBubble key={m.id} message={m} currentUserId="u1" />
            ))}
          </div>

          {/* Text Input area */}
          <ChatInput onSend={handleSendMessage} />
        </div>
      ) : (
        <div className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-dark-900 select-none">
          <EmptyState
            icon={<MessageSquare className="w-6 h-6 text-gray-400" />}
            title="Select a Conversation"
            description="Choose a mentor from the sidebar to start chatting, ask queries, or share files."
          />
        </div>
      )}
    </div>
  );
};
export default MessagesPage;
