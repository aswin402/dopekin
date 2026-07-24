import { Users, Clock, MessageSquare, Flame } from 'lucide-react';

export interface StatData {
  activeCompanions?: number | string;
  timeSpent?: string;
  conversationsCount?: number | string;
  streakDays?: number;
  streakProgress?: number;
}

export interface DashboardStatsProps {
  stats?: StatData;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const activeCompanions = stats?.activeCompanions ?? 5;
  const timeSpent = stats?.timeSpent ?? '2h 35m';
  const conversationsCount = stats?.conversationsCount ?? 12;
  const streakDays = stats?.streakDays ?? 14;
  const streakProgress = stats?.streakProgress ?? 70;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat 1 */}
      <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-2xl font-heading font-black text-white leading-none">
            {activeCompanions}
          </span>
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Active Companions
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Stat 2 */}
      <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-2xl font-heading font-black text-white leading-none">
            {timeSpent}
          </span>
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Time Spent Today
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <Clock className="w-5 h-5" />
        </div>
      </div>

      {/* Stat 3 */}
      <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-2xl font-heading font-black text-white leading-none">
            {conversationsCount}
          </span>
          <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
            Conversations Today
          </span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <MessageSquare className="w-5 h-5" />
        </div>
      </div>

      {/* Stat 4 */}
      <div className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex flex-col justify-between gap-2.5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5 text-[var(--y)] font-mono font-bold text-[10px] tracking-wider uppercase">
            <Flame className="w-4 h-4 text-[var(--y)] fill-current animate-pulse" />
            <span>{streakDays} Day Streak</span>
          </div>
          <span className="text-[9px] text-zinc-500 font-bold font-mono">Keep it going!</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-950 border border-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
            style={{ width: `${streakProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
