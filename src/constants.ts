/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Track } from './types';

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = { x: 0, y: -1 };
export const TICK_RATE = 150;

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Midnight Grid',
    artist: 'Neon Architect',
    duration: '3:45',
    coverUrl: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    id: '2',
    title: 'Fuchsia Protocol',
    artist: 'Synth Soul',
    duration: '4:12',
    coverUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&h=300&auto=format&fit=crop',
    color: 'from-fuchsia-500 to-purple-600',
  },
  {
    id: '3',
    title: 'Digital Horizon',
    artist: 'Glitch Runner',
    duration: '2:58',
    coverUrl: 'https://images.unsplash.com/photo-1633513106196-1c07340b109e?q=80&w=300&h=300&auto=format&fit=crop',
    color: 'from-green-400 to-emerald-600',
  },
];
