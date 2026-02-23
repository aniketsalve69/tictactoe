'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';
import styles from './records.module.css';

interface GameRecord {
 winner: string;
 p1: string;
 p2: string;
 date: string;
 moves: number;
}

export default function RecordsPage() {
 const [records, setRecords] = useLocalStorage<GameRecord[]>('game_records', []);

 const clearRecords = () => {
  if (typeof window !== 'undefined' && window.confirm('Are you sure you want to clear all records?')) {
   setRecords([]);
  }
 };

 return (
  <div className={`${styles.container} glass fade-in`}>
   <div className={styles.header}>
    <h1 className={styles.title}>Match <span className={styles.titleSpan}>History</span></h1>
    {records.length > 0 && (
     <button onClick={clearRecords} className="outline">
      Clear All
     </button>
    )}
   </div>

   {records.length === 0 ? (
    <div className={styles.empty}>
     <p>No matches recorded yet.</p>
     <p className={styles.hint}>Go play a game to see records here!</p>
    </div>
   ) : (
    <div className={styles.tableWrapper}>
     <table className={styles.table}>
      <thead>
       <tr>
        <th className={styles.th}>Date</th>
        <th className={styles.th}>Players</th>
        <th className={styles.th}>Winner</th>
        <th className={styles.th}>Moves</th>
       </tr>
      </thead>
      <tbody>
       {records.slice().reverse().map((record, i) => (
        <tr key={i}>
         <td className={styles.td}>{record.date.split(',')[0]}</td>
         <td className={styles.td}>
          <span className={styles.players}>
           {record.p1} vs {record.p2}
          </span>
         </td>
         <td className={styles.td}>
          <span className={record.winner === 'Draw' ? styles.draw : styles.winner}>
           {record.winner}
          </span>
         </td>
         <td className={styles.td}>{record.moves}</td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   )}
  </div>
 );
}
