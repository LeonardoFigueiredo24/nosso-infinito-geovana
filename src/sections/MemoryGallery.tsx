'use client';
import { useState } from 'react';
import { memories } from '@/data/memories';
import { MemoryCard } from '@/components/MemoryCard';
import { PhotoLightbox } from '@/components/PhotoLightbox';
import { Reveal } from '@/components/Reveal';
import { Ornament } from '@/components/Ornament';
import type { Memory } from '@/lib/types';

const categories = ['Todas', 'Nosso jeitinho', 'Dias especiais', 'Pelo mundo'] as const;
export function MemoryGallery() {
  const [category, setCategory] = useState<string>('Todas');
  const [selected, setSelected] = useState<Memory | null>(null);
  const filtered = category === 'Todas' ? memories : memories.filter(memory => memory.category === category);
  return <section id="memorias" className="gallery-section section-shell" aria-labelledby="memories-title">
    <Reveal className="section-heading"><Ornament /><h2 id="memories-title">Nossas <em>memórias</em></h2><p>28 pedacinhos da nossa história.<br className="mobile-only" /> Um amor inteiro em cada um.</p></Reveal>
    <div className="gallery-toolbar"><div className="filters" role="group" aria-label="Filtrar memórias">{categories.map(item => <button key={item} className={category === item ? 'is-selected' : ''} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}{item === 'Todas' && <span>28</span>}</button>)}</div><span className="gallery-hint">Toque em uma foto para reviver</span></div>
    <p className="sr-only" role="status">{filtered.length} memórias nesta seleção</p>
    <div className="memories-grid">{filtered.map((memory, i) => <Reveal key={memory.id} delay={Math.min(i % 3 * .06, .12)}><MemoryCard memory={memory} onOpen={() => setSelected(memory)} /></Reveal>)}</div>
    <div className="gallery-end"><Ornament /><p>E o mais bonito?<br /><em>Ainda temos tanto para viver.</em></p><a href="#historia" className="text-link">A nossa história continua</a></div>
    <PhotoLightbox memory={selected} memories={filtered} onChange={setSelected} onClose={() => setSelected(null)} />
  </section>;
}
