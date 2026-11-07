'use client';
import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Modal } from './Modal';
import { Photo } from './Photo';
import type { Memory } from '@/lib/types';

export function PhotoLightbox({ memory, memories, onChange, onClose }: {
  memory: Memory | null; memories: Memory[]; onChange: (memory: Memory) => void; onClose: () => void;
}) {
  const start = useRef<number | null>(null);
  const index = memories.findIndex(item => item.id === memory?.id);
  const navigate = (step: number) => onChange(memories[(index + step + memories.length) % memories.length]);
  useEffect(() => {
    if (!memory) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); onChange(memories[(index + 1) % memories.length]); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); onChange(memories[(index - 1 + memories.length) % memories.length]); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [memory, index, memories, onChange]);
  return <Modal open={!!memory} onClose={onClose} titleId="lightbox-title" className="lightbox">
    {memory && <>
      <div className="lightbox-photo" onTouchStart={event => { if (event.touches.length === 1) start.current = event.touches[0].clientX; }}
        onTouchEnd={event => { if (start.current !== null) { const delta = event.changedTouches[0].clientX - start.current; if (Math.abs(delta) > 55) navigate(delta < 0 ? 1 : -1); } start.current = null; }}>
        <Photo memory={memory} priority full />
      </div>
      <div className="lightbox-caption" aria-live="polite"><span className="memory-count">{String(index + 1).padStart(2, '0')} / {memories.length}</span><h2 id="lightbox-title">{memory.title}</h2><p>{memory.message}</p></div>
      <div className="lightbox-nav"><button className="icon-button" onClick={() => navigate(-1)} aria-label="Foto anterior"><ChevronLeft /></button><span>Um pedacinho de nós</span><button className="icon-button" onClick={() => navigate(1)} aria-label="Próxima foto"><ChevronRight /></button></div>
    </>}
  </Modal>;
}
