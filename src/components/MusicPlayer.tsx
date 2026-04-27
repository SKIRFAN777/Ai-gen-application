/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { DUMMY_TRACKS } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const currentTrack = DUMMY_TRACKS[currentIndex];

  const skipForward = () => {
    setCurrentIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
  };

  const skipBack = () => {
    setCurrentIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
  };

  return (
    <div className="w-full bg-black border-4 border-[#00ffff] p-6 flex flex-col md:flex-row items-center gap-10 shadow-[6px_6px_0_#ff00ff] relative overflow-hidden group">
      {/* Visual Distortion Layers */}
      <div className="absolute inset-0 pointer-events-none crt-lines opacity-10" />
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#ff00ff]/20 animate-noise" />

      {/* Spectral Display Unit */}
      <div className={`w-24 h-24 bg-black border-2 border-[#ff00ff] flex-shrink-0 flex items-center justify-center relative shadow-[4px_4px_0_#00ffff]`}>
        <motion.div 
          animate={{ scale: isPlaying ? [1, 1.2, 0.9, 1.1, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 0.2 }}
          className="w-12 h-12 border-4 border-[#00ffff] flex items-center justify-center font-mono text-[8px] text-[#ff00ff]"
        >
          {isPlaying ? 'SIG' : 'IDL'}
        </motion.div>
      </div>
      
      {/* Track Metadata Matrix */}
      <div className="flex-1 w-full text-center md:text-left overflow-hidden">
        <h4 className="font-pixel text-xl truncate text-[#00ffff] uppercase tracking-tighter mb-1 select-none">
          {currentTrack.title}
        </h4>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <p className="font-mono text-xs text-[#ff00ff] uppercase tracking-widest opacity-80 italic">
            SCR: {currentTrack.artist}
          </p>
          <div className="h-[1px] flex-1 bg-[#ff00ff]/20 hidden md:block" />
        </div>
      </div>

      {/* Logic Gates (Controls) */}
      <div className="flex flex-col gap-4 w-full md:w-auto">
        <div className="flex justify-center items-center gap-8">
          <button 
            onClick={skipBack}
            className="text-[#00ffff] hover:text-white transition-colors p-2 active:translate-x-[-2px]"
          >
            <SkipBack className="w-6 h-6 fill-current" />
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 bg-[#00ffff] text-black font-bold flex items-center justify-center hover:bg-[#ff00ff] transition-colors relative"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
            <div className="absolute inset-0 border-2 border-white scale-110 opacity-20 pointer-events-none" />
          </button>
          
          <button 
            onClick={skipForward}
            className="text-[#00ffff] hover:text-white transition-colors p-2 active:translate-x-[2px]"
          >
            <SkipForward className="w-6 h-6 fill-current" />
          </button>
        </div>

        {/* Data Stream Progress */}
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-[#00ffff] w-12">PTR: 42</span>
          <div className="flex-1 h-3 bg-[#111] border border-[#00ffff]/30 relative overflow-hidden">
            <motion.div 
              initial={{ width: '42%' }}
              animate={{ width: isPlaying ? '100%' : '42%' }}
              transition={{ duration: isPlaying ? 200 : 0.5, ease: "linear" }}
              className={`absolute top-0 left-0 h-full bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]`}
            />
          </div>
          <span className="text-[10px] font-mono text-[#ff00ff] w-12 tracking-tighter">EOF: 99</span>
        </div>
      </div>
    </div>
  );
};
