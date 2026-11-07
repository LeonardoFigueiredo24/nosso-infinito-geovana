'use client';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Monogram, Ornament } from './Ornament';
import { useHeartInteraction } from '@/hooks/useHeartInteraction';

type Particle = { x: number; y: number; dx: number; dy: number; life: number; size: number; };
export function HeartIntro({ onOpen }: { onOpen: () => void }) {
  const { progress, active, ready, touch, setActive } = useHeartInteraction();
  const [opening, setOpening] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const previous = useRef(0);
  const particleId = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 100, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 100, damping: 18 });

  useEffect(() => {
    const heading = document.getElementById('intro-title');
    if (document.activeElement === document.body) heading?.focus({ preventScroll: true });
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 360 * ratio;
    canvas.height = 360 * ratio;
    ctx.scale(ratio, ratio);
    let frame: number;
    let last = performance.now();
    const draw = (now: number) => {
      const delta = Math.min((now - last) / 16.67, 2);
      last = now;
      ctx.clearRect(0, 0, 360, 360);
      particles.current = particles.current.filter(p => p.life > 0);
      for (const p of particles.current) {
        p.x += p.dx * delta; p.y += p.dy * delta; p.life -= .018 * delta;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.size > 2 ? '#bf7480' : '#c3a171';
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, 360, 360); };
  }, [reduced]);

  const emit = (event: PointerEvent<HTMLButtonElement>) => {
    if (opening) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 360;
    const y = (event.clientY - rect.top) / rect.height * 360;
    if (!reduced) { ry.set((x - 180) / 18); rx.set(-(y - 180) / 20); }
    const now = performance.now();
    if (now - previous.current < 95 || reduced) return;
    previous.current = now;
    for (let i = 0; i < 4; i++) {
      if (particles.current.length >= 64) particles.current.shift();
      particles.current.push({ x, y, dx: (Math.random() - .5) * 2.8, dy: -Math.random() * 2 - .3, life: 1, size: Math.random() * 2 + 1 });
    }
    setRipples(old => [...old.slice(-4), { id: ++particleId.current, x: x / 3.6, y: y / 3.6 }]);
  };
  const open = () => {
    if (!ready || opening) return;
    setOpening(true);
    timer.current = setTimeout(onOpen, reduced ? 30 : 900);
  };

  return <motion.main className={`heart-intro ${opening ? 'is-opening' : ''}`} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .45 }}>
    <div className="corner-lines corner-top" aria-hidden="true" /><div className="corner-lines corner-bottom" aria-hidden="true" />
    <div className="intro-top"><Monogram /><span>Um presente para Geovana</span></div>
    <div className="intro-content">
      <motion.h1 id="intro-title" tabIndex={-1} initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>Oi, meu amor<span>…</span></motion.h1>
      <p className="intro-subtitle">Antes de tudo, toque no meu coração.</p>
      <div className={`heart-stage ${active ? 'is-active' : ''} ${ready ? 'is-ready' : ''}`}>
        <div className="heart-halo" aria-hidden="true" />
        <div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" />
        <span className="heart-spark spark-one" aria-hidden="true">✧</span><span className="heart-spark spark-two" aria-hidden="true">✦</span><span className="heart-spark spark-three" aria-hidden="true">✧</span>
        <motion.button className="heart-touch" type="button" aria-label={ready ? 'Coração despertado' : 'Toque no coração para despertar a surpresa'}
          onPointerEnter={event => { if (event.pointerType === 'mouse') setActive(true); }}
          onPointerDown={event => { setActive(true); emit(event); }}
          onPointerMove={emit} onPointerUp={() => setActive(false)} onPointerCancel={() => setActive(false)}
          onPointerLeave={() => { setActive(false); rx.set(0); ry.set(0); }} onClick={touch}
          style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}
          animate={opening ? { scale: reduced ? 1 : 7, opacity: 0 } : { scale: active ? 1.04 : 1 }}
          transition={{ duration: opening ? 1.15 : .5 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="petal-heart" src="/art/heart-petals.webp" width={720} height={720} alt="" draggable={false} fetchPriority="high" />
          {!reduced && ripples.map(ripple => <span key={ripple.id} className="touch-ripple" style={{ left: `${ripple.x}%`, top: `${ripple.y}%` }} />)}
        </motion.button>
        <canvas ref={canvasRef} className="heart-particles" aria-hidden="true" />
      </div>
      <div className="intro-interaction">
        <p className={`interaction-label ${ready ? 'is-ready' : ''}`} aria-live="polite">{ready ? <>Você despertou a surpresa. <Sparkles size={15} /></> : 'Toque ou passe o dedo devagar'}</p>
        <div className="love-progress" role="progressbar" aria-label="Despertando a surpresa" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
        <div className="intro-action-slot">{ready && <motion.button initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} className="button primary" onClick={open} disabled={opening}>Abrir meu presente <ArrowUpRight size={18} /></motion.button>}</div>
      </div>
    </div>
    <div className="intro-bottom"><Ornament /><p>Feito com amor, por <span>Leonardo.</span></p></div>
  </motion.main>;
}
