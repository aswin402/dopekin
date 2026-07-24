import React from 'react';
import { Mic, Circle } from 'lucide-react';

export interface StepVoiceProps {
  isRecording: boolean;
  voiceBlobUrl: string | null;
  audioProgress: number;
  handleToggleRecording: () => void;
}

export function StepVoice({
  isRecording,
  voiceBlobUrl,
  audioProgress,
  handleToggleRecording,
}: StepVoiceProps) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-heading font-bold uppercase text-[var(--y)]">Vocal Matrix Calibration</h3>
        <p className="text-xs text-[#f5f5f5]/60 mt-0.5">Read script aloud to calibrate the vocoder vocal resonance parameters.</p>
      </div>

      <div className="p-4 bg-black border border-white/5 rounded-xl text-center flex flex-col gap-3">
        <span className="text-[10px] font-mono text-[var(--y)] uppercase tracking-wider">Calibration Script</span>
        <p className="text-sm font-semibold italic text-[#f5f5f5] leading-relaxed">
          "The digital horizon expands. My voice is the bridge. Synthesizing voice resonance matrix..."
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 py-4">
        <button 
          onClick={handleToggleRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
            isRecording 
              ? 'bg-red-500 text-white animate-pulse border-4 border-red-900' 
              : 'bg-black border border-[var(--border)] text-[var(--y)] shadow-[var(--brutal)] hover:scale-105 active:scale-95'
          } cursor-pointer`}
        >
          {isRecording ? <Circle className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" />}
        </button>
        <span className="text-xs font-bold uppercase font-mono">
          {isRecording ? 'Calibrating voice wave telemetry...' : voiceBlobUrl ? 'Voice calibrated successfully!' : 'Click to begin vocal recording'}
        </span>

        {/* Progress Bar */}
        {isRecording && (
          <div className="w-full max-w-sm h-2 bg-zinc-900 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-[var(--y)] transition-all duration-300" style={{ width: `${audioProgress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default StepVoice;
