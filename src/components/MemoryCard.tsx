'use client';
import { Heart, Expand } from 'lucide-react';
import { Photo } from './Photo';
import type { Memory } from '@/lib/types';

export function MemoryCard({ memory, onOpen }: { memory: Memory; onOpen: () => void }) {
  return <article className="memory-card">
    <button className="memory-photo-button" onClick={onOpen} aria-label={`Ampliar foto: ${memory.title}`}>
      <Photo memory={memory} />
      <span className="photo-expand" aria-hidden="true"><Expand size={17} /></span>
      <span className="photo-number" aria-hidden="true">{String(memory.id).padStart(2, '0')}</span>
    </button>
    <div className="memory-caption"><div className="memory-heading"><h3>{memory.title}</h3><Heart size={17} strokeWidth={1.2} aria-hidden="true" /></div><p>{memory.message}</p>{memory.date && <small>{memory.date}</small>}</div>
  </article>;
}
