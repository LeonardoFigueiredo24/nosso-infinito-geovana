import { Heart, Infinity as InfinityIcon } from 'lucide-react';
import { timeline } from '@/data/content';
import { Reveal } from '@/components/Reveal';
import { Ornament } from '@/components/Ornament';

export function LoveTimeline() {
  return <section id="historia" className="timeline-section" aria-labelledby="timeline-title"><div className="section-shell">
    <Reveal className="section-heading"><Ornament /><h2 id="timeline-title">O tempo passa.<br /><em>O amor fica.</em></h2><p>Nossa história, escrita um encontro de cada vez.</p></Reveal>
    <ol className="love-timeline">{timeline.map((item, index) => <li key={item.title}><Reveal className="timeline-item">
      <span className="timeline-dot" aria-hidden="true">{index === 7 ? <InfinityIcon size={18} /> : <Heart size={13} />}</span>
      <div className="timeline-text"><span className="timeline-index">{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></div>
    </Reveal></li>)}</ol>
  </div></section>;
}
