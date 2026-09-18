// src/components/PercursoCrosswordModal.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Trophy, RotateCcw, HelpCircle, Grid, LockKeyholeOpen } from "lucide-react";
import { GlassCard } from "./ui/glass-card";

interface CrosswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRID_SIZE = 16;
const WORDS = [
  { id: 1, word: "AVEIRO", clue: "University of your Master's degree in Physics", row: 1, col: 2, dir: "H" },
  { id: 2, word: "TECNICO", clue: "Institution where you pursue your PhD", row: 1, col: 7, dir: "V" },
  { id: 3, word: "KICAD", clue: "EDA software used for PCB schematic and layout", row: 7, col: 3, dir: "H" },
  { id: 4, word: "VLC", clue: "Visible Light Communication technology", row: 4, col: 3, dir: "V" },
  { id: 5, word: "SCOUT", clue: "13-year track record in CNE youth leadership", row: 9, col: 1, dir: "H" },
  { id: 6, word: "ESP32", clue: "Microcontroller used in solar telemetry board", row: 3, col: 9, dir: "V" },
  { id: 7, word: "PYTHON", clue: "Language commonly used for data analysis & scripting", row: 11, col: 4, dir: "H" },
  { id: 8, word: "ANDROID", clue: "Mobile OS platform for your custom decoder apps", row: 6, col: 12, dir: "V" },
  { id: 9, word: "SENSOR", clue: "Capacitive device for respiratory monitoring", row: 13, col: 2, dir: "H" },
  { id: 10, word: "HARDWARE", clue: "Engineering domain focused on physical PCBs", row: 2, col: 14, dir: "V" },
  { id: 11, word: "BLUETOOTH", clue: "Wireless protocol used in your telemetry nodes", row: 15, col: 6, dir: "H" },
  { id: 12, word: "CRYPTO", clue: "Applied field in your anti-counterfeiting tags", row: 8, col: 5, dir: "V" },
  { id: 13, word: "PCB", clue: "Printed Circuit Board designed in your projects", row: 5, col: 5, dir: "H" },
  { id: 14, word: "JAVA", clue: "Programming language used in early Android apps", row: 4, col: 1, dir: "V" },
  { id: 15, word: "SOLAR", clue: "Power source for your IoT telemetry board", row: 3, col: 1, dir: "H" },
  { id: 16, word: "LISBON", clue: "City where Instituto Superior Técnico is located", row: 1, col: 7, dir: "H" },
  { id: 17, word: "COPILOT", clue: "AI coding assistant helping build this portfolio", row: 10, col: 11, dir: "V" },
  { id: 18, word: "LEADERSHIP", clue: "Core skill honed through 13 years of scouting", row: 12, col: 3, dir: "V" },
  { id: 19, word: "THESIS", clue: "Academic dissertation supervised or authored", row: 14, col: 9, dir: "H" },
  { id: 20, word: "GIT", clue: "Version control system for source code tracking", row: 1, col: 16, dir: "V" }
];

const INITIAL_SUDOKU = [
  [1, 0, 3, 4, 0, 6],
  [4, 0, 6, 1, 2, 3],
  [0, 1, 2, 0, 4, 5],
  [5, 4, 0, 2, 3, 0],
  [2, 3, 4, 5, 0, 1],
  [6, 5, 1, 3, 0, 0]
];

