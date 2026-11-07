'use client';
import { useEffect, useRef, useState } from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { content } from '@/data/content';
import { Modal } from '@/components/Modal';
import { Reveal } from '@/components/Reveal';
import { Ornament } from '@/components/Ornament';

export function LetterSection() {
  const [open, setOpen] = useState(false);
  const [unsealing, setUnsealing] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const read = () => { setUnsealing(true); timer.current = setTimeout(() => setOpen(true), reduced ? 0 : 550); };
  return <section id="carta" className="letter-section section-shell" aria-labelledby="letter-title">
    <Reveal className="letter-copy"><Ornament /><h2 id="letter-title">Uma carta<br /><em>para você</em></h2><p>Algumas coisas merecem ser ditas<br />com calma. E com todo o coração.</p><span className="handwritten">Esta é uma delas.</span></Reveal>
    <Reveal className="envelope-area"><div className={`envelope ${unsealing ? 'is-open' : ''}`} aria-hidden="true"><div className="letter-peek">Meu amor…</div><div className="envelope-body" /><div className="envelope-flap" /><div className="wax-seal"><Heart size={30} strokeWidth={1} /></div><span className="envelope-to">Para Geovana</span><span className="envelope-from">com todo o meu amor</span></div>
      <button className="button primary" onClick={read} disabled={unsealing && !open}>Ler minha carta <ArrowUpRight size={18} /></button>
    </Reveal>
    <Modal open={open} onClose={() => { setOpen(false); setUnsealing(false); }} titleId="letter-modal-title" className="letter-modal">
      <Ornament /><span className="letter-date">Para guardar no coração</span><h2 id="letter-modal-title">Meu amor,</h2>
      <div className="letter-body">{content.letter.slice(1).map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
      <p className="letter-signature">{content.letterSignature}</p><Ornament />
    </Modal>
  </section>;
}
