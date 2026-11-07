import { Clapperboard, Heart } from 'lucide-react';
import { film } from '@/data/content';
import { assetPath } from '@/lib/asset-path';
export function FilmSection() {
  const source = assetPath(film.src);
  const poster = assetPath(film.poster || '');
  return <section className="media-card film-card" aria-labelledby="film-title"><div className="film-art" aria-hidden="true"><Clapperboard size={67} strokeWidth={.9} /><Heart size={16} /></div>
    <div><h3 id="film-title">{film.title}</h3>{film.src ? <><video controls playsInline preload="metadata" src={source} poster={poster || undefined} aria-label="Assistir ao nosso filme">Seu navegador não suporta vídeo. <a href={source}>Assistir ao arquivo</a></video>{film.caption && <p>{film.caption}</p>}</> : <><p>Essa parte da surpresa ainda está sendo preparada com muito amor… 🎬</p><span className="coming-soon">Nossa história merece a tela inteira</span></>}</div>
  </section>;
}
