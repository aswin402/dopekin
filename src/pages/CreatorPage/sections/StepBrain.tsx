import React from 'react';
import { Upload, CheckCircle2, Terminal } from 'lucide-react';

export interface StepBrainProps {
  knowledgeFiles: string[];
  setKnowledgeFiles: React.Dispatch<React.SetStateAction<string[]>>;
  compilingLogs: string[];
  isCompiling: boolean;
  handleStartCompilation: () => void;
}

export function StepBrain({
  knowledgeFiles,
  setKnowledgeFiles,
  compilingLogs,
  isCompiling,
  handleStartCompilation,
}: StepBrainProps) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-heading font-bold uppercase text-[var(--y)]">Cognitive Knowledge Upload</h3>
        <p className="text-xs text-[#f5f5f5]/60 mt-0.5">Upload text logs, scripts, or scrape URLs to ingest vocabulary into the twin's brain.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Drop files */}
        <div 
          className="p-8 border-2 border-dashed border-white/10 hover:border-[var(--border2)] rounded-xl flex flex-col items-center justify-center gap-3 bg-black text-center cursor-pointer transition-colors"
          onClick={() => {
            setKnowledgeFiles((prev) => [...prev, 'transcript_log_01.txt']);
          }}
        >
          <Upload className="w-8 h-8 text-[#f5f5f5]/30" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#f5f5f5]/80">Drag & Drop Files</span>
          <span className="text-[10px] text-white/30 font-mono">PDF, TXT, MD up to 10MB</span>
          {knowledgeFiles.length > 0 && (
            <span className="text-xs text-[var(--success)] font-semibold flex items-center gap-1 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{knowledgeFiles.length} File(s) loaded</span>
            </span>
          )}
        </div>

        {/* Terminal compiler logs */}
        <div className="bg-black border border-white/10 rounded-xl p-4 flex flex-col font-mono text-[11px] text-zinc-400 gap-1.5 h-44 overflow-y-auto">
          <div className="flex items-center gap-1 text-[var(--y)] mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>NEURAL COMPILER LOGS</span>
          </div>
          {compilingLogs.map((log, idx) => (
            <div key={idx} className="leading-snug">
              {log}
            </div>
          ))}
          {isCompiling && (
            <div className="w-2.5 h-4 bg-[var(--y)] animate-pulse" />
          )}
          {!isCompiling && compilingLogs.length === 0 && (
            <button 
              onClick={handleStartCompilation}
              className="mt-4 px-3 py-1.5 border border-[var(--y)] text-[var(--y)] hover:bg-[var(--y)] hover:text-black rounded text-[10px] font-bold self-start cursor-pointer transition-colors"
            >
              RUN Biometrics compile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepBrain;
