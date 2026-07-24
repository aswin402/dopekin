import React from 'react';

export interface StepBioProps {
  name: string;
  setName: (val: string) => void;
  profession: string;
  setProfession: (val: string) => void;
  vibe: string;
  setVibe: (val: string) => void;
  style: string;
  setStyle: (val: string) => void;
  bio: string;
  setBio: (val: string) => void;
}

export function StepBio({
  name,
  setName,
  profession,
  setProfession,
  vibe,
  setVibe,
  style,
  setStyle,
  bio,
  setBio,
}: StepBioProps) {
  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <div>
        <h3 className="text-xl font-heading font-bold uppercase text-[var(--y)]">Configure Twin's Details</h3>
        <p className="text-xs text-[#f5f5f5]/60 mt-0.5">Define name, profession, and general vibe parameters for your clone.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#f5f5f5]/70 uppercase">Twin Name</label>
          <input
            type="text"
            placeholder="e.g. Vale Wild"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 bg-black border border-[var(--border)] rounded-lg px-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[var(--y)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#f5f5f5]/70 uppercase">Professional Role</label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="h-10 bg-black border border-[var(--border)] rounded-lg px-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[var(--y)] font-mono"
          >
            {['Influencer', 'Musician', 'Wellness Coach', 'Executive Assistant', 'Crypto Degen', 'Comedian', 'Streamer', 'DJ', 'YouTuber', 'Boxer', 'Other'].map((p) => (
              <option key={p} value={p}>{p.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#f5f5f5]/70 uppercase">Vibe / Personality Type</label>
          <select
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
            className="h-10 bg-black border border-[var(--border)] rounded-lg px-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[var(--y)] font-mono"
          >
            {['Warm & Empathic', 'Chaotic & Loud', 'Focused & Attentive', 'Witty & Fast', 'Charming & Bright', 'Satirical & Sharp', 'Energetic', 'Techno-Focused', 'Charismatic & Analytical', 'Disciplined & Intense'].map((v) => (
              <option key={v} value={v}>{v.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#f5f5f5]/70 uppercase">Communication Vibe</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="h-10 bg-black border border-[var(--border)] rounded-lg px-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[var(--y)] font-mono"
          >
            {['Informal & Chatty', 'Warm & Attentive', 'Sarcastic & Sharp', 'Deep & Intellectual'].map((s) => (
              <option key={s} value={s}>{s.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-[#f5f5f5]/70 uppercase">Description Bio prompt</label>
        <textarea
          placeholder="Describe how your digital twin should respond, appearance traits, default clothing..."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="h-24 bg-black border border-[var(--border)] rounded-lg p-3 text-sm text-[#f5f5f5] focus:outline-none focus:border-[var(--y)] resize-none font-body"
        />
      </div>
    </div>
  );
}

export default StepBio;
