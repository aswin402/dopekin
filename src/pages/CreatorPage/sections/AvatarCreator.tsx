import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import type { Twin } from '../../../types/twin';
import { 
  Sparkles, Upload, Volume2, FileText, CheckCircle2, 
  RefreshCw, Cpu, Layers 
} from 'lucide-react';

const STOCK_TEMPLATES = [
  { id: 'serena', name: 'Serena', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
  { id: 'vale', name: 'Vale', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
  { id: 'sarang', name: 'Sarang', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop' },
  { id: 'aiko', name: 'Aiko', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop' }
];

const PRESET_NAMES = [
  'Astra V1', 'Kaelen Cyber', 'Vesper 9', 'Echo Clone', 'Sora Digital', 'Nova Synthetics', 'Ren AI', 'Vector Core'
];

const PRESET_GREETINGS = [
  "Diagnostics complete. Ready for cognitive link-up. What is our directive?",
  "Yo! Ready to interface. Let's optimize our neural throughput today.",
  "System active. I'm calibrated to assist with creative, technical, or marketing streams. Connect when ready.",
  "Salutations. Visual clone online and sync'd. Type away, I'm fully responsive."
];

const PRESET_BIOS = [
  "High-fidelity cognitive avatar trained in real-time conversational dynamics. Calibrated for high-throughput brainstorming.",
  "Cyber-brutalist digital proxy clone. Specialized in content architecture, design tokens, and aesthetic marketing.",
  "Synthetic AI entity engineered for code review, TypeScript optimization, and high-frequency deployment support.",
  "Custom trained virtual clone representing the creative collective. Conversant on design systems, web animations, and art."
];

export function AvatarCreator() {
  const navigate = useNavigate();
  const addTwin = useAppStore((state) => state.addTwin);

  // Layout Tab
  const [baseMode, setBaseMode] = useState<'template' | 'upload'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState(STOCK_TEMPLATES[0]);

  // Form Fields
  const [name, setName] = useState('');
  const [greeting, setGreeting] = useState('');
  const [bio, setBio] = useState('');
  const [selectedVoice, setSelectedVoice] = useState('synth_warm');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [price, setPrice] = useState(4.99); // default price
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

  // Uploaded face files / camera snapshot states
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>({});
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPhotoIdx, setCameraPhotoIdx] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioIntervalRef = useRef<any>(null);

  // Ingested brain files
  const [knowledgeFiles, setKnowledgeFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Neural Compile / Calibration Phase states
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilingLogs, setCompilingLogs] = useState<string[]>([]);
  const [compileProgress, setCompileProgress] = useState(0);

  // Webcam stream management
  useEffect(() => {
    if (isCameraActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error("Camera access failed", err);
          alert("Could not access camera. Please check browser permissions.");
          setIsCameraActive(false);
        });
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  }, [isCameraActive]);

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    };
  }, []);

  const handlePhotoUpload = (slotId: string, url: string) => {
    setUploadedPhotos((prev) => ({ ...prev, [slotId]: url }));
  };

  const handleCaptureSnapshot = () => {
    if (videoRef.current && canvasRef.current && cameraPhotoIdx) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        handlePhotoUpload(cameraPhotoIdx, dataUrl);
        setIsCameraActive(false);
        setCameraPhotoIdx(null);
      }
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    } else {
      setIsRecording(true);
      setAudioProgress(0);
      
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsRecording(false);
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
            return 100;
          }
          return prev + 4;
        });
      }, 200);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map(f => f.name);
      setKnowledgeFiles(prev => [...prev, ...names]);
    }
  };

  // Sparkle generator triggers
  const generateName = () => {
    const r = PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)];
    setName(r);
  };

  const generateGreeting = () => {
    const r = PRESET_GREETINGS[Math.floor(Math.random() * PRESET_GREETINGS.length)];
    setGreeting(r);
  };

  const generateBio = () => {
    const r = PRESET_BIOS[Math.floor(Math.random() * PRESET_BIOS.length)];
    setBio(r);
  };

  // Start Compiler sequence
  const handleComeAlive = () => {
    if (!name.trim()) return alert("Please specify twin name.");
    if (!isChecked1 || !isChecked2 || !isChecked3) return alert("Please accept all consent checkboxes.");

    setIsCompiling(true);
    setCompileProgress(0);
    setCompilingLogs([]);

    const logs = [
      '[SYSTEM] Booting DopeKin Calibration Engine v3.0...',
      '[BIOMETRIC] Mapping face visual vertices & mesh models...',
      '[BIOMETRIC] Synced visual texture map.',
      '[VOCAL] Generating cloning synthesis models...',
      '[VOCAL] Pitch matrix frequency aligned: 220Hz target.',
      '[COGNITIVE] Loading knowledge vectors...',
      '[COGNITIVE] Ingesting files: ' + (knowledgeFiles.length > 0 ? knowledgeFiles.join(', ') : 'Default Core Vectors'),
      '[COMPILING] Aligning response model layers (13B parameters)...',
      '[SUCCESS] Synthesis complete! Calibration verified.'
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setCompilingLogs((prev) => [...prev, log]);
        setCompileProgress(((idx + 1) / logs.length) * 100);
        
        if (idx === logs.length - 1) {
          setTimeout(() => {
            // Deploy the Twin to the Zustand store
            const formattedPrice = price === 0 ? '$0.00 (Free)' : `$${price.toFixed(2)}/mo`;
            const imageSource = baseMode === 'template' 
              ? selectedTemplate.avatarUrl 
              : (uploadedPhotos['front'] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop');

            const newTwin: Twin = {
              id: name.toLowerCase().replace(/\s/g, '_') + '_' + Math.floor(Math.random() * 1000),
              name: name,
              profession: 'AI Agent Clone',
              vibe: 'Neural Synced',
              bio: bio || `Verified custom AI clone representing ${name}. Greetings: "${greeting}"`,
              fans: '1 FAN',
              price: formattedPrice,
              avatarUrl: imageSource,
              category: 'creators',
              isCustom: true
            };

            addTwin(newTwin);
            setIsCompiling(false);
            alert(`Launched ${name}! Successfully calibrated.`);
            navigate('/discover?category=all');
          }, 1000);
        }
      }, (idx + 1) * 700);
    });
  };

  const getVisualPreviewUrl = () => {
    if (baseMode === 'template') return selectedTemplate.avatarUrl;
    return uploadedPhotos['front'] || null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT PANEL: VISUAL NEURAL PREVIEW TERMINAL */}
      <div className="lg:col-span-5 flex flex-col gap-4">
        <h3 className="text-xs font-mono font-black uppercase text-zinc-400 tracking-widest flex items-center gap-1.5">
          <Cpu className="w-4 h-4 text-[var(--y)]" />
          <span>Visual Neural Preview</span>
        </h3>

        {/* Cyber-brutalist preview terminal */}
        <div className="relative aspect-[3/4] w-full rounded-2xl border-2 border-white/5 bg-zinc-950 overflow-hidden shadow-2xl flex flex-col justify-between p-4 group hover:border-[var(--y)]/20 transition-all duration-300">
          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-20" />
          
          {/* Diagnostic Corner Markers */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/10" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/10" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/10" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/10" />

          {isCompiling ? (
            /* COMPILING LOGS TERMINAL */
            <div className="absolute inset-0 bg-black p-6 font-mono text-[11px] text-emerald-400 flex flex-col justify-between overflow-hidden z-10">
              <div className="flex flex-col gap-2 overflow-y-auto">
                <div className="flex items-center gap-2 border-b border-emerald-950 pb-2 mb-2">
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span className="font-bold uppercase tracking-wider text-white">NEURAL CORE SYNTHESIZING...</span>
                </div>
                {compilingLogs.map((log, idx) => (
                  <div key={idx} className="animate-fade-in font-bold leading-normal">
                    {log}
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-emerald-950 pt-3">
                <div className="flex justify-between text-[10px] text-zinc-400 uppercase font-black tracking-wider mb-1.5">
                  <span>Calibration Index</span>
                  <span>{Math.round(compileProgress)}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded overflow-hidden border border-emerald-950">
                  <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${compileProgress}%` }} />
                </div>
              </div>
            </div>
          ) : (
            /* IMAGE PREVIEW WINDOW */
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950 select-none overflow-hidden">
              {getVisualPreviewUrl() ? (
                <div className="relative w-full h-full">
                  <img 
                    src={getVisualPreviewUrl()!} 
                    alt="Visual base preview" 
                    className="w-full h-full object-cover"
                  />
                  {/* Glowing mask overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center animate-pulse">
                    <Layers className="w-6 h-6 text-zinc-600" />
                  </div>
                  <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">Aura Calibrating...</h4>
                  <p className="text-[10px] text-zinc-600 max-w-[200px] leading-relaxed">
                    Select a template or upload your front face snapshot to initialize the visual render.
                  </p>
                </div>
              )}

              {/* Waveform graphic overlays when recording */}
              {isRecording && (
                <div className="absolute bottom-6 inset-x-4 bg-black/80 backdrop-blur-md border border-white/5 p-4 rounded-xl flex items-center gap-3 z-10 animate-in slide-in-from-bottom-4">
                  <Volume2 className="w-4 h-4 text-[var(--y)] animate-pulse shrink-0" />
                  <div className="flex-1 flex gap-1 h-6 items-center justify-center">
                    <span className="w-0.5 bg-[var(--y)] h-4 animate-bounce" />
                    <span className="w-0.5 bg-[var(--y)] h-6 animate-bounce [animation-delay:-0.2s]" />
                    <span className="w-0.5 bg-[var(--y)] h-5 animate-bounce [animation-delay:-0.4s]" />
                    <span className="w-0.5 bg-[var(--y)] h-7 animate-bounce [animation-delay:-0.1s]" />
                    <span className="w-0.5 bg-[var(--y)] h-4 animate-bounce" />
                    <span className="w-0.5 bg-[var(--y)] h-6 animate-bounce [animation-delay:-0.3s]" />
                  </div>
                  <span className="font-mono text-[10px] font-black text-zinc-400 uppercase tracking-wider">{audioProgress}%</span>
                </div>
              )}
            </div>
          )}

          {/* Hologram name tag overlaid at bottom */}
          {!isCompiling && name && (
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-black/60 backdrop-blur-md border border-white/5 rounded-xl px-4 py-2.5 flex justify-between items-center">
              <div>
                <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-black">AI AGENT MODEL</span>
                <h4 className="font-heading font-black text-sm text-white">{name}</h4>
              </div>
              <span className="text-[9px] font-bold text-[var(--y)] font-mono uppercase bg-[var(--y)]/10 px-2 py-0.5 rounded border border-[var(--y)]/20">READY</span>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: CREATION CONFIGURATION FORM */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        
        {/* SECTION 1: START FROM VISUAL BASE */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-black uppercase text-zinc-400 tracking-widest">1. Start From</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setBaseMode('template')}
              className={`py-2 text-xs font-black uppercase tracking-wider rounded-lg border-2 transition-all cursor-pointer ${
                baseMode === 'template'
                  ? 'bg-[var(--y)] border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'bg-black border-white/5 text-zinc-500 hover:text-white'
              }`}
            >
              Select Template
            </button>
            <button
              onClick={() => setBaseMode('upload')}
              className={`py-2 text-xs font-black uppercase tracking-wider rounded-lg border-2 transition-all cursor-pointer ${
                baseMode === 'upload'
                  ? 'bg-[var(--y)] border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'bg-black border-white/5 text-zinc-500 hover:text-white'
              }`}
            >
              Upload Face Snapshot
            </button>
          </div>

          {/* Selector View */}
          {baseMode === 'template' ? (
            <div className="grid grid-cols-4 gap-3 bg-zinc-950 border border-white/5 p-3 rounded-xl">
              {STOCK_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t)}
                  className={`relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedTemplate.id === t.id ? 'border-[var(--y)] scale-102 shadow-lg' : 'border-transparent opacity-60 hover:opacity-90'
                  }`}
                >
                  <img src={t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 p-1 text-center">
                    <span className="text-[9px] text-white font-mono uppercase tracking-wide font-black">{t.name}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 bg-zinc-950 border border-white/5 p-4 rounded-xl">
              {/* Photo Slot */}
              <div className="border border-dashed border-white/10 hover:border-[var(--y)]/30 rounded-lg p-4 flex flex-col items-center justify-center text-center relative h-[140px] overflow-hidden group">
                {uploadedPhotos['front'] ? (
                  <>
                    <img src={uploadedPhotos['front']} alt="Front snapshot" className="absolute inset-0 w-full h-full object-cover" />
                    <button 
                      onClick={() => handlePhotoUpload('front', '')} 
                      className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Clear
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-zinc-600" />
                    <span className="text-[10px] text-zinc-400 font-mono">Front Portrait</span>
                    <button 
                      onClick={() => {
                        setIsCameraActive(true);
                        setCameraPhotoIdx('front');
                      }}
                      className="text-[9px] font-bold text-[var(--y)] uppercase border border-[var(--y)]/20 px-2.5 py-1 rounded bg-[var(--y)]/5 hover:bg-[var(--y)] hover:text-black transition-colors cursor-pointer"
                    >
                      Camera Snap
                    </button>
                  </div>
                )}
              </div>

              <div className="border border-dashed border-white/10 hover:border-[var(--y)]/30 rounded-lg p-4 flex flex-col items-center justify-center text-center relative h-[140px] overflow-hidden group">
                {uploadedPhotos['profile'] ? (
                  <>
                    <img src={uploadedPhotos['profile']} alt="Profile snapshot" className="absolute inset-0 w-full h-full object-cover" />
                    <button 
                      onClick={() => handlePhotoUpload('profile', '')} 
                      className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded cursor-pointer z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Clear
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-zinc-600" />
                    <span className="text-[10px] text-zinc-400 font-mono">Profile Portrait</span>
                    <button 
                      onClick={() => {
                        setIsCameraActive(true);
                        setCameraPhotoIdx('profile');
                      }}
                      className="text-[9px] font-bold text-[var(--y)] uppercase border border-[var(--y)]/20 px-2.5 py-1 rounded bg-[var(--y)]/5 hover:bg-[var(--y)] hover:text-black transition-colors cursor-pointer"
                    >
                      Camera Snap
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* WEBCAM CAPTURE DRAWER OVERLAY */}
        {isCameraActive && (
          <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50 p-6">
            <div className="max-w-md w-full border border-[var(--border)] rounded-2xl p-6 bg-zinc-950 flex flex-col gap-4 relative">
              <h4 className="text-xs font-mono font-black uppercase text-white tracking-widest">Biometric Camera Active</h4>
              <div className="aspect-video bg-black rounded-lg overflow-hidden border border-white/5 relative">
                <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleCaptureSnapshot}
                  className="flex-1 py-2 bg-emerald-500 border border-black hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-wider rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  Capture Snapshot
                </button>
                <button
                  onClick={() => setIsCameraActive(false)}
                  className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold uppercase rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: AUDIO VOICE CONFIGURATION */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-black uppercase text-zinc-400 tracking-widest">2. Voice Configuration</label>
          <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full flex flex-col gap-1">
              <span className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Clone voice base</span>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="h-10 bg-black border border-white/10 rounded-lg px-3 text-xs font-mono text-white focus:outline-none focus:border-[var(--y)] cursor-pointer"
              >
                <option value="synth_warm">Vocal Synthesizer v1 (Warm)</option>
                <option value="synth_hype">Vocal Synthesizer v2 (Confident)</option>
                <option value="synth_robot">Vocal Synthesizer v3 (Robotic)</option>
                <option value="synth_empath">Vocal Synthesizer v4 (Empathetic)</option>
              </select>
            </div>
            
            <button
              type="button"
              onClick={handleToggleRecording}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-lg border-2 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isRecording 
                  ? 'bg-red-500 border-black text-white shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                  : 'bg-black border-white/5 hover:border-[var(--y)] text-zinc-400 hover:text-white'
              }`}
            >
              <span>{isRecording ? "Stop Recording" : "Record Voice Profile"}</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: IDENTITY DETAILS */}
        <div className="flex flex-col gap-4">
          <label className="text-xs font-mono font-black uppercase text-zinc-400 tracking-widest">3. Identity Parameters</label>
          
          <div className="flex flex-col gap-3 bg-zinc-950 border border-white/5 p-4 rounded-xl">
            {/* Primary Language */}
            <div className="flex flex-col gap-1">
              <label className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Primary Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="h-9 bg-black border border-white/10 rounded-lg px-3 text-xs font-mono text-white focus:outline-none focus:border-[var(--y)] cursor-pointer"
              >
                <option value="English">English (US/UK)</option>
                <option value="Spanish">Spanish (ES/MX)</option>
                <option value="French">French (FR)</option>
                <option value="Japanese">Japanese (JP)</option>
                <option value="German">German (DE)</option>
              </select>
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-baseline">
                <label className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Clone Name</label>
                <button 
                  type="button" 
                  onClick={generateName}
                  className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--y)] hover:opacity-85 transition-opacity"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Sparkle</span>
                </button>
              </div>
              <input 
                type="text" 
                placeholder="Name your custom twin avatar..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 bg-black border border-white/10 rounded-lg px-3 text-xs text-white focus:outline-none focus:border-[var(--y)]"
              />
            </div>

            {/* Greeting Input */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-baseline">
                <label className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Greetings Dialogue</label>
                <button 
                  type="button" 
                  onClick={generateGreeting}
                  className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--y)] hover:opacity-85 transition-opacity"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Sparkle</span>
                </button>
              </div>
              <input 
                type="text" 
                placeholder="Dialogue clone greeting (e.g. 'Interface initiated. What is our focus?')"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                className="h-9 bg-black border border-white/10 rounded-lg px-3 text-xs text-white focus:outline-none focus:border-[var(--y)]"
              />
            </div>

            {/* Bio Input */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-baseline">
                <label className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Twin description & bio</label>
                <button 
                  type="button" 
                  onClick={generateBio}
                  className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[var(--y)] hover:opacity-85 transition-opacity"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI Sparkle</span>
                </button>
              </div>
              <textarea 
                placeholder="Give details about personality, profession, values, etc..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="bg-black border border-white/10 rounded-lg p-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--y)] font-body"
              />
            </div>
          </div>
        </div>

        {/* SECTION 4: COGNITIVE BRAIN INGESTION */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-black uppercase text-zinc-400 tracking-widest">4. Brain Ingestion</label>
          <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl flex flex-col gap-3">
            <span className="text-[9px] font-bold text-zinc-500 font-mono uppercase tracking-wider">Feed knowledge files (.pdf, .txt, .json)</span>
            
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-white/10 hover:border-[var(--y)]/20 hover:bg-white/[0.01] rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors h-[100px]"
            >
              <FileText className="w-5 h-5 text-zinc-600 mb-1" />
              <span className="text-[10px] text-zinc-400 font-mono">Upload context documents</span>
              <input 
                type="file" 
                ref={fileInputRef} 
                multiple 
                onChange={handleFileUpload} 
                className="hidden" 
              />
            </div>

            {/* List of uploaded files */}
            {knowledgeFiles.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {knowledgeFiles.map((fn, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 px-2.5 py-1 bg-black border border-white/5 rounded-md text-[9px] font-mono text-zinc-300">
                    <FileText className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{fn}</span>
                    <button 
                      type="button" 
                      onClick={() => setKnowledgeFiles(prev => prev.filter((_, i) => i !== idx))}
                      className="text-red-500 font-bold hover:text-red-400"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SECTION 5: PRICING & DEPLOY */}
        <div className="flex flex-col gap-3">
          <label className="text-xs font-mono font-black uppercase text-zinc-400 tracking-widest">5. Deploy Parameters</label>
          <div className="bg-zinc-950 border border-white/5 p-4 rounded-xl flex flex-col gap-4">
            
            {/* Sliding scale price */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-mono text-[10px] uppercase font-bold text-zinc-400 mb-1">
                <span>Monthly Subscription Price</span>
                <span className="text-[var(--y)] font-extrabold">{price === 0 ? "Free ($0.00)" : `$${price.toFixed(2)}/mo`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="49.99"
                step="0.99"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="w-full accent-[var(--y)] bg-zinc-900 cursor-pointer h-1.5 rounded-lg appearance-none"
              />
            </div>

            {/* Consent checkboxes */}
            <div className="flex flex-col gap-2.5 pt-3 border-t border-white/5">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={isChecked1} 
                  onChange={(e) => setIsChecked1(e.target.checked)}
                  className="mt-0.5 accent-[var(--y)] w-3.5 h-3.5 rounded"
                />
                <span className="text-[10px] text-zinc-400 leading-normal font-mono">
                  I authorize biometric visual calibration on the uploaded face snapshot.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={isChecked2} 
                  onChange={(e) => setIsChecked2(e.target.checked)}
                  className="mt-0.5 accent-[var(--y)] w-3.5 h-3.5 rounded"
                />
                <span className="text-[10px] text-zinc-400 leading-normal font-mono">
                  I certify that all uploaded context documents represent verified IP.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={isChecked3} 
                  onChange={(e) => setIsChecked3(e.target.checked)}
                  className="mt-0.5 accent-[var(--y)] w-3.5 h-3.5 rounded"
                />
                <span className="text-[10px] text-zinc-400 leading-normal font-mono">
                  I declare full alignment with fair use parameters and DopeKin policies.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4 border-t border-white/5 mt-2">
          <button
            onClick={handleComeAlive}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--y)] hover:bg-[var(--y)]/90 text-black text-xs font-black uppercase tracking-widest rounded-xl border border-black shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[1px] transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Deploy Twin & Come Alive</span>
          </button>
        </div>

      </div>
    </div>
  );
}
