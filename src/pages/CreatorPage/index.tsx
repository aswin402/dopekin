import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import type { Twin } from '../../types/twin';
import { 
  User, Palette, Sparkles, Cpu, ShieldCheck, ArrowLeft, ArrowRight, 
  CheckCircle2
} from 'lucide-react';

import { StepBio } from './sections/StepBio';
import { StepPresence } from './sections/StepPresence';
import { StepVoice } from './sections/StepVoice';
import { StepBrain } from './sections/StepBrain';
import { StepDeploy } from './sections/StepDeploy';

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
    navigate('/discover?category=all');
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
          <StepBio
            name={name}
            setName={setName}
            profession={profession}
            setProfession={setProfession}
            vibe={vibe}
            setVibe={setVibe}
            style={style}
            setStyle={setStyle}
            bio={bio}
            setBio={setBio}
          />
        )}

        {/* Step 2: Presence Calibration */}
        {step === 2 && (
          <StepPresence
            uploadedPhotos={uploadedPhotos}
            setUploadedPhotos={setUploadedPhotos}
            isCameraActive={isCameraActive}
            setIsCameraActive={setIsCameraActive}
            cameraPhotoIdx={cameraPhotoIdx}
            setCameraPhotoIdx={setCameraPhotoIdx}
            videoRef={videoRef}
            canvasRef={canvasRef}
            handlePhotoUpload={handlePhotoUpload}
            handleCaptureSnapshot={handleCaptureSnapshot}
          />
        )}

        {/* Step 3: Vocal Training */}
        {step === 3 && (
          <StepVoice
            isRecording={isRecording}
            voiceBlobUrl={voiceBlobUrl}
            audioProgress={audioProgress}
            handleToggleRecording={handleToggleRecording}
          />
        )}

        {/* Step 4: Cognitive Ingestion */}
        {step === 4 && (
          <StepBrain
            knowledgeFiles={knowledgeFiles}
            setKnowledgeFiles={setKnowledgeFiles}
            compilingLogs={compilingLogs}
            isCompiling={isCompiling}
            handleStartCompilation={handleStartCompilation}
          />
        )}

        {/* Step 5: Configure & Launch */}
        {step === 5 && (
          <StepDeploy
            price={price}
            setPrice={setPrice}
            isChecked1={isChecked1}
            setIsChecked1={setIsChecked1}
            isChecked2={isChecked2}
            setIsChecked2={setIsChecked2}
            isChecked3={isChecked3}
            setIsChecked3={setIsChecked3}
          />
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
