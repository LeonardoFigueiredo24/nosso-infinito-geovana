import type { CSSProperties } from 'react';
import type { Memory } from '@/lib/types';
import dimensions from '@/data/photo-dimensions.json';
import { assetPath } from '@/lib/asset-path';

export function Photo({ memory, priority = false, className = '', full = false }: {
  memory: Memory; priority?: boolean; className?: string; full?: boolean;
}) {
  const size = dimensions[String(memory.id) as keyof typeof dimensions];
  const base = assetPath(memory.image.replace(/\.[^.]+$/, ''));
  const original = assetPath(memory.image);
  return <picture className={className}>
    <source type="image/webp" srcSet={`${base}-480.webp 480w, ${base}-960.webp 960w`} sizes={full ? '(min-width: 700px) 700px, 100vw' : '(min-width: 1100px) 380px, (min-width: 680px) 46vw, 92vw'} />
    {/* Originals remain a universally supported fallback. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={original} alt={memory.alt} width={size.width} height={size.height}
      loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async"
      style={{ objectPosition: memory.position || '50% 40%' } as CSSProperties} />
  </picture>;
}
