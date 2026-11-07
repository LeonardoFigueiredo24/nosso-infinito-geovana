'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Modal } from './Modal';
import { content } from '@/data/content';
export function SecretHeart() {
  const [open, setOpen] = useState(false);
  return <><button className="secret-heart" aria-label="Um pequeno coração" onClick={() => setOpen(true)}><Heart size={18} strokeWidth={1.2} /></button>
    <Modal open={open} onClose={() => setOpen(false)} titleId="secret-title" className="secret-modal"><Heart className="secret-big-heart" size={60} strokeWidth={.8} /><h2 id="secret-title">{content.secret[0]}</h2><p>{content.secret[1]}</p><span className="handwritten">Sempre seu, Leonardo.</span></Modal>
  </>;
}