export default function PercursoCrosswordModal({ isOpen, onClose }: CrosswordModalProps) {
  const [userGrid, setUserGrid] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeClue, setActiveClue] = useState<string>("Click any cell to view the clue!");

  // Estados do Mini-Sudoku
  const [isSudokuOpen, setIsSudokuOpen] = useState(false);
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>(INITIAL_SUDOKU);
  const [sudokuMessage, setSudokuMessage] = useState<string>("");
  const [sudokuSolved, setSudokuSolved] = useState(false);

  // Estados para selecionar a palavra e a letra a revelar
  const [selectedWordId, setSelectedWordId] = useState<number>(1);
  const [letterIndex, setLetterIndex] = useState<number>(0);

  if (!isOpen) return null;

  const solutionMap: Record<string, { letter: string; wordId: number }> = {};
  WORDS.forEach((item) => {
    for (let i = 0; i < item.word.length; i++) {
      const r = item.dir === "H" ? item.row : item.row + i;
      const c = item.dir === "H" ? item.col + i : item.col;
      solutionMap[`${r}-${c}`] = { letter: item.word[i], wordId: item.id };
    }
  });

  const handleInputChange = (r: number, c: number, val: string) => {
    const upperVal = val.toUpperCase().slice(-1);
    const key = `${r}-${c}`;
    const newGrid = { ...userGrid, [key]: upperVal };
    setUserGrid(newGrid);

    let won = true;
    const keys = Object.keys(solutionMap);
    for (const k of keys) {
      if (newGrid[k] !== solutionMap[k].letter) {
        won = false;
        break;
      }
    }
    if (won && keys.length > 0) setIsCompleted(true);
  };

  const resetGame = () => {
    setUserGrid({});
    setIsCompleted(false);
    setActiveClue("Game reset. Click a cell!");
  };

  const handleSudokuChange = (r: number, c: number, val: string) => {
    if (INITIAL_SUDOKU[r][c] !== 0) return;
    const num = parseInt(val) || 0;
    if (num >= 0 && num <= 6) {
      const newBoard = sudokuBoard.map((row, rowIndex) =>
        row.map((cell, colIndex) => (rowIndex === r && colIndex === c ? num : cell))
      );
      setSudokuBoard(newBoard);
    }
  };

  const verifySudoku = () => {
    let isCorrect = true;
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 6; c++) {
        if (sudokuBoard[r][c] === 0) {
          isCorrect = false;
          break;
        }
      }
    }

    if (!isCorrect) {
      setSudokuMessage("Please fill all empty cells first!");
      setSudokuSolved(false);
      return;
    }

    setSudokuSolved(true);
    setSudokuMessage("Sudoku solved! You can now choose a letter to unlock.");
  };

  const revealSelectedLetter = () => {
    const wordObj = WORDS.find(w => w.id === Number(selectedWordId));
    if (!wordObj) return;

    const targetChar = wordObj.word[letterIndex];
    if (!targetChar) return;

    const r = wordObj.dir === "H" ? wordObj.row : wordObj.row + letterIndex;
    const c = wordObj.dir === "H" ? wordObj.col + letterIndex : wordObj.col;
    
    handleInputChange(r, c, targetChar);
    setIsSudokuOpen(false);
  };

  const currentSelectedWord = WORDS.find(w => w.id === Number(selectedWordId));

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer" />
      
      <motion.div initial={{ scale: 0.9, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 20, opacity: 0 }} className="relative w-full max-w-4xl z-10 flex flex-col max-h-[92vh]">
        <GlassCard className="flex flex-col w-full rounded-3xl overflow-hidden border border-emerald-500/40 bg-zinc-950/95 relative p-6 md:p-8 shadow-2xl text-left">
          <button onClick={onClose} className="absolute top-4 right-4 z-30 p-2 rounded-full bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors shadow-sm">
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2 pr-12">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">EASTER EGG // 20-WORD CHALLENGE</span>
              <h3 className="text-xl font-black text-white tracking-tight">Percurso Crossword Challenge</h3>
            </div>
          </div>

          <p className="text-xs text-zinc-400 mb-4">Test your knowledge of my academic background, engineering projects, and scouting track record by solving this 20-word puzzle.</p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start overflow-y-auto max-h-[55vh] pr-2 custom-scrollbar">
            {/* Grelha de Cruzadas */}
            <div className="lg:col-span-8 flex justify-center bg-zinc-900/90 p-4 rounded-2xl border border-white/10 shadow-inner overflow-x-auto">
              <div 
                className="grid gap-0.5"
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: GRID_SIZE }).map((_, rowIndex) =>
                  Array.from({ length: GRID_SIZE }).map((_, colIndex) => {
                    const r = rowIndex + 1;
                    const c = colIndex + 1;
                    const key = `${r}-${c}`;
                    const isCellActive = solutionMap[key] !== undefined;

                    if (!isCellActive) return <div key={key} className="w-5 h-5 md:w-6 md:h-6" />;

                    const cellData = solutionMap[key];
                    const isCorrect = userGrid[key] === cellData.letter;

                    return (
                      <div key={key} className="relative">
                        <input
                          type="text"
                          maxLength={1}
                          value={userGrid[key] || ""}
                          onChange={(e) => handleInputChange(r, c, e.target.value)}
                          onFocus={() => {
                            const foundWord = WORDS.find(w => w.id === cellData.wordId);
                            if (foundWord) setActiveClue(`Clue #${foundWord.id}: ${foundWord.clue}`);
                          }}
                          className={`w-5 h-5 md:w-6 md:h-6 text-center text-[10px] md:text-xs font-bold uppercase rounded transition-all outline-none border ${
                            isCompleted ? "bg-emerald-500/20 border-emerald-500 text-emerald-300" : isCorrect ? "bg-emerald-500/10 border-emerald-500/50 text-white" : "bg-zinc-800 border-zinc-700 text-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                          }`}
                        />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Pistas */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-start gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>{activeClue}</span>
              </div>
              <div className="space-y-1 bg-zinc-900/60 p-3 rounded-xl border border-white/5 text-xs max-h-[220px] overflow-y-auto custom-scrollbar">
                <span className="font-bold text-zinc-300 uppercase tracking-wider text-[10px] block mb-1 font-mono">// Clues List (20 Words):</span>
                {WORDS.map((w) => (
                  <div key={w.id} onClick={() => setActiveClue(`Clue #${w.id}: ${w.clue}`)} className="p-1 rounded hover:bg-white/5 cursor-pointer text-zinc-400 hover:text-white transition-colors text-[10px] leading-tight">
                    <strong className="text-emerald-400 font-mono">#{w.id}</strong> {w.clue}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RODAPÉ COM O BOTÃO DE SUDOKU BEM VISÍVEL */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            {isCompleted ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm animate-bounce">
                <Trophy className="w-5 h-5" />
                <span>Awesome! All 20 words solved successfully!</span>
              </div>
            ) : (
              <button 
                onClick={() => setIsSudokuOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-300 text-xs font-mono font-bold transition-all shadow-md"
              >
                <Grid className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>{sudokuSolved ? "🔓 Sudoku Solved! Click to Unlock a Letter" : "💡 Need a Hint? Play Mini-Sudoku (6x6)"}</span>
              </button>
            )}

            <button onClick={resetGame} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* ========================================== */}
      {/* MINI POPUP DO SUDOKU E SELETOR DE LETRAS */}
      {/* ========================================== */}
      <AnimatePresence>
        {isSudokuOpen && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-zinc-900 border border-purple-500/50 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative text-center">
              <button onClick={() => setIsSudokuOpen(false)} className="absolute top-3 right-3 p-1 rounded-full bg-zinc-800 text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>

              <h4 className="text-base font-bold text-white mb-1">Mini-Sudoku (6x6)</h4>
              <p className="text-[11px] text-zinc-400 mb-4">Solve the puzzle correctly to unlock your helper letter!</p>

              <div className="grid grid-cols-6 gap-1 mb-4 bg-zinc-950 p-2 rounded-xl border border-white/10 justify-center">
                {sudokuBoard.map((row, rIdx) =>
                  row.map((cell, cIdx) => {
                    const isOriginal = INITIAL_SUDOKU[rIdx][cIdx] !== 0;
                    return (
                      <input
                        key={`${rIdx}-${cIdx}`}
                        type="text"
                        maxLength={1}
                        value={cell === 0 ? "" : cell}
                        disabled={isOriginal || sudokuSolved}
                        onChange={(e) => handleSudokuChange(rIdx, cIdx, e.target.value)}
                        className={`w-9 h-9 text-center text-sm font-bold rounded border ${
                          isOriginal ? "bg-zinc-800 text-purple-300 border-zinc-700" : "bg-zinc-900 text-white border-zinc-700 focus:border-purple-400"
                        }`}
                      />
                    );
                  })
                )}
              </div>

              {sudokuMessage && (
                <p className={`text-[11px] mb-3 font-mono ${sudokuSolved ? "text-emerald-400" : "text-amber-400"}`}>
                  {sudokuMessage}
                </p>
              )}

              {!sudokuSolved ? (
                <button
                  onClick={verifySudoku}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md"
                >
                  Verify Sudoku Solution
                </button>
              ) : (
                <div className="mt-2 pt-3 border-t border-white/10 space-y-3 text-left">
                  <span className="text-[11px] font-bold text-emerald-400 block font-mono">✨ Sudoku Cleared! Select Letter to Reveal:</span>
                  
                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Choose Word:</label>
                    <select
                      value={selectedWordId}
                      onChange={(e) => {
                        setSelectedWordId(Number(e.target.value));
                        setLetterIndex(0);
                      }}
                      className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg p-1.5 outline-none"
                    >
                      {WORDS.map(w => (
                        <option key={w.id} value={w.id}>#{w.id} - {w.word} </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-zinc-400 block mb-1">Letter Index (0 to {currentSelectedWord ? currentSelectedWord.word.length - 1 : 0}):</label>
                    <select
                      value={letterIndex}
                      onChange={(e) => setLetterIndex(Number(e.target.value))}
                      className="w-full bg-zinc-950 border border-zinc-700 text-xs text-white rounded-lg p-1.5 outline-none font-mono"
                    >
                      {currentSelectedWord && currentSelectedWord.word.split("").map((char, idx) => (
                        <option key={idx} value={idx}>
                          Index {idx} (Letter: {char})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={revealSelectedLetter}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <LockKeyholeOpen className="w-4 h-4" />
                    <span>Unlock This Letter in Crossword</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}