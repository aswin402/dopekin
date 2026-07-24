import React, { RefObject } from 'react';
import { X, MessageSquare, Mic } from 'lucide-react';
import type { Twin, Message } from '../../../types/twin';

export interface ChatSidebarProps {
  showChatList?: boolean;
  activeTwin?: Twin;
  twins?: Twin[];
  currentChats: Message[];
  isTyping?: boolean;
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onSendVoiceNote: () => void;
  onClose: () => void;
  messagesEndRef?: RefObject<HTMLDivElement>;
  onSelectTwin?: (twinId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export function ChatSidebar({
  showChatList = true,
  activeTwin,
  twins = [],
  currentChats,
  isTyping = false,
  inputText,
  setInputText,
  onSendMessage,
  onSendVoiceNote,
  onClose,
  messagesEndRef,
  onSelectTwin,
  searchQuery = '',
  onSearchChange,
}: ChatSidebarProps) {
  if (!showChatList) return null;

  return (
    <div className="w-80 border-r border-zinc-900 flex flex-col bg-black shrink-0 z-20 absolute inset-y-0 left-0 md:relative md:flex animate-in slide-in-from-left duration-300 p-4 justify-between h-full font-body">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-zinc-900 pb-3 mb-4 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-zinc-900 shrink-0 relative">
            <img src={activeTwin?.avatarUrl} alt={activeTwin?.name} className="w-full h-full object-cover" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-black animate-pulse" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-white tracking-tight uppercase leading-none">{activeTwin?.name}</span>
              {activeTwin?.unreadCount && activeTwin.unreadCount > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-[var(--y)] text-black text-[9px] font-extrabold leading-none">
                  {activeTwin.unreadCount}
                </span>
              ) : null}
            </div>
            <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase font-bold mt-0.5">Online</span>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-1 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white cursor-pointer transition-colors"
          aria-label="Close chat panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Twins List / Search bar if provided */}
      {onSearchChange && (
        <div className="mb-3 shrink-0">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#18181a] border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--y)] transition-all font-body"
          />
        </div>
      )}

      {twins.length > 0 && onSelectTwin && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none shrink-0 border-b border-zinc-900/50">
          {twins.map((twin) => {
            const isActive = twin.id === activeTwin?.id;
            return (
              <button
                key={twin.id}
                onClick={() => onSelectTwin(twin.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white font-bold border border-white/10'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 relative">
                  <img src={twin.avatarUrl} alt={twin.name} className="w-full h-full object-cover" />
                  {twin.unreadCount && twin.unreadCount > 0 ? (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--y)] border border-black" />
                  ) : null}
                </div>
                <span className="truncate max-w-[80px]">{twin.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Message logs */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 scrollbar-none mb-4">
        {currentChats.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-zinc-500 gap-2">
            <MessageSquare className="w-8 h-8 opacity-25" />
            <p className="text-xs font-body">No messages yet. Send a message to start conversation!</p>
          </div>
        ) : (
          currentChats.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex items-start gap-2.5 max-w-[85%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
                {/* Left Avatar circle for AI messages */}
                {!isUser && (
                  <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0 bg-zinc-950">
                    <img src={activeTwin?.avatarUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                
                {/* Message text bubble */}
                <div className="flex flex-col gap-0.5">
                  <div className={`px-4 py-2.5 text-xs rounded-[16px] leading-relaxed ${
                    isUser 
                      ? 'bg-[var(--y)] text-black font-semibold rounded-tr-none' 
                      : 'bg-zinc-800 text-white rounded-tl-none border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[8px] text-white/20 font-mono mt-1 text-right">{msg.timestamp}</span>
                </div>
              </div>
            );
          })
        )}
        {isTyping && (
          <div className="flex items-start gap-2.5 self-start">
            <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden shrink-0 bg-zinc-950">
              <img src={activeTwin?.avatarUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="bg-zinc-800 text-zinc-400 px-4 py-2.5 rounded-[16px] rounded-tl-none border border-white/5 text-xs flex gap-1 items-center animate-pulse">
              <span>Typing</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:-0.2s]">.</span>
              <span className="animate-bounce [animation-delay:-0.4s]">.</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* WhatsApp-style Input & Privacy Form */}
      <form onSubmit={onSendMessage} className="flex flex-col gap-2 shrink-0">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder={`Message ${activeTwin?.name || ''}`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-[#18181a] border border-white/5 rounded-full pl-5 pr-12 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--y)] transition-all font-body"
          />
          {inputText.trim() === '' ? (
            <button 
              type="button" 
              onClick={onSendVoiceNote}
              className="absolute right-2.5 p-2 rounded-full bg-[var(--y)] text-black hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              title="Send voice note"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button 
              type="submit" 
              className="absolute right-2.5 p-2 rounded-full bg-[var(--y)] text-black hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center"
              title="Send message"
            >
              <svg className="w-3.5 h-3.5 transform rotate-45 -translate-x-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="flex items-center justify-center gap-1.5 mt-1 text-[9px] text-zinc-500 select-none font-body">
          <svg className="w-3.5 h-3.5 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.9L10 1.154l7.834 3.746a1 1 0 01.616.92v5.33a8.949 8.949 0 01-3.664 7.227l-4.484 3.254a1 1 0 01-1.187 0L4.898 18.38A8.949 8.949 0 011.234 11.15V5.82a1 1 0 01.616-.92zM10 13a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span>We don't share or train on your chats</span>
        </div>
      </form>
    </div>
  );
}
