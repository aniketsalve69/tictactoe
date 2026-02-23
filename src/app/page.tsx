'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [player1, setPlayer1] = useLocalStorage('p1_name', 'Player 1');
  const [player2, setPlayer2] = useLocalStorage('p2_name', 'Player 2');
  const [error, setError] = useState('');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!player1.trim() || !player2.trim()) {
      setError('Please enter both names');
      return;
    }
    if (player1 === player2) {
      setError('Names must be different');
      return;
    }
    router.push('/game');
  };

  return (
    <div className={`${styles.card} glass fade-in`}>
      <h1 className={styles.title}>Welcome to <span className={styles.titleSpan}>TicTacToe</span></h1>
      <p className={styles.subtitle}>Enter player names to start the match</p>

      <form onSubmit={handleStart} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Player X</label>
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            placeholder="Name for X"
            maxLength={15}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.inputLabel}>Player O</label>
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            placeholder="Name for O"
            maxLength={15}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={`primary ${styles.submitButton}`}>
          Start Game
        </button>
      </form>
    </div>
  );
}
