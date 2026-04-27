/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) setHighScore(newScore);
  };

  return (
    <div className="w-full min-h-screen bg-black text-[#00ffff] font-pixel selection:bg-[#ff00ff]/50 overflow-hidden flex flex-col items-center justify-start p-4 md:p-10">
      {/* Neural Overlays */}
      <div className="fixed inset-0 pointer-events-none z-50 crt-lines opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-[60] bg-white opacity-[0.02] animate-noise" />

      {/* Unified Data Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center mb-10 border-4 border-[#00ffff] p-6 bg-black relative shadow-[8px_8px_0_#ff00ff]"
      >
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-4xl md:text-6xl font-black italic glitch-text uppercase tracking-tighter" data-text="PULSE_ERROR">
            PULSE<span className="text-[#ff00ff]">_ERROR</span>
          </h1>
          <p className="text-[10px] font-mono tracking-[0.4em] text-[#ff00ff] mt-2 animate-pulse">SYSTEM_STATUS: CORRUPT</p>
        </div>

        <div className="flex gap-10 mt-6 md:mt-0 font-mono">
          <div className="text-center border-2 border-[#00ffff] px-4 py-2">
            <p className="text-[10px] uppercase text-[#ff00ff] mb-1">DATA_CLUSTERS</p>
            <p className="text-4xl font-bold">{score.toString().padStart(6, '0')}</p>
          </div>
          <div className="text-center border-2 border-[#ff00ff] px-4 py-2 shadow-inner">
            <p className="text-[10px] uppercase text-[#00ffff] mb-1">ARCHIVE_PEAK</p>
            <p className="text-4xl font-bold text-[#ff00ff]">{highScore.toString().padStart(6, '0')}</p>
          </div>
        </div>
      </motion.header>

      {/* Main Grid Matrix */}
      <main className="w-full max-w-6xl flex flex-col xl:flex-row gap-10 items-stretch">
        {/* Left: Metadata/System */}
        <div className="hidden xl:flex flex-col gap-6 w-80">
          <div className="border-2 border-[#00ffff]/30 p-4 bg-black/50 backdrop-blur-md">
            <p className="text-xs text-[#ff00ff] mb-4">NEURAL_METRICS</p>
            <div className="space-y-2 text-[12px] font-mono">
              <div className="flex justify-between"><span>LATENCY</span><span className="animate-pulse">ERR_FIXED</span></div>
              <div className="flex justify-between text-[#ff00ff]"><span>SYNC</span><span>99.9%</span></div>
              <div className="flex justify-between"><span>BUFFER</span><span>OVERFLOW</span></div>
            </div>
          </div>
          <div className="border-2 border-[#ff00ff]/30 p-4 font-mono text-[10px] leading-relaxed">
            <span className="text-[#00ffff]">[WARN]</span>: UNKNOWN_NODE_DETECTED. GRID_INTEGRITY_COMPROMISED. CONTINUE_AT_OWN_RISK.
          </div>
        </div>

        {/* Center: The Core */}
        <div className="flex-1 flex flex-col items-center">
          <div className="mb-4 text-[10px] text-[#ff00ff] font-mono flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff00ff] animate-noise" />
            LIVE_FEED: GRID_7
          </div>
          <SnakeGame onScoreChange={handleScoreChange} />
        </div>

        {/* Right: Controller Map */}
        <div className="hidden lg:flex flex-col gap-6 w-48">
          <p className="text-xs text-[#00ffff] border-b border-[#00ffff] pb-2 uppercase italic font-bold">Input_Schema</p>
          <div className="space-y-3 font-mono">
            {['W', 'A', 'S', 'D'].map(key => (
              <div key={key} className="flex items-center gap-4 group">
                <div className="w-10 h-10 border-2 border-[#00ffff] flex items-center justify-center group-hover:bg-[#00ffff] group-hover:text-black transition-colors">{key}</div>
                <span className="text-xs text-[#ff00ff]">MOVE</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Audio Engine Footer */}
      <footer className="w-full max-w-6xl mt-10">
        <MusicPlayer />
      </footer>
    </div>
  );
}
