import { useState } from 'react';
import { MyAvatars } from './sections/MyAvatars';
import { AvatarCreator } from './sections/AvatarCreator';
import { SettingsTab } from './sections/SettingsTab';
import { Users, UserPlus, Settings } from 'lucide-react';

export function CreatorPage() {
  const [activeTab, setActiveTab] = useState<'myAvatars' | 'avatarCreator' | 'settings'>('myAvatars');

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 animate-fade-up px-4 py-2">
      {/* Dashboard Top Tabs Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight">
            Creator Dashboard
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Manage digital proxies, train visual avatars, and check developer key credentials.</p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-white/5 shrink-0 select-none">
          <button
            onClick={() => setActiveTab('myAvatars')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'myAvatars'
                ? 'bg-[var(--y)] text-black border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>My Avatars</span>
          </button>
          
          <button
            onClick={() => setActiveTab('avatarCreator')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'avatarCreator'
                ? 'bg-[var(--y)] text-black border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Avatar Creator</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[var(--y)] text-black border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      {/* Render active dashboard content view */}
      <div className="min-h-[400px]">
        {activeTab === 'myAvatars' && (
          <MyAvatars onCreateClick={() => setActiveTab('avatarCreator')} />
        )}
        {activeTab === 'avatarCreator' && (
          <AvatarCreator />
        )}
        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </div>
    </div>
  );
}

export default CreatorPage;
