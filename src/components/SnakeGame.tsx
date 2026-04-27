/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Play, RotateCcw, Pause } from 'lucide-react';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, TICK_RATE } from '../constants';
import { Point, GameStatus } from '../types';

export interface SnakeGameProps {
  onScoreChange: (score: number) => void;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<GameStatus>('IDLE');
  
  const gameRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(p => p.x === newFood.x && p.y === newFood.y));
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setScore(0);
    onScoreChange(0);
    setFood(generateFood(INITIAL_SNAKE));
    setStatus('PLAYING');
  }, [generateFood, onScoreChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
        break;
      case 's':
      case 'arrowdown':
        if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
        break;
      case 'a':
      case 'arrowleft':
        if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
        break;
      case 'd':
      case 'arrowright':
        if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
        break;
      case 'enter':
        if (status === 'IDLE' || status === 'GAME_OVER') resetGame();
        break;
      case ' ':
        if (status === 'PLAYING') setStatus('PAUSED');
        else if (status === 'PAUSED') setStatus('PLAYING');
        break;
    }
  }, [direction, status, resetGame]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (status !== 'PLAYING') return;

    const moveSnake = () => {
      setSnake(prev => {
        const head = prev[0];
        const newHead = {
          x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
        };

        if (prev.some(p => p.x === newHead.x && p.y === newHead.y)) {
          setStatus('GAME_OVER');
          return prev;
        }

        const newSnake = [newHead, ...prev];
        
        if (newHead.x === food.x && newHead.y === food.y) {
          const newScore = score + 10;
          setScore(newScore);
          onScoreChange(newScore);
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        setDirection(nextDirection);
        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, TICK_RATE);
    return () => clearInterval(interval);
  }, [status, nextDirection, food, score, generateFood, onScoreChange]);

  return (
    <div 
      className="relative w-full max-w-[500px] aspect-square bg-[#0a0a0a] border-4 border-[#00ffff] overflow-hidden shadow-[10px_10px_0_#ff00ff]"
      ref={gameRef}
    >
      {/* Visual Glitch Layers */}
      <div className="absolute inset-0 opacity-20 pointer-events-none crt-lines" />
      
      {/* Grid Display */}
      <div 
        className="relative w-full h-full p-1"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {/* Entity: Trace */}
        {snake.map((p, i) => (
          <motion.div
            key={`${i}-${p.x}-${p.y}`}
            initial={false}
            animate={{ 
              gridColumnStart: p.x + 1, 
              gridRowStart: p.y + 1,
            }}
            className={`
              w-full h-full border-[1px] border-black
              ${i === 0 
                ? 'bg-[#00ffff] animate-pulse shadow-[0_0_10px_#00ffff]' 
                : 'bg-[#00ffff]/60'
              }
            `}
          />
        ))}

        {/* Entity: Pulse */}
        <motion.div
          animate={{ 
            opacity: [1, 0.2, 1],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ repeat: Infinity, duration: 0.1 }}
          style={{ 
            gridColumnStart: food.x + 1, 
            gridRowStart: food.y + 1,
          }}
          className="w-full h-full bg-[#ff00ff] shadow-[0_0_20px_#ff00ff] z-10"
        />
      </div>

      {/* Logic Overlays */}
      <AnimatePresence>
        {status !== 'PLAYING' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-20 p-8"
          >
            <div className="text-center font-pixel">
              {status === 'IDLE' ? (
                <>
                  <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter glitch-text" data-text="READY_TO_BOOT">
                    READY_TO_BOOT
                  </h2>
                  <button 
                    onClick={resetGame}
                    className="group relative px-10 py-4 border-4 border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-black transition-all font-bold uppercase tracking-widest active:translate-x-1 active:translate-y-1"
                  >
                    RUN: [GRID_INIT]
                  </button>
                </>
              ) : status === 'PAUSED' ? (
                <>
                  <h2 className="text-4xl font-bold text-[#ff00ff] mb-8 uppercase tracking-tighter animate-pulse">HALTED</h2>
                  <button 
                    onClick={() => setStatus('PLAYING')}
                    className="px-10 py-4 border-4 border-[#ff00ff] text-[#ff00ff] hover:bg-[#ff00ff] hover:text-black transition-all font-bold uppercase"
                  >
                    CONTINUE
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-bold text-[#ff00ff] mb-2 uppercase tracking-tighter glitch-text" data-text="FATAL_CRASH">FATAL_CRASH</h2>
                  <p className="text-gray-500 mb-8 font-mono text-xs uppercase tracking-widest">MEMORY_LEAK_DETECTED</p>
                  <button 
                    onClick={resetGame}
                    className="px-10 py-4 border-4 border-white text-white hover:bg-white hover:text-black transition-all font-bold uppercase active:scale-95 shadow-[4px_4px_0_#ff00ff]"
                  >
                    REBOOT_CORE
                  </button>
                </>
              )}
            </div>
            
            <div className="absolute bottom-6 flex gap-10 text-[10px] text-[#00ffff]/40 font-mono uppercase">
              <span>[WASD] NAV</span>
              <span>[SPC] HALT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
