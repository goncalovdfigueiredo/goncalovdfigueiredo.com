// src/components/ArcadeHub.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Play, Zap, Cpu, Binary, ArrowLeft, Gamepad2 } from "lucide-react";
import { GlassCard } from "./ui/glass-card";

// ==========================================
// 1. MINIJOGO: PCB TRACE SNAKE
// ==========================================
const SNAKE_GRID = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }, { x: 7, y: 8 }, { x: 7, y: 9 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };

interface PcbSnakeProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToHub: () => void;
  onEarnCredits: (amount: number) => void;
}

export function PcbSnakeGame({ isOpen, onClose, onBackToHub, onEarnCredits }: PcbSnakeProps) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [component, setComponent] = useState({ x: 3, y: 3 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const spawnComponent = useCallback(() => {
    const x = Math.floor(Math.random() * SNAKE_GRID);
    const y = Math.floor(Math.random() * SNAKE_GRID);
    setComponent({ x, y });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      switch (e.key) {
        case "ArrowUp": if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case "ArrowDown": if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case "ArrowLeft": if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case "ArrowRight": if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, isPlaying]);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { x: prevSnake[0].x + direction.x, y: prevSnake[0].y + direction.y };
        if (head.x < 0 || head.x >= SNAKE_GRID || head.y < 0 || head.y >= SNAKE_GRID || prevSnake.some((s) => s.x === head.x && s.y === head.y)) {
          setIsGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }
        const newSnake = [head, ...prevSnake];
        if (head.x === component.x && head.y === component.y) {
          setScore((s) => s + 1);
          spawnComponent();
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying, direction, component, isGameOver, spawnComponent]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    spawnComponent();
  };

  const claimCredits = () => {
    const earned = Math.floor(score / 2);
    if (earned > 0) {
      onEarnCredits(earned);
      setIsPlaying(false);
      setIsGameOver(false);
      setScore(0);
      onBackToHub();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg z-10 flex flex-col">
        <GlassCard className="flex flex-col w-full rounded-3xl overflow-hidden border border-emerald-500/40 bg-zinc-950/95 relative p-6 shadow-2xl text-center">
          
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors">
              <ArrowLeft className="w-4 h-4" /> <span>Back to Hub</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700"><X className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <Cpu className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">MINIGAME // PCB ROUTING</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mb-1">Copper Trace Snake</h3>
          <p className="text-xs text-zinc-400 mb-4">Route copper traces to collect components for credits!</p>

          <div className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-xl mb-4 border border-white/5 font-mono text-xs">
            <span className="text-emerald-400">Components: <strong className="text-white">{score}</strong></span>
            <span className="text-purple-400">Credits: <strong className="text-white">{Math.floor(score / 2)}</strong></span>
          </div>

          <div className="relative bg-zinc-900/90 p-3 rounded-2xl border border-emerald-500/30 shadow-inner flex justify-center items-center aspect-square max-w-[280px] mx-auto overflow-hidden">
            <div className="grid gap-[2px] relative z-10" style={{ gridTemplateColumns: `repeat(${SNAKE_GRID}, minmax(0, 1fr))` }}>
              {Array.from({ length: SNAKE_GRID }).map((_, r) =>
                Array.from({ length: SNAKE_GRID }).map((_, c) => {
                  const isHead = snake[0].x === c && snake[0].y === r;
                  const isBody = snake.slice(1).some((s) => s.x === c && s.y === r);
                  const isComp = component.x === c && component.y === r;
                  let cell = "bg-zinc-950/60 border border-white/[0.03]";
                  if (isHead) cell = "bg-emerald-400 shadow-[0_0_10px_#34d399] rounded-sm";
                  else if (isBody) cell = "bg-emerald-600/80 rounded-sm";
                  else if (isComp) cell = "bg-amber-400 animate-ping rounded-full";
                  return <div key={`${r}-${c}`} className={`w-4 h-4 md:w-4 md:h-4 ${cell}`} />;
                })
              )}
            </div>
            {(!isPlaying || isGameOver) && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20 p-4">
                <span className="text-sm font-bold text-white font-mono">{isGameOver ? "⚠️ SHORT CIRCUIT!" : "READY TO ROUTE?"}</span>
                <div className="flex gap-2">
                  <button onClick={startGame} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase shadow-md flex items-center gap-1.5"><Play className="w-3.5 h-3.5" /> {isGameOver ? "Retry" : "Start"}</button>
                  {score >= 2 && <button onClick={claimCredits} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold uppercase shadow-md animate-bounce flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Claim</button>}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

// ==========================================
// 2. MINIJOGO: BOOLEAN STATE PONG
// ==========================================
interface LogicPongProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToHub: () => void;
  onEarnCredits: (amount: number) => void;
}

export function LogicPongGame({ isOpen, onClose, onBackToHub, onEarnCredits }: LogicPongProps) {
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">("MEDIUM");
  const [paddlePlayerY, setPaddlePlayerY] = useState(35);
  const [paddleAiY, setPaddleAiY] = useState(35);
  const [ball, setBall] = useState({ x: 50, y: 50, vx: 1.5, vy: 1.2, state: 1 });
  const [score, setScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = document.getElementById("pong-arena");
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      if (y >= 0 && y <= 75) setPaddlePlayerY(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const aiSpeed = difficulty === "EASY" ? 0.7 : difficulty === "MEDIUM" ? 1.3 : 2.1;

    const loop = setInterval(() => {
      setBall((b) => {
        let nx = b.x + b.vx;
        let ny = b.y + b.vy;
        let nvx = b.vx;
        let nvy = b.vy;
        let nState = b.state;

        setPaddleAiY((aiY) => {
          let targetY = b.y - 12;
          let diff = targetY - aiY;
          return Math.max(0, Math.min(75, aiY + Math.sign(diff) * Math.min(Math.abs(diff), aiSpeed)));
        });

        if (ny <= 2) { ny = 2; nvy = -nvy; }
        if (ny >= 92) { ny = 92; nvy = -nvy; }

        if (nx <= 8 && nx >= 4 && ny >= paddlePlayerY && ny <= paddlePlayerY + 25) {
          nx = 9;
          nvx = -nvx * 1.04;
          nState = nState === 1 ? 0 : 1;
          setScore((s) => s + 1);
        }

        if (nx >= 90 && nx <= 94 && ny >= paddleAiY && ny <= paddleAiY + 25) {
          nx = 89;
          nvx = -nvx * 1.04;
          nState = nState === 1 ? 0 : 1;
        }

        if (nx <= 0) {
          setAiScore((as) => as + 1);
          setIsPlaying(false);
          return { x: 50, y: 50, vx: 1.5, vy: 1.2, state: 1 };
        }

        if (nx >= 100) {
          setScore((s) => s + 2);
          nvx = -nvx;
        }

        return { x: nx, y: ny, vx: nvx, vy: nvy, state: nState };
      });
    }, 25);

    return () => clearInterval(loop);
  }, [isPlaying, paddlePlayerY, paddleAiY, difficulty]);

  const claimCredits = () => {
    const earned = Math.floor(score / 2);
    if (earned > 0) {
      onEarnCredits(earned);
      setIsPlaying(false);
      setScore(0);
      setAiScore(0);
      onBackToHub();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-lg z-10 flex flex-col">
        <GlassCard className="flex flex-col w-full rounded-3xl overflow-hidden border border-blue-500/40 bg-zinc-950/95 relative p-6 shadow-2xl text-center">
          
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono">
              <ArrowLeft className="w-4 h-4" /> <span>Back to Hub</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700"><X className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <Binary className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">ARCADE // LOGIC PONG VS AI</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mb-1">Boolean State Pong</h3>

          <div className="flex justify-center gap-2 my-2">
            {(["EASY", "MEDIUM", "HARD"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                  difficulty === lvl ? "bg-blue-600 text-white shadow-[0_0_10px_#3b82f6]" : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-xl mb-3 border border-white/5 font-mono text-xs">
            <span className="text-blue-400">Player: <strong className="text-white">{score}</strong></span>
            <span className="text-purple-400">State: <strong className="text-emerald-400">{ball.state}</strong></span>
            <span className="text-red-400">AI: <strong className="text-white">{aiScore}</strong></span>
          </div>

          <div id="pong-arena" className="relative bg-zinc-900/90 rounded-2xl border border-blue-500/30 shadow-inner h-52 w-full overflow-hidden cursor-none">
            <div className="absolute left-3 w-2.5 h-14 rounded bg-blue-500 shadow-[0_0_10px_#3b82f6]" style={{ top: `${paddlePlayerY}%` }} />
            <div className="absolute right-3 w-2.5 h-14 rounded bg-red-500 shadow-[0_0_10px_#ef4444]" style={{ top: `${paddleAiY}%` }} />
            <div className={`absolute w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-bold text-black ${ball.state === 1 ? 'bg-emerald-400' : 'bg-amber-400'}`} style={{ left: `${ball.x}%`, top: `${ball.y}%` }}>
              {ball.state}
            </div>

            {!isPlaying && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20 p-4">
                <span className="text-sm font-bold text-white font-mono">VS AI ROBOT // READY?</span>
                <div className="flex gap-2">
                  <button onClick={() => { setIsPlaying(true); setScore(0); setBall({ x: 50, y: 50, vx: 1.5, vy: 1.2, state: 1 }); }} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase shadow-md flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5" /> Start Match
                  </button>
                  {score >= 2 && (
                    <button onClick={claimCredits} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold uppercase shadow-md animate-bounce flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Claim Credits
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

// ==========================================
// 3. MINIJOGO: TETRIS (PCB STACK)
// ==========================================
const TETRIS_ROWS = 14;
const TETRIS_COLS = 8;

interface TetrisProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToHub: () => void;
  onEarnCredits: (amount: number) => void;
}

export function TetrisGame({ isOpen, onClose, onBackToHub, onEarnCredits }: TetrisProps) {
  const [grid, setGrid] = useState<number[][]>(() => Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLS).fill(0)));
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const SHAPES = [
    [[1, 1], [1, 1]],
    [[1, 1, 1, 1]],
    [[0, 1, 0], [1, 1, 1]],
    [[1, 1, 0], [0, 1, 1]]
  ];

  const [currentPiece, setCurrentPiece] = useState({ shape: SHAPES[0], r: 0, c: 3 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const spawnPiece = useCallback(() => {
    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    setCurrentPiece({ shape, r: 0, c: Math.floor(TETRIS_COLS / 2) - 1 });
  }, []);

  const startGame = () => {
    setGrid(Array.from({ length: TETRIS_ROWS }, () => Array(TETRIS_COLS).fill(0)));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    spawnPiece();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      if (e.key === "ArrowLeft") {
        setCurrentPiece(p => ({ ...p, c: Math.max(0, p.c - 1) }));
      } else if (e.key === "ArrowRight") {
        setCurrentPiece(p => ({ ...p, c: Math.min(TETRIS_COLS - p.shape[0].length, p.c + 1) }));
      } else if (e.key === "ArrowDown") {
        setCurrentPiece(p => ({ ...p, r: p.r + 1 }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, gameOver]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const timer = setInterval(() => {
      setCurrentPiece(p => {
        const nextR = p.r + 1;
        let hit = false;
        p.shape.forEach((row, sR) => {
          row.forEach((val, sC) => {
            if (val) {
              const targetR = nextR + sR;
              const targetC = p.c + sC;
              if (targetR >= TETRIS_ROWS || (targetR >= 0 && grid[targetR]?.[targetC])) {
                hit = true;
              }
            }
          });
        });

        if (hit) {
          const newGrid = grid.map(row => [...row]);
          p.shape.forEach((row, sR) => {
            row.forEach((val, sC) => {
              if (val && p.r + sR >= 0) {
                if (newGrid[p.r + sR]) {
                  newGrid[p.r + sR][p.c + sC] = 1;
                }
              }
            });
          });

          if (p.r <= 0) {
            setGameOver(true);
            setIsPlaying(false);
            return p;
          }

          setGrid(newGrid);
          setScore(s => s + 10);
          spawnPiece();
          return p;
        }

        return { ...p, r: nextR };
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isPlaying, gameOver, grid, spawnPiece]);

  const claimCredits = () => {
    const earned = Math.floor(score / 40);
    if (earned > 0) {
      onEarnCredits(earned);
      setIsPlaying(false);
      setScore(0);
      onBackToHub();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-md z-10 flex flex-col">
        <GlassCard className="flex flex-col w-full rounded-3xl overflow-hidden border border-purple-500/40 bg-zinc-950/95 relative p-6 shadow-2xl text-center">
          
          <div className="flex items-center justify-between mb-2">
            <button onClick={onBackToHub} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono">
              <ArrowLeft className="w-4 h-4" /> <span>Back to Hub</span>
            </button>
            <button onClick={onClose} className="p-2 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700"><X className="w-4 h-4" /></button>
          </div>

          <div className="flex items-center justify-center gap-2 mb-1">
            <Gamepad2 className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">MINIGAME // PCB STACK TETRIS</span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mb-1">Component Stacker</h3>
          <p className="text-xs text-zinc-400 mb-4">Use arrow keys (← → ↓) to stack components!</p>

          <div className="flex justify-between items-center bg-zinc-900 px-4 py-2 rounded-xl mb-3 border border-white/5 font-mono text-xs">
            <span className="text-purple-400">Score: <strong className="text-white">{score}</strong></span>
            <span className="text-emerald-400">Credits: <strong className="text-white">{Math.floor(score / 40)}</strong></span>
          </div>

          <div className="relative bg-zinc-950 p-2 rounded-2xl border border-purple-500/30 shadow-inner flex justify-center items-center max-w-[200px] mx-auto overflow-hidden">
            <div className="grid gap-[1px]" style={{ gridTemplateColumns: `repeat(${TETRIS_COLS}, minmax(0, 1fr))` }}>
              {grid.map((row, r) =>
                row.map((cell, c) => {
                  let isCurrent = false;
                  currentPiece.shape.forEach((sr, sRow) => {
                    sr.forEach((val, sCol) => {
                      if (val && currentPiece.r + sRow === r && currentPiece.c + sCol === c) isCurrent = true;
                    });
                  });
                  return (
                    <div key={`${r}-${c}`} className={`w-4 h-4 rounded-xs ${isCurrent ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' : cell ? 'bg-zinc-700' : 'bg-zinc-900/60'}`} />
                  );
                })
              )}
            </div>

            {(!isPlaying || gameOver) && (
              <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20 p-4">
                <span className="text-sm font-bold text-white font-mono">{gameOver ? "⚠️ STACK OVERFLOW!" : "READY TO STACK?"}</span>
                <div className="flex gap-2">
                  <button onClick={startGame} className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono font-bold uppercase shadow-md flex items-center gap-1.5"><Play className="w-3.5 h-3.5" /> {gameOver ? "Retry" : "Start"}</button>
                  {score >= 40 && <button onClick={claimCredits} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase shadow-md animate-bounce flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Claim</button>}
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}