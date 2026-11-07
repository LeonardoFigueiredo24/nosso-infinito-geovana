import { Disc3, Music2 } from 'lucide-react';
import { music } from '@/data/content';
export function MusicSection() {
  return <section className="media-card music-card" aria-labelledby="music-title"><div className="vinyl-art" aria-hidden="true"><Disc3 size={72} strokeWidth={.8} /><span><Music2 size={16} /></span></div>
    <div><h3 id="music-title">{music.title}</h3>{music.src ? <audio controls preload="metadata" src={music.src} aria-label="Ouvir nossa música">Seu navegador não suporta áudio. <a href={music.src}>Ouvir o arquivo</a></audio> : <><p>Em breve, uma música feita com amor também vai tocar aqui. 🎵</p><span className="coming-soon">Mais um pedacinho de nós, em breve</span></>}</div>
  </section>;
}
