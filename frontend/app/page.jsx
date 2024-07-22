'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';


export default function Home() {
  const [error, setError] = useState(null);

  const hexToString = (hex) => {
    if (typeof hex !== 'string' || !hex.startsWith('0x')) return hex;
    try {
      return decodeURIComponent(
        hex.slice(2).replace(/\s+/g, '').replace(/[0-9a-f]{2}/g, '%$&')
      );
    } catch (e) {
      console.error('Failed to decode hex string:', hex, e);
      return hex;
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!api) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.heroImageContainer}>
        <Image
          src="/zknowledge.jpg"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay}>
          <div className={styles.heroText}>
            <h1>StacksNotifications</h1>
            <p>Get notified when someone interacts with your smart contract</p>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.uploadButton}>
          <Link href="/upload" className={styles.button}>
            Upload a Paper
          </Link>
        </div>
      </div>
    </div>
  );
}