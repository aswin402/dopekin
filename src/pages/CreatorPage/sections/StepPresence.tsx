import React from 'react';
import { Camera, Upload, AlertCircle } from 'lucide-react';

export interface PhotoSlot {
  id: string;
  label: string;
}

const DEFAULT_PHOTO_SLOTS: PhotoSlot[] = [
  { id: 'front', label: 'Front Angle' },
  { id: 'left', label: 'Left Profile' },
  { id: 'right', label: 'Right Profile' },
  { id: 'smiling', label: 'Smiling Expression' },
  { id: 'neutral', label: 'Neutral Expression' },
];

export interface StepPresenceProps {
  uploadedPhotos: Record<string, string>;
  setUploadedPhotos: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isCameraActive: boolean;
  setIsCameraActive: (val: boolean) => void;
  cameraPhotoIdx: string | null;
  setCameraPhotoIdx: (val: string | null) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  photoSlots?: PhotoSlot[];
  handlePhotoUpload: (slotId: string, url: string) => void;
  handleCaptureSnapshot: () => void;
}

export function StepPresence({
  uploadedPhotos,
  setUploadedPhotos,
  isCameraActive,
  setIsCameraActive,
  cameraPhotoIdx,
  setCameraPhotoIdx,
  videoRef,
  canvasRef,
  photoSlots = DEFAULT_PHOTO_SLOTS,
  handlePhotoUpload,
  handleCaptureSnapshot,
}: StepPresenceProps) {
  return (
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
                        const mockUrls = {
                          front: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300',
                          left: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
                          right: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
                          smiling: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300',
                          neutral: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300'
                        };
                        handlePhotoUpload(slot.id, mockUrls[slot.id as keyof typeof mockUrls]);
                      }}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-[#f5f5f5]"
                      title="Mock Upload"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setCameraPhotoIdx(slot.id);
                        setIsCameraActive(true);
                      }}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-[#f5f5f5]"
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
  );
}

export default StepPresence;
