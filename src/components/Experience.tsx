'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { HeartIntro } from './HeartIntro';
import { Monogram } from './Ornament';
import { HeroSection } from '@/sections/HeroSection';
import { MemoryGallery } from '@/sections/MemoryGallery';
import { LoveTimeline } from '@/sections/LoveTimeline';
import { LetterSection } from '@/sections/LetterSection';
import { MusicSection } from '@/sections/MusicSection';
import { FilmSection } from '@/sections/FilmSection';
import { FooterSection } from '@/sections/FooterSection';
import { Reveal } from './Reveal';

export function Experience() {
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (!opened) return;
    const timer = setTimeout(() => { if (document.activeElement === document.body) document.getElementById('hero-title')?.focus({ preventScroll: true }); }, 100);
    return () => clearTimeout(timer);
  }, [opened]);
  const replay = () => { window.scrollTo({ top: 0, behavior: 'instant' }); window.history.replaceState(null, '', window.location.pathname); setOpened(false); };
  return <MotionConfig reducedMotion="user"><AnimatePresence mode="wait">{!opened ? <HeartIntro key="intro" onOpen={() => setOpened(true)} /> : <motion.div key="gift" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .65 }}>
    <a className="skip-link" href="#memorias">Ir para as memórias</a>
    <header className="site-header"><div className="header-inner"><a href="#inicio" aria-label="Leonardo e Geovana, início"><Monogram /></a><nav aria-label="Navegação principal"><a href="#memorias">Memórias</a><a href="#historia">Nossa história</a><a href="#carta">A carta</a></nav><span className="header-note">um amor para guardar</span></div></header>
    <main><HeroSection /><MemoryGallery /><LoveTimeline /><LetterSection /><div className="future-section section-shell" id="proximos-capitulos"><Reveal className="future-heading"><span className="handwritten">O nosso infinito ainda tem muito para contar…</span></Reveal><div className="media-grid"><MusicSection /><FilmSection /></div></div></main>
    <FooterSection onReplay={replay} />
  </motion.div>}</AnimatePresence></MotionConfig>;
}
