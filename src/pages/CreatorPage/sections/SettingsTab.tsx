import { useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { 
  User, CreditCard, Key, Eye, EyeOff, Copy, Check, Trash2, LogOut, ShieldAlert 
} from 'lucide-react';

export function SettingsTab() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const isPro = useAppStore((state) => state.isPro);
  const setPro = useAppStore((state) => state.setPro);
  const userTokens = useAppStore((state) => state.userTokens);
  const addTokens = useAppStore((state) => state.addTokens);

  const [activeSection, setActiveSection] = useState<'account' | 'subscriptions' | 'apiKeys'>('account');
  const [emailInput, setEmailInput] = useState(user?.email || 'mivinandteams@gmail.com');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<string[]>([]);
  
  // Interactive API keys state
  const [apiKeys, setApiKeys] = useState<Array<{ id: string; name: string; key: string; created: string }>>([
    { id: '1', name: 'prod_key_avatar', key: 'dk_live_a8f92j10k8s2nd823hx9b8', created: '2026-06-12' },
    { id: '2', name: 'sandbox_test', key: 'dk_test_j19s20k2n81ka9d8s1j2ka', created: '2026-07-21' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      setUser(null);
      alert("Successfully logged out (mock action).");
    }
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const handleToggleReveal = (id: string) => {
    setRevealedKeys(prev => 
      prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]
    );
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newKey = {
      id: Math.random().toString(),
      name: newKeyName.toLowerCase().replace(/\s/g, '_'),
      key: `dk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys(prev => [...prev, newKey]);
    setNewKeyName('');
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-zinc-950/40 border border-white/5 rounded-2xl p-6 min-h-[500px]">
      {/* Settings Sub-Sidebar */}
      <div className="md:col-span-1 flex flex-col gap-1 border-r border-white/5 pr-4">
        <h3 className="text-[10px] font-mono font-black uppercase text-zinc-500 tracking-widest px-3 mb-2">Settings</h3>
        
        <button
          onClick={() => setActiveSection('account')}
          className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase rounded-lg text-left transition-all cursor-pointer ${
            activeSection === 'account' 
              ? 'bg-[var(--y)] text-black font-black border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account</span>
        </button>

        <button
          onClick={() => setActiveSection('subscriptions')}
          className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase rounded-lg text-left transition-all cursor-pointer ${
            activeSection === 'subscriptions' 
              ? 'bg-[var(--y)] text-black font-black border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Subscriptions</span>
        </button>

        <button
          onClick={() => setActiveSection('apiKeys')}
          className={`flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase rounded-lg text-left transition-all cursor-pointer ${
            activeSection === 'apiKeys' 
              ? 'bg-[var(--y)] text-black font-black border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>API Keys</span>
        </button>
      </div>

      {/* Settings Main Content Area */}
      <div className="md:col-span-3 pl-0 md:pl-2 flex flex-col justify-between">
        <div>
          {/* ACCOUNT SECTION */}
          {activeSection === 'account' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-heading font-black uppercase text-white tracking-tight">Account settings</h2>
                <p className="text-xs text-zinc-400 mt-1">Manage credentials and authentication details.</p>
              </div>

              <div className="flex flex-col gap-4 max-w-md">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400">Email Address</label>
                  <input 
                    type="email" 
                    value={emailInput} 
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="h-10 bg-black border border-white/10 rounded-lg px-4 text-xs font-mono text-white focus:outline-none focus:border-[var(--y)]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase font-mono tracking-wider text-zinc-400">Security Access</label>
                  <div className="px-4 py-3 bg-zinc-950 border border-white/5 rounded-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono text-zinc-400">Device verification active</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 mt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-400 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log out of Session</span>
                </button>
              </div>
            </div>
          )}

          {/* SUBSCRIPTIONS SECTION */}
          {activeSection === 'subscriptions' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-heading font-black uppercase text-white tracking-tight">Subscriptions & Credits</h2>
                <p className="text-xs text-zinc-400 mt-1">Manage active plans and token parameters.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Plan Details Card */}
                <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl flex flex-col justify-between h-[150px]">
                  <div>
                    <span className="text-[9px] font-bold font-mono uppercase bg-[var(--y)]/10 text-[var(--y)] px-2 py-0.5 rounded border border-[var(--y)]/20">Active Plan</span>
                    <h3 className="font-heading font-black text-lg text-white mt-2">Dopekin Pro Clone Master</h3>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">Renews: August 24, 2026 ($49.99/mo)</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => setPro(!isPro)} 
                      className={`px-3 py-1.5 rounded text-[10px] font-extrabold uppercase border cursor-pointer ${
                        isPro ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-[var(--y)] border-black text-black'
                      }`}
                    >
                      {isPro ? "Cancel Pro" : "Enable Pro"}
                    </button>
                  </div>
                </div>

                {/* Tokens Card */}
                <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl flex flex-col justify-between h-[150px]">
                  <div>
                    <span className="text-[9px] font-bold font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Credits</span>
                    <h3 className="font-heading font-black text-2xl text-white mt-2">{userTokens} Tokens</h3>
                    <p className="text-[10px] font-mono text-zinc-500 mt-1">Usage credits for visual syntheses and chatting.</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => addTokens(500)}
                      className="px-3 py-1.5 bg-black border border-white/10 hover:border-[var(--y)] hover:bg-zinc-900 text-white rounded text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer"
                    >
                      + 500 TOKENS (FREE MOCK)
                    </button>
                  </div>
                </div>
              </div>

              {/* Warnings/Limits */}
              <div className="p-4 bg-zinc-950 border border-white/5 rounded-xl flex gap-3 items-start max-w-xl">
                <ShieldAlert className="w-5 h-5 text-[var(--y)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase text-[#f5f5f5] tracking-wide">Subscription Fair Use Limits</h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                    Visual Avatar synthesis is limited to 10 active clones per billing period. Standard custom clones consume 10 tokens per generation request.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* API KEYS SECTION */}
          {activeSection === 'apiKeys' && (
            <div className="flex flex-col gap-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl font-heading font-black uppercase text-white tracking-tight">API Access Keys</h2>
                <p className="text-xs text-zinc-400 mt-1">Integrate custom trained digital twin agents in third party websites or software.</p>
              </div>

              {/* Generate New Key Form */}
              <form onSubmit={handleGenerateKey} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                <input
                  type="text"
                  placeholder="Key name (e.g. game_engine_companion)"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  className="flex-1 h-9 bg-black border border-white/10 rounded-lg px-4 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--y)]"
                />
                <button
                  type="submit"
                  disabled={!newKeyName.trim()}
                  className="px-4 py-2 bg-[var(--y)] hover:bg-[var(--y)]/90 text-black text-xs font-black uppercase tracking-wider rounded-lg border border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:translate-y-0 transition-transform cursor-pointer"
                >
                  Generate Key
                </button>
              </form>

              {/* API Keys Table */}
              <div className="border border-white/5 rounded-xl overflow-hidden bg-black max-w-2xl">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-zinc-950 border-b border-white/5 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                      <th className="p-3">NAME</th>
                      <th className="p-3">SECRET KEY</th>
                      <th className="p-3">CREATED</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map((item) => {
                      const isRevealed = revealedKeys.includes(item.id);
                      return (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-zinc-950/50">
                          <td className="p-3 font-semibold text-white">{item.name}</td>
                          <td className="p-3">
                            <span className="text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-white/5">
                              {isRevealed ? item.key : `dk_••••_••••••••••••••••`}
                            </span>
                          </td>
                          <td className="p-3 text-zinc-500">{item.created}</td>
                          <td className="p-3 text-right flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleToggleReveal(item.id)}
                              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer"
                              title={isRevealed ? "Hide API Key" : "Reveal API Key"}
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => handleCopyKey(item.key)}
                              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-all cursor-pointer"
                              title="Copy API Key"
                            >
                              {copiedKey === item.key ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <button
                              onClick={() => handleDeleteKey(item.id)}
                              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer border-l border-white/5 ml-1"
                              title="Revoke Key"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
