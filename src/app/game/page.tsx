'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './game.module.css';

type Player = 'X' | 'O';
type SquareValue = Player | null;

interface GameRecord {
 winner: string;
 p1: string;
 p2: string;
 date: string;
 moves: number;
}

export default function GamePage() {
 const router = useRouter();
 const [player1Name] = useLocalStorage('p1_name', 'Player 1');
 const [player2Name] = useLocalStorage('p2_name', 'Player 2');
 const [records, setRecords] = useLocalStorage<GameRecord[]>('game_records', []);

 const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
 const [isXNext, setIsXNext] = useState(true);
 const [winner, setWinner] = useState<SquareValue | 'Draw'>(null);
 const [winningLine, setWinningLine] = useState<number[] | null>(null);

 const calculateWinner = (squares: SquareValue[]) => {
  const lines = [
   [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
   [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
   [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
   const [a, b, c] = lines[i];
   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
    return { winner: squares[a], line: lines[i] };
   }
  }
  if (squares.every(s => s !== null)) return { winner: 'Draw' as const, line: null };
  return null;
 };

 const handleClick = (i: number) => {
  if (board[i] || winner) return;

  const newBoard = board.slice();
  newBoard[i] = isXNext ? 'X' : 'O';
  setBoard(newBoard);
  setIsXNext(!isXNext);

  const result = calculateWinner(newBoard);
  if (result) {
   setWinner(result.winner);
   setWinningLine(result.line);

   // Save record
   const newRecord: GameRecord = {
    winner: result.winner === 'Draw' ? 'Draw' : (result.winner === 'X' ? player1Name : player2Name),
    p1: player1Name,
    p2: player2Name,
    date: new Date().toLocaleString(),
    moves: newBoard.filter(s => s !== null).length
   };
   setRecords([...records, newRecord]);
  }
 };

 const resetGame = () => {
  setBoard(Array(9).fill(null));
  setIsXNext(true);
  setWinner(null);
  setWinningLine(null);
 };

 return (
  <div className={`${styles.gameContainer} fade-in`}>
   <div className={styles.header}>
    <div className={`${styles.playerCard} ${isXNext && !winner ? styles.active : ''} glass`}>
     <span className={styles.symbol}>X</span>
     <span className={styles.name}>{player1Name}</span>
    </div>
    <div className={styles.vs}>VS</div>
    <div className={`${styles.playerCard} ${!isXNext && !winner ? styles.active : ''} glass`}>
     <span className={styles.symbol}>O</span>
     <span className={styles.name}>{player2Name}</span>
    </div>
   </div>

   <div className={styles.status}>
    {winner === 'Draw' ? (
     <h2 className={styles.resultText}>It&apos;s a <span className={styles.draw}>Draw!</span></h2>
    ) : winner ? (
     <h2 className={styles.resultText}>
      Winner: <span className={winner === 'X' ? styles.x : styles.o}>
       {winner === 'X' ? player1Name : player2Name}
      </span>
     </h2>
    ) : (
     <p className={styles.turnText}>
      It&apos;s <span className={isXNext ? styles.x : styles.o}>
       {isXNext ? player1Name : player2Name}
      </span>&apos;s turn
     </p>
    )}
   </div>

   <div className={`${styles.board} glass`}>
    {board.map((square, i) => (
     <button
      key={i}
      className={`${styles.square} ${winningLine?.includes(i) ? styles.winning : ''}`}
      onClick={() => handleClick(i)}
     >
      <span className={square === 'X' ? styles.x : styles.o}>
       {square}
      </span>
     </button>
    ))}
   </div>

   <div className={styles.actions}>
    <button onClick={resetGame} className="outline">
     Reset Board
    </button>
    <button onClick={() => router.push('/')} className="primary">
     New Players
    </button>
   </div>
  </div>
 );
}
