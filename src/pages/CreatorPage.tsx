import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import type { Twin } from '../types/twin';
import { 
  User, Palette, Sparkles, Cpu, ShieldCheck, ArrowLeft, ArrowRight, 
  Upload, Camera, Circle, Terminal, CheckCircle2, AlertCircle, Mic
} from 'lucide-react';

export function CreatorPage() {
  const navigate = useNavigate();
  const addTwin = useAppStore((state) => state.addTwin);

  const [step, setStep] = useState(1);
  
  // Step 1: Bio state
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('Influencer');
  const [vibe, setVibe] = useState('Warm & Empathic');
  const [style, setStyle] = useState('Informal & Chatty');
  const [bio, setBio] = useState('');

  // Step 2: Visual Presence Alignment
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>({});
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraPhotoIdx, setCameraPhotoIdx] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const photoSlots = [
    { id: 'front', label: 'Front Angle' },
    { id: 'left', label: 'Left Profile' },
    { id: 'right', label: 'Right Profile' },
    { id: 'smiling', label: 'Smiling Expression' },
    { id: 'neutral', label: 'Neutral Expression' },
  ];

  // Step 3: Voice Training
  const [isRecording, setIsRecording] = useState(false);
  const [voiceBlobUrl, setVoiceBlobUrl] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioIntervalRef = useRef<any>(null);

  // Step 4: Cognitive Upload
  const [knowledgeFiles, setKnowledgeFiles] = useState<string[]>([]);
  const [compilingLogs, setCompilingLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(false);

  // Step 5: Launch pricing
  const [price, setPrice] = useState(0); // sliding scale $0 - $49.99
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);

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

  // Clean up timers
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

  // Mock voice recording timer
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
      setVoiceBlobUrl("mock-recording-url");
    } else {
      setIsRecording(true);
      setAudioProgress(0);
      setVoiceBlobUrl(null);
      
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsRecording(false);
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
            setVoiceBlobUrl("mock-recording-url");
            return 100;
          }
          return prev + 5;
        });
      }, 250);
    }
  };

  // Step 4: Compiling mock logs
  const handleStartCompilation = () => {
    setIsCompiling(true);
    setCompilingLogs([]);
    
    const logs = [
      '[SYSTEM] Booting DopeKin Engine v2.0...',
      '[NEURAL] Mapping biometric visual coordinates...',
      '[VOCAL] Cloning vocal resonance matrix...',
      '[COGNITIVE] Loading knowledge base files...',
      '[COMPILING] Launching custom digital twin...',
      '[SUCCESS] Synthesis complete! Calibration verified.'
    ];

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setCompilingLogs((prev) => [...prev, log]);
        if (idx === logs.length - 1) {
          setIsCompiling(false);
        }
      }, (idx + 1) * 1000);
    });
  };

  // Handle final twin deploy
  const handleDeploy = () => {
    if (!name.trim()) return alert("Please specify twin name.");
    if (!isChecked1 || !isChecked2 || !isChecked3) return alert("Please accept all consent checkboxes.");

    const formattedPrice = price === 0 ? '$0.00 (Free)' : `$${price.toFixed(2)}/mo`;
    
    const newTwin: Twin = {
      id: name.toLowerCase().replace(/\s/g, '_') + '_' + Math.floor(Math.random() * 1000),
      name: name,
      profession: profession,
      vibe: vibe,
      bio: bio || `Verified digital twin helper clone for ${name}.`,
      fans: '100 FANS',
      price: formattedPrice,
      avatarUrl: uploadedPhotos['front'] || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
      category: 'creators',
      isCustom: true
    };

    addTwin(newTwin);
    alert(`Successfully launched ${name}! Deploying to exploration grids.`);
    navigate('/explore?category=all');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-fade-up">
      {/* Wizard Header Progress */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-heading font-black uppercase text-[#f5f5f5] tracking-tight">
            Creator Studio
          </h1>
          <p className="text-sm text-[#f5f5f5]/60 mt-1">Configure parameters and compile a custom cognitive agent clone.</p>
        </div>

        {/* Horizontal steps line */}
        <div className="grid grid-cols-5 gap-2 border-b border-white/5 pb-4">
          {[
            { id: 1, label: 'Bio', icon: User },
            { id: 2, label: 'Presence', icon: Palette },
            { id: 3, label: 'Voice', icon: Sparkles },
            { id: 4, label: 'Brain', icon: Cpu },
            { id: 5, label: 'Deploy', icon: ShieldCheck }
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            return (
              <div 
                key={s.id}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg ${
                  isActive ? 'bg-black text-[var(--y)] border border-[var(--border)]' : 'opacity-50 text-[#f5f5f5]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase font-mono tracking-wide hidden md:inline">
                  {s.id}. {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT SWITCH */}
      <div className="bg-black border border-[var(--border)] rounded-2xl p-6 min-h-[350px] flex flex-col relative overflow-hidden">
        
        {/* Pulsing visual aura sphere background decoration */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-gradient-to-br from-[var(--y)]/5 to-transparent blur-3xl rounded-full animate-aura pointer-events-none" />

        {/* Step 1: Onboarding Bio */}
        {step === 1 && (
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
        )}

        {/* Step 2: Presence Calibration */}
        {step === 2 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-heading font-bold uppercase text-[var(--y)]">Presence Calibration</h3>
              <p className="text-xs text-[#f5f5f5]/60 mt-0.5">Upload photos or capture webcam angles to calibrate twin's visual model.</p>
            </div>

            {/* Webcam feed modal if active */}
            {isCameraActive && cameraPhotoIdx && (
              <div className="flex flex-col items-center gap-3 border border-white/5 p-4 rounded-xl bg-black">
                <video ref={videoRef} className="w-full max-w-sm rounded-lg object-cover aspect-video" />
                <div className="flex gap-2">
                  <button 
                    onClick={handleCaptureSnapshot}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[var(--y)] text-[var(--blk)] text-xs font-bold rounded-lg border border-[var(--blk)] cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Snapshot</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsCameraActive(false);
                      setCameraPhotoIdx(null);
                    }}
                    className="px-4 py-2 bg-zinc-800 text-white text-xs rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}

            {/* Grid of photo slots */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {photoSlots.map((slot) => {
                const photo = uploadedPhotos[slot.id];
                return (
                  <div 
                    key={slot.id} 
                    className="flex flex-col items-center gap-2 p-3 border border-white/5 rounded-xl bg-black relative group aspect-[3/4] justify-center"
                  >
                    {photo ? (
                      <div className="w-full h-full relative group">
                        <img src={photo} alt={slot.label} className="w-full h-full object-cover rounded-lg" />
                        <button 
                          onClick={() => {
                            const copy = { ...uploadedPhotos };
                            delete copy[slot.id];
                            setUploadedPhotos(copy);
                          }}
                          className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-red-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Clear
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3 text-center">
                        <span className="text-[10px] font-mono text-white/30 uppercase">{slot.label}</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => {
                              // Simulate file picker by hardcoding Unsplash portrait url
                              const mockUrls = {
                                front: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300',
                                left: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
                                right: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
                                smiling: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300',
                                neutral: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300'
                              };
                              handlePhotoUpload(slot.id, mockUrls[slot.id as keyof typeof mockUrls]);
                            }}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white"
                            title="Mock Upload"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setCameraPhotoIdx(slot.id);
                              setIsCameraActive(true);
                            }}
                            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white"
                            title="Camera Capture"
                          >
                            <Camera className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-[11px] text-[var(--muted2)] flex items-center gap-1.5 px-1">
              <AlertCircle className="w-3.5 h-3.5 text-[var(--y)] shrink-0" />
              <span>We recommend supplying front, side profiles and expressive snapshots to train face synthesizers.</span>
            </div>
          </div>
        )}

        {/* Step 3: Vocal Training */}
        {step === 3 && (
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
        )}

        {/* Step 4: Cognitive Ingestion */}
        {step === 4 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-heading font-bold uppercase text-[var(--y)]">Cognitive Knowledge Upload</h3>
              <p className="text-xs text-[#f5f5f5]/60 mt-0.5">Upload text logs, scripts, or scrape URLs to ingest vocabulary into the twin's brain.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Drop files */}
              <div className="p-8 border-2 border-dashed border-white/10 hover:border-[var(--border2)] rounded-xl flex flex-col items-center justify-center gap-3 bg-black text-center cursor-pointer transition-colors"
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
        )}

        {/* Step 5: Configure & Launch */}
        {step === 5 && (
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
        )}

        {/* Wizard Footer Controls */}
        <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-5 gap-4">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1.5 px-4 py-2 border border-white/10 hover:bg-white/5 text-xs font-bold uppercase rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[var(--y)] text-[var(--blk)] font-extrabold text-xs uppercase tracking-wider rounded-lg border border-[var(--blk)] shadow-[var(--brutal)] hover:translate-y-[-2px] active:translate-y-[1px] transition-transform cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleDeploy}
              className="flex items-center gap-1.5 px-6 py-3 bg-[var(--y)] text-[var(--blk)] font-black text-xs uppercase tracking-widest rounded-xl border-2 border-[var(--blk)] shadow-[var(--brutal)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Deploy Twin</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
export default CreatorPage;
