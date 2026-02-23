'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
 const pathname = usePathname();

 return (
  <nav className={`${styles.nav} glass`}>
   <div className={`${styles.container} container`}>
    <Link href="/" className={styles.logo}>
     TIC<span className={styles.logoSpan}>TAC</span>TOE
    </Link>
    <div className={styles.links}>
     <Link href="/" className={pathname === '/' ? styles.active : ''}>
      Play
     </Link>
     <Link href="/records" className={pathname === '/records' ? styles.active : ''}>
      Records
     </Link>
    </div>
   </div>
  </nav>
 );
}
