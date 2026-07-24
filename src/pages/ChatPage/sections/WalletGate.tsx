import { Wallet } from 'lucide-react';

interface WalletGateProps {
  onConnect: () => void;
}

export function WalletGate({ onConnect }: WalletGateProps) {
  return (
    <div className="h-[calc(100vh-8rem)] lg:h-screen w-full flex items-center justify-center bg-black p-4 select-none">
      <div className="max-w-md w-full p-8 md:p-10 rounded-[32px] bg-zinc-950 border border-white/10 flex flex-col items-center text-center gap-6 shadow-[0_0_50px_rgba(255,231,1,0.15)]">
        <div className="w-16 h-16 rounded-full bg-black border border-[var(--y)] flex items-center justify-center shadow-[0_0_15px_rgba(255,231,1,0.2)]">
          <span className="font-heading font-black text-2xl text-[var(--y)]">W</span>
        </div>
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xl md:text-2xl font-heading font-black uppercase text-white tracking-tight">
            Connect Your Wallet
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 font-body leading-relaxed max-w-xs mx-auto">
            Connect your AppKit wallet to DopaMint to continue and check your reward eligibility.
          </p>
        </div>
        <button
          onClick={onConnect}
          className="mt-2 w-full py-3.5 px-6 rounded-2xl bg-[var(--y)] text-black font-extrabold uppercase text-xs md:text-sm tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Wallet className="w-4 h-4" />
          <span>Connect Wallet</span>
        </button>
      </div>
    </div>
  );
}
