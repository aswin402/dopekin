import React from 'react';

export interface StepDeployProps {
  price: number;
  setPrice: (val: number) => void;
  isChecked1: boolean;
  setIsChecked1: (val: boolean) => void;
  isChecked2: boolean;
  setIsChecked2: (val: boolean) => void;
  isChecked3: boolean;
  setIsChecked3: (val: boolean) => void;
}

export function StepDeploy({
  price,
  setPrice,
  isChecked1,
  setIsChecked1,
  isChecked2,
  setIsChecked2,
  isChecked3,
  setIsChecked3,
}: StepDeployProps) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-heading font-bold uppercase text-[var(--y)]">Launch & Deploy Twin</h3>
        <p className="text-xs text-[#f5f5f5]/60 mt-0.5">Determine monthly price parameters and verify compliance checkboxes to launch.</p>
      </div>

      {/* Slider */}
      <div className="p-4 bg-black border border-white/5 rounded-xl flex flex-col gap-3 max-w-md w-full">
        <div className="flex justify-between items-center text-xs font-bold uppercase">
          <span>Monthly Subscription</span>
          <span className="text-[var(--y)] font-mono text-sm">{price === 0 ? 'FREE' : `$${price.toFixed(2)}/mo`}</span>
        </div>
        <input
          type="range"
          min="0"
          max="49.99"
          step="0.5"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[var(--y)]"
        />
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">Bounds: $0.00 to $49.99 per month</span>
      </div>

      {/* Consent checklist */}
      <div className="flex flex-col gap-2.5 max-w-xl">
        <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#f5f5f5]/70">
          <input 
            type="checkbox" 
            checked={isChecked1} 
            onChange={(e) => setIsChecked1(e.target.checked)}
            className="mt-0.5 rounded border-zinc-800 bg-black text-[var(--y)] focus:ring-[var(--y)]" 
          />
          <span>I declare that I am the sole owner of these photos and I consent to training this AI twin.</span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#f5f5f5]/70">
          <input 
            type="checkbox" 
            checked={isChecked2} 
            onChange={(e) => setIsChecked2(e.target.checked)}
            className="mt-0.5 rounded border-zinc-800 bg-black text-[var(--y)] focus:ring-[var(--y)]" 
          />
          <span>I agree to the terms of service and content moderation guidelines.</span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer text-xs leading-relaxed text-[#f5f5f5]/70">
          <input 
            type="checkbox" 
            checked={isChecked3} 
            onChange={(e) => setIsChecked3(e.target.checked)}
            className="mt-0.5 rounded border-zinc-800 bg-black text-[var(--y)] focus:ring-[var(--y)]" 
          />
          <span>I understand that this digital twin will act autonomously on my behalf.</span>
        </label>
      </div>
    </div>
  );
}

export default StepDeploy;
